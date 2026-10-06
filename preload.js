/* First-visit loader. Before the menu opens, every runtime file in precache.js (built by tools/build_dist.mjs) is
   downloaded once behind a progress bar, so later screens never wait for pictures.
   - Secure pages (https, localhost): files go into Cache Storage ('ragnarok-assets') with their content hash. A later visit
     only downloads files whose hash changed, and sw.js serves the pictures straight from that cache.
   - Plain http on a LAN IP (no Cache Storage / service worker there): the download still fills the browser's HTTP cache.
   - file:// or no list: nothing to do, the game boots as before.
   The game and the menu wait for window.RAGNAROK_PRELOAD before they request their own images (no double download). */
(() => {
  'use strict';
  const list = self.RAGNAROK_PRECACHE, boot = document.getElementById('boot');
  const finish = () => { if (!boot) return; boot.classList.add('done'); setTimeout(() => boot.remove(), 500); };
  if (!list || !boot || location.protocol === 'file:' || typeof fetch !== 'function') { window.RAGNAROK_PRELOAD = Promise.resolve(); finish(); return; }
  const bar = boot.querySelector('.boot-bar i'), status = boot.querySelector('.boot-status');
  const mb = n => (n / 1e6).toFixed(1).replace('.', ',');
  let got = 0, downloading = false;
  function paint() {
    const p = Math.min(1, got / Math.max(1, list.total));
    bar.style.transform = `scaleX(${p})`;
    status.textContent = downloading ? `Mengunduh aset game · ${Math.floor(p * 100)}% · ${mb(got)} / ${mb(list.total)} MB` : 'Memuat…';
  }
  const secure = window.isSecureContext && 'caches' in window;
  if (secure && 'serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
  const INDEX = '__ragnarok-index';

  async function run() {
    const cache = secure ? await caches.open('ragnarok-assets').catch(() => null) : null;
    let index = {};
    if (cache) { try { const hit = await cache.match(INDEX); if (hit) index = await hit.json(); } catch (_) { index = {}; } }
    const todo = [];
    for (const [url, bytes, hash] of list.files) {
      if (cache && index[url] === hash && await cache.match(url)) got += bytes; else todo.push([url, bytes, hash]);
    }
    downloading = todo.length > 0; paint();
    let next = 0;
    async function worker() {
      while (next < todo.length) {
        const [url, bytes, hash] = todo[next++];
        let seen = 0;
        try {
          const res = await fetch(url, { cache: 'no-cache' });
          if (!res.ok) throw new Error(String(res.status));
          const chunks = [], reader = res.body && res.body.getReader ? res.body.getReader() : null;
          if (reader) for (;;) { const { done, value } = await reader.read(); if (done) break; chunks.push(value); seen += value.byteLength; got += value.byteLength; paint(); }
          else { const buf = new Uint8Array(await res.arrayBuffer()); chunks.push(buf); seen = buf.byteLength; got += seen; }
          if (cache) {
            const type = res.headers.get('Content-Type') || '';
            await cache.put(url, new Response(new Blob(chunks, { type }), { headers: { 'Content-Type': type } }));
            index[url] = hash;
          }
        } catch (_) { /* a missing file must not block the game; it simply loads normally later */ }
        got += Math.max(0, bytes - seen); paint();
      }
    }
    await Promise.all(Array.from({ length: 6 }, worker));
    if (cache) {
      // Forget files from older deploys, then store the hash index for the next visit.
      // Make sure we DON'T delete DLC files that were downloaded on demand!
      const keep = new Set(list.files.map(f => new URL(f[0], location.href).href));
      if (self.RAGNAROK_DLC) {
        Object.values(self.RAGNAROK_DLC).forEach(dlc => {
          dlc.files.forEach(f => keep.add(new URL(f[0], location.href).href));
        });
      }
      keep.add(new URL(INDEX, location.href).href);
      for (const req of await cache.keys()) if (!keep.has(req.url)) await cache.delete(req);
      for (const url of Object.keys(index)) if (!keep.has(new URL(url, location.href).href)) delete index[url];
      await cache.put(INDEX, new Response(JSON.stringify(index), { headers: { 'Content-Type': 'application/json' } }));
    }
    downloading = false; got = list.total; paint();
  }
  window.RAGNAROK_PRELOAD = run().catch(() => {}).then(finish);

  // DLC Downloader & Manager
  window.clearDLCCache = async function() {
    if (!secure || !('caches' in window)) return false;
    const cache = await caches.open('ragnarok-assets').catch(() => null);
    if (!cache) return false;
    
    // We only keep the files in RAGNAROK_PRECACHE.files (Core files)
    const keepPaths = new Set(list.files.map(f => f[0]));
    const keepUrls = new Set(list.files.map(f => new URL(f[0], location.href).href));
    keepUrls.add(new URL(INDEX, location.href).href);
    
    let deletedCount = 0;
    const keys = await cache.keys();
    for (const req of keys) {
      if (!keepUrls.has(req.url)) {
        await cache.delete(req);
        deletedCount++;
      }
    }
    
    // Reset index memory for deleted items (index uses the relative path f[0] as keys)
    let index = {};
    try { const hit = await cache.match(INDEX); if (hit) index = await hit.json(); } catch (_) {}
    for (const path of Object.keys(index)) {
      if (!keepPaths.has(path)) delete index[path];
    }
    await cache.put(INDEX, new Response(JSON.stringify(index), { headers: { 'Content-Type': 'application/json' } }));
    
    return deletedCount > 0;
  };
  window.downloadDLC = async function(dlcId, onProgress) {
    const dlc = self.RAGNAROK_DLC && self.RAGNAROK_DLC[dlcId];
    if (!dlc || !secure || !('caches' in window)) return true; // fallback
    const cache = await caches.open('ragnarok-assets').catch(() => null);
    if (!cache) return true;
    
    let got = 0;
    const todo = [];
    
    for (const [url, bytes, hash] of dlc.files) {
      if (await cache.match(url)) {
        got += bytes;
      } else {
        todo.push([url, bytes, hash]);
      }
    }
    
    if (todo.length === 0) {
      if (onProgress) onProgress(1);
      return true;
    }
    if (onProgress) onProgress(got / dlc.total);
    
    let next = 0;
    async function worker() {
      while (next < todo.length) {
        const [url, bytes, hash] = todo[next++];
        let seen = 0;
        try {
          const res = await fetch(url, { cache: 'no-cache' });
          if (!res.ok) throw new Error(String(res.status));
          const chunks = [], reader = res.body && res.body.getReader ? res.body.getReader() : null;
          if (reader) {
            for (;;) { 
              const { done, value } = await reader.read(); 
              if (done) break; 
              chunks.push(value); 
              seen += value.byteLength; 
              got += value.byteLength; 
              if (onProgress) onProgress(Math.min(1, got / Math.max(1, dlc.total))); 
            }
          } else { 
            const buf = new Uint8Array(await res.arrayBuffer()); 
            chunks.push(buf); 
            seen = buf.byteLength; 
            got += seen; 
          }
          const type = res.headers.get('Content-Type') || '';
          await cache.put(url, new Response(new Blob(chunks, { type }), { headers: { 'Content-Type': type } }));
        } catch (_) {
          throw new Error('Download failed');
        }
        got += Math.max(0, bytes - seen);
        if (onProgress) onProgress(Math.min(1, got / Math.max(1, dlc.total)));
      }
    }
    
    try {
      await Promise.all(Array.from({ length: 4 }, worker));
      if (onProgress) onProgress(1);
      return true;
    } catch (e) {
      return false;
    }
  };

  window.isDLCDownloaded = async function(dlcId) {
    const dlc = self.RAGNAROK_DLC && self.RAGNAROK_DLC[dlcId];
    if (!dlc || !secure || !('caches' in window)) return true;
    const cache = await caches.open('ragnarok-assets').catch(() => null);
    if (!cache) return true;
    
    for (const [url] of dlc.files) {
      if (!(await cache.match(url))) return false;
    }
    return true;
  };
})();
