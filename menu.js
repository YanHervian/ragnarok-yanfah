/* Front door: player -> rival -> arena/difficulty, with future locked roster slots. */
(() => {
  'use strict';
  const root = document.querySelector('#front-menu'), game = window.__game;
  const fighters = {
    arco: { name: 'ARCO', tag: 'THE TRINITY ARM', race: 'MECHA', portrait: 'assets/ui/arco-avatar.webp', art: 'assets/menu/arco-select.webp', detail: 'Steel resolve. Unbreakable spirit.', basic: 'IRON CHAIN', ultimate: 'HELIOS SQUADRON', style: 'Brawler / drone summon', color: '#8ae3d3', cutin: 'assets/ui/ultimate-cutin.webp' },
    fenr: { name: 'FENR', tag: 'THE WOLF RANGER', race: 'DEMI-HUMAN', portrait: 'assets/fenr/ui/portrait-human.webp', art: 'assets/menu/fenr-select.webp', detail: 'The wild never bows.', basic: 'RANGER CHAIN', ultimate: 'FERAL AWAKENING', style: 'Agile / werewolf transformation', color: '#eab27a' },
    ...(window.Mira && window.MIRA_MANIFEST ? { mira: { name: 'MIRA', tag: 'THE CANDY PILOT', race: 'DEMI-HUMAN', portrait: 'assets/mira/ui/portrait.webp', art: 'assets/menu/mira-select.webp', detail: 'Small pilot. Big robot. Bigger fireworks.', basic: 'MITTEN CHAIN', ultimate: 'ROCKET PARADE', style: 'Heavy mech / rocket barrage', color: '#d9b4ff' } } : {}),
    ...(window.Cora && window.CORA_MANIFEST ? { cora: { name: 'CORA', tag: 'THE RAVEN DANCER', race: 'DIVINE', portrait: 'assets/cora/ui/portrait.webp', art: 'assets/menu/cora-select.webp', detail: 'Every feather is a blade.', basic: 'FEATHER WALTZ', ultimate: 'NIGHT MURMURATION', style: 'Agile / raven swarm', color: '#c4a6ff' } } : {}),
    ...(window.Naja && window.NAJA_MANIFEST ? { naja: { name: 'NAJA', tag: 'THE DUNE COBRA', race: 'DIVINE', portrait: 'assets/naja/ui/portrait.webp', art: 'assets/menu/naja-select.webp', detail: 'Sways like sand. Strikes like venom.', basic: 'VIPER LASH', ultimate: 'DUNE SERPENT', style: 'Mid-range / urumi whip & sand serpent', color: '#d9b77a' } } : {}),
    ...(window.Haldor && window.HALDOR_MANIFEST ? { haldor: { name: 'HALDOR', tag: 'THE WALKING FORGE', race: 'MECHA', portrait: 'assets/haldor/ui/portrait.webp', art: 'assets/menu/haldor-select.webp', detail: 'Old forge master. Walking furnace. Heavy hammer.', basic: 'FORGE CHAIN', ultimate: 'FORGE QUAKE', style: 'Heavy tank / steam forge hammer', color: '#d9803f' } } : {}),
    ...(window.Zanni && window.ZANNI_MANIFEST ? { zanni: { name: 'ZANNI', tag: 'THE CLOCKWORK JESTER', race: 'DEMI-HUMAN', portrait: 'assets/zanni/ui/portrait.webp', art: 'assets/menu/zanni-select.webp', detail: 'Arms that stretch. Jokes that sting.', basic: 'SCISSOR JAB', ultimate: 'GRAND FINALE', style: 'Trickster / extending scissor-arm strikes and bladed rings', color: '#c9d64a' } } : {}),
    ...(window.Isolde && window.ISOLDE_MANIFEST ? { isolde: { name: 'ISOLDE', tag: 'THE WHITE STRIDER', race: 'MECHA', portrait: 'assets/isolde/ui/portrait.webp', art: 'assets/menu/isolde-select.webp', detail: 'Long legs, longer lance, zero mercy.', basic: 'LANCE LINE', ultimate: 'SKYFALL LANCES', style: 'Long-range lancer / stilt-leg charges', color: '#9fd4ff' } } : {}),
    ...(window.Rhea && window.RHEA_MANIFEST ? { rhea: { name: 'RHEA', tag: 'THE LITTLE ORRERY', race: 'DIVINE', portrait: 'assets/rhea/ui/portrait.webp', art: 'assets/menu/rhea-select.webp', detail: 'Homework done. Planets armed. Class dismissed.', basic: 'ORBIT STRIKE', ultimate: 'GRAND ORRERY', style: 'Zoner / orbiting orrery spheres', color: '#c7485e' } } : {}),
    ...(window.Solan && window.SOLAN_MANIFEST ? { solan: { name: 'SOLAN', tag: 'THE SUNMANE', race: 'DEMI-HUMAN', portrait: 'assets/solan/ui/portrait.webp', art: 'assets/menu/solan-select.webp', detail: 'Golden mane, heavy blade, louder roar.', basic: 'SUNBLADE', ultimate: 'SUNMANE ROAR', style: 'Powerhouse / greatsword and roar', color: '#f2b632' } } : {}),
    ...(window.Nib && window.NIB_MANIFEST ? { nib: { name: 'NIB', tag: 'THE ROOFTOP POST', race: 'DEMI-HUMAN', portrait: 'assets/nib/ui/portrait.webp', art: 'assets/menu/nib-select.webp', detail: 'Every letter delivered. Every punch, too.', basic: 'BATON FLURRY', ultimate: 'SPECIAL DELIVERY', style: 'Rushdown / twin courier batons', color: '#8fd4ff' } } : {}),
    ...(window.Edda && window.EDDA_MANIFEST ? { edda: { name: 'EDDA', tag: 'THE SHELL SAGE', race: 'DIVINE', portrait: 'assets/edda/ui/portrait.webp', art: 'assets/menu/edda-select.webp', detail: 'Slow to anger, impossible to knock down.', basic: 'STAFF FORMS', ultimate: 'ELDER TORTOISE', style: 'Counter defender / staff and shell guard', color: '#8fe3b4' } } : {}),
    ...(window.Yanfah && window.YANFAH_MANIFEST ? { yanfah: { name: 'YANFAH', tag: 'THE DATA WRAITH', race: 'MECHA', portrait: 'assets/yanfah/ui/portrait.webp', art: 'assets/menu/yanfah-select.webp', detail: 'System breach imminent.', basic: 'KEYBOARD SMASH', ultimate: 'SYSTEM BLUE SCREEN', style: 'Glitch / cyber attacks', color: '#00ffff' } } : {}),
    ...(window.Valkren && window.VALKREN_MANIFEST ? { valkren: { name: 'VALKREN', tag: 'HEAVY MECHA', race: 'DEMI-HUMAN', portrait: 'assets/valkren/ui/portrait.webp', art: 'assets/menu/valkren-select.webp', detail: 'Mesin tempur tak terhentikan.', basic: 'SABETAN BERAT', ultimate: 'SISTEM OVERDRIVE', style: 'Brute force / Area damage', color: '#ff0033' } } : {}),
    ...(window.Dhyla && window.DHYLA_MANIFEST ? { dhyla: { name: 'DHYLA', tag: 'THE FUNGAL MAGE', race: 'DIVINE', portrait: 'assets/dhyla/ui/portrait.webp', art: 'assets/menu/dhyla-select.webp', detail: 'Cute on the outside, lethal spores on the inside.', basic: 'MUSHROOM SLASH', ultimate: 'FUNGAL ERUPTION', style: 'Area control / magical mushrooms', color: '#ffd700' } } : {}),
    ...(window.RAMURU_MANIFEST ? { ramuru: { name: 'RAMURU', tag: 'PENDEKAR MISTERIUS', race: 'FANTASI', portrait: 'assets/ramuru/ui/portrait.webp', art: 'assets/menu/ramuru-select.webp', detail: 'Pendekar misterius yang mengendalikan elemen air.', basic: 'BILAH AIR', ultimate: 'TEBASAN TSUNAMI', style: 'Seimbang / Serba Bisa', color: '#00bfff' } } : {})
  };
  // Showcase fighters (assets/showcase/showcase.js) fill roster slots with avatar and art; they cannot be confirmed yet.
  const showcase = Object.fromEntries(Object.entries(window.SHOWCASE_FIGHTERS || {}).filter(([id]) => !fighters[id]));
  const info = id => fighters[id] || showcase[id], soon = id => !!showcase[id];
  const opened = [...Object.keys(fighters), ...Object.keys(showcase)];
  // Touch screens have no hover: a tap only previews a fighter; the yellow CONFIRM button picks it.
  const touch = document.documentElement.classList.contains('touch');
  // Phones get a fullscreen button on the home screen (no trip to Settings). Hidden where the page cannot go fullscreen
  // (iPhone Safari); inside the mobile shell the shell's document is the one that goes fullscreen.
  const canFullscreen = touch && (() => { try { const d = window.parent !== window ? window.parent.document : document; return !!(d.fullscreenEnabled || d.webkitFullscreenEnabled); } catch (_) { return false; } })();
  // Until the phone has been fullscreen once (button or the shell's first-touch fullscreen), the button glows.
  const hintKey = 'aether.fullscreenHint';
  let fullscreenHint = canFullscreen && (() => { try { return localStorage.getItem(hintKey) !== 'seen'; } catch (_) { return true; } })();
  function dismissFullscreenHint() { if (!fullscreenHint) return; fullscreenHint = false; try { localStorage.setItem(hintKey, 'seen'); } catch (_) { } root.querySelector('.menu-fullscreen')?.classList.remove('hinted'); }
  if (fullscreenHint) try { const d = window.parent !== window ? window.parent.document : document; d.addEventListener('fullscreenchange', () => { if (d.fullscreenElement) dismissFullscreenHint(); }); } catch (_) { }
  // Warm the small roster portraits so the grid appears at once. The large select art and arena pictures are fetched when
  // shown and then come from the browser cache; holding all of them decoded would waste a phone's image memory.
  const warm = [];
  opened.forEach(id => {
    const f = info(id);
    if (!f) return;
    [f.portrait, f.art, f.cutin || `assets/${id}/ui/cutin.webp`].filter(Boolean).forEach(src => {
      const im = new Image(); im.src = src;
      im.decode().catch(() => { }); // force background decoding
      warm.push(im);
    });
  });
  const totalSlots = Math.max(24, Math.ceil(opened.length / 12) * 12);
  const roster = [...opened, ...Array.from({ length: totalSlots - opened.length }, (_, i) => 'locked-' + i)];
  // lockIn: the pending step change while a confirmed fighter flashes 3 times (PICK_FLASH s each); input waits for it.
  const PICK_FLASH = .3; let lockIn = null, lockTicks = [];
  let screen = 'home', step = 0, mode = 'versus', player = 'arco', enemy = 'fenr', hover = 'arco', stage = 'amikom', level = 'medium', result = null, interacted = false, lastSound = 0;
  let rosterPage = 0;

  // DLC Status Tracker
  const dlcStatus = {};
  const charList = Object.keys(fighters).filter(c => c !== 'arco');
  const mapList = ['jamur', 'valkren', 'ramuru']; // Using stage IDs
  let isDownloading = false;
  let hoveredNavItem = null;
  let hoveredFighterTile = null;
  let lastNavTime = 0;
  const NAV_DELAY = 150; // ms throttle for menu navigation across all screens to prevent spam & lag

  async function checkAllDLCs() {
    if (!window.isDLCDownloaded) {
      opened.forEach(id => dlcStatus[id] = true);
      mapList.forEach(id => dlcStatus['map_' + id] = true);
      return;
    }
    for (const id of opened) {
      if (id === 'arco' || !fighters[id] || window[id.toUpperCase() + '_MANIFEST']) dlcStatus[id] = true;
      else dlcStatus[id] = await window.isDLCDownloaded(id);
    }
    for (const map of mapList) {
      dlcStatus['map_' + map] = await window.isDLCDownloaded('map_' + map);
    }
    if (screen === 'select' || screen === 'home') render();
  }
  checkAllDLCs();

  async function showDownloadModal(id, isMap = false) {
    if (isDownloading) return;
    const name = isMap ? MatchRules.stages[id]?.name : info(id)?.name;
    const dlcId = isMap ? 'map_' + id : id;
    if (!name || !window.downloadDLC) return;

    const modal = document.createElement('div');
    modal.className = 'dlc-modal';
    modal.innerHTML = `
      <div class="dlc-modal-content">
        <h2>${isMap ? 'UNDUH MAP' : 'UNDUH KARAKTER'}</h2>
        <p>Aset <strong>${name}</strong> belum tersedia di perangkat Anda. Ingin mengunduhnya sekarang?</p>
        <div class="dlc-progress-bar"><div class="dlc-progress-fill" style="width:0%"></div></div>
        <div class="dlc-status-text">Menunggu...</div>
        <div class="dlc-actions">
          <button class="dlc-btn-cancel">BATAL</button>
          <button class="dlc-btn-download">UNDUH</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.dlc-btn-cancel').onclick = () => { if (!isDownloading) modal.remove(); };
    modal.querySelector('.dlc-btn-download').onclick = async () => {
      isDownloading = true;
      modal.querySelector('.dlc-actions').style.display = 'none';
      modal.querySelector('.dlc-status-text').textContent = 'Mengunduh aset... 0%';
      const fill = modal.querySelector('.dlc-progress-fill');

      const success = await window.downloadDLC(dlcId, (p) => {
        fill.style.width = (p * 100) + '%';
        modal.querySelector('.dlc-status-text').textContent = 'Mengunduh aset... ' + Math.floor(p * 100) + '%';
      });

      isDownloading = false;
      if (success) {
        dlcStatus[dlcId] = true;
        render();
        if (!isMap) {
          const f = info(id);
          const im = new Image(); im.src = f.art; im.decode().catch(() => { });
          const cutin = new Image(); cutin.src = f.cutin || `assets/${id}/ui/cutin.webp`; cutin.decode().catch(() => { });
        }

        modal.innerHTML = `
          <div class="dlc-modal-content">
            <h2 style="color: var(--accent, #3dd2a6);">BERHASIL</h2>
            <p>Aset <strong>${name}</strong> telah berhasil diunduh dan siap digunakan.</p>
            <div class="dlc-actions" style="margin-top: 24px;">
              <button class="dlc-btn-download">TUTUP</button>
            </div>
          </div>
        `;
        modal.querySelector('.dlc-btn-download').onclick = () => modal.remove();
      } else {
        modal.remove();
        window.alert('Gagal mengunduh aset. Periksa memori dan koneksi Anda.');
      }
    };
  }

  window.showGlobalDownloadManager = async function () {
    if (isDownloading || !window.downloadDLC) return;
    const modal = document.createElement('div');
    modal.className = 'dlc-modal';
    modal.innerHTML = `
      <div class="dlc-modal-content">
        <h2>RAGNAROK DOWNLOAD MANAGER</h2>
        <p>Unduh semua aset karakter dan map tambahan agar tidak perlu loading di tengah permainan.</p>
        <div class="dlc-multi-progress">
          <div class="dlc-multi-item" id="dl-prog-chars">
            <div class="dlc-multi-label"><span>Karakter</span><span class="pct">0%</span></div>
            <div class="dlc-multi-bar"><div class="dlc-multi-fill" style="width:0%"></div></div>
          </div>
          <div class="dlc-multi-item" id="dl-prog-maps">
            <div class="dlc-multi-label"><span>Arena Map</span><span class="pct">0%</span></div>
            <div class="dlc-multi-bar"><div class="dlc-multi-fill" style="width:0%"></div></div>
          </div>
        </div>
        <div class="dlc-status-text">Siap mengunduh...</div>
        <div class="dlc-actions">
          <button class="dlc-btn-cancel">TUTUP</button>
          <button class="dlc-btn-clear">HAPUS ASET</button>
          <button class="dlc-btn-download">UNDUH SEMUA</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const updateUI = (id, pct) => {
      const el = modal.querySelector('#' + id);
      el.querySelector('.pct').textContent = Math.floor(pct * 100) + '%';
      el.querySelector('.dlc-multi-fill').style.width = (pct * 100) + '%';
    };

    // Calculate current status for initial render
    let charsTotal = charList.length, charsDownloaded = 0;
    charList.forEach(c => { if (dlcStatus[c]) charsDownloaded++; });
    let mapsTotal = mapList.length, mapsDownloaded = 0;
    mapList.forEach(m => { if (dlcStatus['map_' + m]) mapsDownloaded++; });

    updateUI('dl-prog-chars', charsTotal ? charsDownloaded / charsTotal : 1);
    updateUI('dl-prog-maps', mapsTotal ? mapsDownloaded / mapsTotal : 1);

    modal.querySelector('.dlc-btn-cancel').onclick = () => { if (!isDownloading) modal.remove(); };

    modal.querySelector('.dlc-btn-clear').onclick = async () => {
      if (isDownloading) return;

      const confirmModal = document.createElement('div');
      confirmModal.className = 'dlc-modal dlc-confirm-modal';
      confirmModal.style.zIndex = '10005';
      confirmModal.innerHTML = `
        <div class="dlc-modal-content">
          <h2>KONFIRMASI HAPUS</h2>
          <p>Hapus semua aset tambahan yang sudah diunduh? (Hanya menyisakan Arco dan map Amikom)</p>
          <div class="dlc-actions" style="margin-top: 24px;">
            <button class="dlc-btn-cancel" id="btn-no">BATAL</button>
            <button class="dlc-btn-clear" id="btn-yes">HAPUS ASET</button>
          </div>
        </div>
      `;
      document.body.appendChild(confirmModal);

      confirmModal.querySelector('#btn-no').onclick = () => confirmModal.remove();
      confirmModal.querySelector('#btn-yes').onclick = async () => {
        confirmModal.querySelector('#btn-yes').textContent = 'MENGHAPUS...';
        confirmModal.querySelector('#btn-yes').style.pointerEvents = 'none';

        if (window.clearDLCCache) await window.clearDLCCache();

        confirmModal.innerHTML = `
          <div class="dlc-modal-content">
            <h2 style="color: #3dd2a6;">BERHASIL</h2>
            <p>Data berhasil dihapus! Memuat ulang arena...</p>
          </div>
        `;
        setTimeout(() => location.reload(), 1500);
      };
    };

    modal.querySelector('.dlc-btn-download').onclick = async () => {
      if (charsDownloaded === charsTotal && mapsDownloaded === mapsTotal) {
        modal.querySelector('.dlc-status-text').textContent = 'Semua aset sudah diunduh!';
        return;
      }
      isDownloading = true;
      modal.querySelector('.dlc-actions').style.display = 'none';

      let success = true;
      // Download Characters
      for (let i = 0; i < charList.length; i++) {
        const c = charList[i];
        if (dlcStatus[c]) continue;
        modal.querySelector('.dlc-status-text').textContent = `Mengunduh Karakter: ${info(c).name}...`;
        const res = await window.downloadDLC(c, (p) => {
          const overallPct = (charsDownloaded + p) / charsTotal;
          updateUI('dl-prog-chars', overallPct);
        });
        if (res) {
          dlcStatus[c] = true;
          charsDownloaded++;
          updateUI('dl-prog-chars', charsDownloaded / charsTotal);
        } else {
          success = false; break;
        }
      }

      // Download Maps
      if (success && mapsDownloaded < mapsTotal) {
        for (let i = 0; i < mapList.length; i++) {
          const m = mapList[i];
          if (dlcStatus['map_' + m]) continue;
          modal.querySelector('.dlc-status-text').textContent = `Mengunduh Map: ${MatchRules.stages[m].name}...`;
          const res = await window.downloadDLC('map_' + m, (p) => {
            const overallPct = (mapsDownloaded + p) / mapsTotal;
            updateUI('dl-prog-maps', overallPct);
          });
          if (res) {
            dlcStatus['map_' + m] = true;
            mapsDownloaded++;
            updateUI('dl-prog-maps', mapsDownloaded / mapsTotal);
          } else {
            success = false; break;
          }
        }
      }

      isDownloading = false;
      if (success) {
        modal.querySelector('.dlc-status-text').textContent = 'Download Selesai! Semua aset telah tersedia.';
        modal.querySelector('.dlc-actions').style.display = 'flex';
        modal.querySelector('.dlc-btn-download').style.display = 'none';
        modal.querySelector('.dlc-btn-cancel').textContent = 'TUTUP';
        render();
      } else {
        window.alert('Gagal mengunduh sebagian aset. Periksa koneksi internet Anda.');
        modal.querySelector('.dlc-actions').style.display = 'flex';
      }
    };
  }

  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  let backgroundEnabled = false, backgroundVideo = null, videoPlayToken = 0;
  const backgroundToggle = document.querySelector('#menu-video-toggle');
  function shouldAnimate() { return backgroundEnabled && screen === 'home' && !root.hidden && !document.hidden && !game.snapshot().settingsOpen; }
  function syncBackground() {
    if (!backgroundVideo) return; const token = ++videoPlayToken;
    if (!shouldAnimate()) { backgroundVideo.pause(); return; }
    if (backgroundVideo.paused) { const p = backgroundVideo.play(); p?.catch(() => { if (token === videoPlayToken) backgroundVideo.dataset.state = 'autoplay-blocked'; }); }
  }
  function attachBackground() {
    if (screen !== 'home') return;
    // Disabled video background for Ragnarok: Trinity static theme
    /*
    if (!backgroundVideo && backgroundEnabled) {
      backgroundVideo = document.createElement('video'); backgroundVideo.id = 'menu-background-video'; backgroundVideo.className = 'menu-background-video';
      backgroundVideo.muted = true; backgroundVideo.defaultMuted = true; backgroundVideo.autoplay = true; backgroundVideo.loop = true; backgroundVideo.playsInline = true; backgroundVideo.preload = 'auto';
      backgroundVideo.setAttribute('muted', ''); backgroundVideo.setAttribute('playsinline', ''); backgroundVideo.setAttribute('aria-hidden', 'true'); backgroundVideo.tabIndex = -1; backgroundVideo.disablePictureInPicture = true;
      backgroundVideo.poster = 'assets/menu/ragnarok-bg.jpg'; backgroundVideo.dataset.state = 'loading';
      backgroundVideo.addEventListener('playing', () => { if (!shouldAnimate()) { backgroundVideo.pause(); return; } backgroundVideo.classList.add('is-playing'); backgroundVideo.dataset.state = 'playing'; });
      backgroundVideo.addEventListener('error', () => { backgroundVideo.classList.remove('is-playing'); backgroundVideo.dataset.state = 'poster-fallback'; });
      backgroundVideo.src = '';
    }
    if (backgroundVideo) root.querySelector('.home-art')?.prepend(backgroundVideo);
    */
    syncBackground();
  }
  if (backgroundToggle) { backgroundToggle.checked = backgroundEnabled; backgroundToggle.onchange = e => { backgroundEnabled = e.target.checked; attachBackground(); syncBackground(); }; }
  document.addEventListener('visibilitychange', syncBackground);

  function sfx(kind = 'move', explicit = false) {
    if (!interacted && !explicit) {
      try { window.unlockAudio?.(); } catch (_) { }
    }
    interacted = true;
    const now = performance.now();
    const threshold = (kind === 'hover' || kind === 'slider') ? 40 : (kind === 'move' ? 60 : 20);
    if ((kind === 'move' || kind === 'hover' || kind === 'slider') && now - lastSound < threshold) return;
    lastSound = now;
    if (game?.menuSound) game.menuSound(kind);
    else if (window.__menuSound) window.__menuSound(kind);
  }
  window.playMenuSFX = sfx;

  ['pointerdown', 'pointermove', 'keydown', 'touchstart'].forEach(evt => {
    window.addEventListener(evt, () => {
      interacted = true;
      try { window.unlockAudio?.(); } catch (_) { }
    }, { once: false, passive: true });
  });

  const UI_INTERACTIVE_QUERY = [
    'button',
    'a[href]',
    'input',
    'select',
    'summary',
    '[data-cmd]',
    '[data-fighter]',
    '[data-stage]',
    '[data-level]',
    '.home-nav-item',
    '.home-play',
    '.home-dl-manager',
    '.home-tabs span',
    '.arena-tile',
    '.gallery-tile',
    '.roster-tile',
    '.page-btn',
    '.gallery-page-btn',
    '.dlc-btn-cancel',
    '.dlc-btn-download',
    '.dlc-btn-clear',
    '.dlc-icon-badge',
    '.c-hud-btn',
    '.c-faction-card',
    '.sp-action-btn',
    '.sp-close-btn',
    '.pp-resume-btn',
    '.pp-sec-btn',
    '.sp-toggle-wrap',
    '.sp-toggle-track',
    '[role="button"]'
  ].join(',');

  let activeHoverEl = null;

  document.addEventListener('pointerenter', e => {
    const target = e.target.closest?.(UI_INTERACTIVE_QUERY);
    if (target && target !== activeHoverEl) {
      activeHoverEl = target;
      if (target.matches('.locked, [disabled], [aria-disabled="true"]')) {
        sfx('locked');
      } else {
        sfx('hover');
      }
    }
  }, true);

  document.addEventListener('pointerleave', e => {
    if (activeHoverEl && !e.relatedTarget?.closest?.(UI_INTERACTIVE_QUERY)) {
      activeHoverEl = null;
    }
  }, true);

  document.addEventListener('click', e => {
    const target = e.target.closest?.(UI_INTERACTIVE_QUERY);
    if (!target) return;

    if (target.matches('.locked, [disabled], [aria-disabled="true"]')) {
      sfx('locked', true);
      return;
    }

    if (target.matches('[data-cmd="back"], .menu-back, .dlc-btn-cancel, #btn-no, .sp-close-btn, #close-settings, #back-menu, .pp-exit-btn')) {
      sfx('back', true);
      return;
    }

    if (target.matches('input[type="checkbox"], .sp-toggle, .sp-toggle-wrap, .sp-toggle-track')) {
      sfx('toggle', true);
      return;
    }

    if (target.matches('.confirm-fighter, .start-battle, .home-play, #resume-btn, .pp-resume-btn, [data-cmd="confirm"], [data-cmd="start"], [data-cmd="rematch"]')) {
      sfx('confirm', true);
      return;
    }

    if (target.matches('.home-dl-manager, .dlc-btn-download, .dlc-btn-clear, #btn-yes, #audio-reset-btn, #fullscreen-btn, details summary, .arena-tile, .c-faction-card, .c-hud-btn, #settings-btn, #pause-btn, #restart-btn')) {
      sfx('confirm', true);
      return;
    }
  }, true);

  document.addEventListener('input', e => {
    if (e.target.matches('input[type="range"]')) {
      sfx('slider', true);
    }
  }, true);

  document.addEventListener('change', e => {
    if (e.target.matches('select')) {
      sfx('move', true);
    }
  }, true);
  const tagTranslations = {
    'THE TRINITY ARM': 'LENGAN TRINITY',
    'THE WOLF RANGER': 'PENJAGA SERIGALA',
    'THE CANDY PILOT': 'PILOT PERMEN',
    'THE RAVEN DANCER': 'PENARI GAGAK',
    'THE DUNE COBRA': 'KOBRA GURUN',
    'THE WALKING FORGE': 'TUNGKU BERJALAN',
    'THE CLOCKWORK JESTER': 'BADUT MEKANIK',
    'THE WHITE STRIDER': 'PENUNGGANG PUTIH',
    'THE LITTLE ORRERY': 'PLANETARIUM KECIL',
    'THE SUNMANE': 'SURI MATAHARI',
    'THE ROOFTOP POST': 'KURIR ATAP',
    'THE SHELL SAGE': 'RESI TEMPURUNG',
    'THE DATA WRAITH': 'HANTU DATA',
    'HEAVY MECHA': 'MECHA BERAT',
    'THE FUNGAL MAGE': 'PENYIHIR JAMUR'
  };
  const translateTag = (t) => tagTranslations[t] || t;

  const raceTranslations = {
    'MECHA': 'MANUSIA',
    'DEMI-HUMAN': 'FANTASI',
    'DIVINE': 'DEWA',
    'NATURE': 'ALAM'
  };
  const translateRace = (r) => raceTranslations[r] || r;

  const styleTranslations = {
    'Brawler / drone summon': 'Petarung / Pemanggil Drone',
    'Agile / werewolf transformation': 'Lincah / Transformasi Serigala',
    'Heavy mech / rocket barrage': 'Mecha Berat / Rentetan Roket',
    'Agile / raven swarm': 'Lincah / Kawanan Gagak',
    'Mid-range / urumi whip & sand serpent': 'Jarak Menengah / Cambuk Pasir',
    'Heavy tank / steam forge hammer': 'Tank Berat / Palu Tempa Uap',
    'Trickster / extending scissor-arm strikes and bladed rings': 'Penipu / Gunting Panjang & Cincin Bilah',
    'Long-range lancer / stilt-leg charges': 'Penombak Jauh / Terjangan Kaki Jangkungan',
    'Zoner / orbiting orrery spheres': 'Pengendali Zona / Bola Orbit Planet',
    'Powerhouse / greatsword and roar': 'Pendekar Kuat / Pedang Raksasa & Raungan',
    'Rushdown / twin courier batons': 'Serangan Cepat / Tongkat Kurir Ganda',
    'Counter defender / staff and shell guard': 'Penangkis / Tongkat & Pelindung Tempurung',
    'Glitch / cyber attacks': 'Glitch / Serangan Siber',
    'Brute force / Area damage': 'Kekuatan Kasar / Serangan Area',
    'Area control / magical mushrooms': 'Kendali Area / Jamur Sihir'
  };
  const translateStyle = (s) => styleTranslations[s] || s;
  const detailTranslations = {
    'Steel resolve. Unbreakable spirit.': 'Tekad baja. Jiwa tak terpatahkan.',
    'The wild never bows.': 'Alam liar tak pernah tunduk.',
    'Small pilot. Big robot. Bigger fireworks.': 'Pilot kecil. Robot besar. Kembang api lebih dahsyat.',
    'Every feather is a blade.': 'Setiap helai bulu adalah sebilah belati.',
    'Sways like sand. Strikes like venom.': 'Meliuk bagai pasir. Menyengat bagai bisa.',
    'Old forge master. Walking furnace. Heavy hammer.': 'Master tempa tua. Tungku berjalan. Palu berbobot tinggi.',
    'Arms that stretch. Jokes that sting.': 'Lengan yang memanjang. Lelucon yang menusuk.',
    'Long legs, longer lance, zero mercy.': 'Kaki jenjang, tombak panjang, tanpa ampun.',
    'Homework done. Planets armed. Class dismissed.': 'Tugas selesai. Planet bersenjata. Kelas dibubarkan.',
    'Golden mane, heavy blade, louder roar.': 'Suri emas, pedang raksasa, auman menggelegar.',
    'Every letter delivered. Every punch, too.': 'Setiap surat terkirim. Setiap pukulan juga.',
    'Slow to anger, impossible to knock down.': 'Sabar tak mudah marah, mustahil dirobohkan.',
    'System breach imminent.': 'Pelanggaran sistem segera terjadi.',
    'Mesin tempur tak terhentikan.': 'Mesin tempur tak terhentikan.',
    'Cute on the outside, lethal spores on the inside.': 'Imut di luar, spora mematikan di dalam.'
  };
  const translateDetail = (d) => detailTranslations[d] || d;

  const moveTranslations = {
    'IRON CHAIN': 'RANTAI BESI',
    'HELIOS SQUADRON': 'SKUADRON HELIOS',
    'RANGER CHAIN': 'KOMBO RANGER',
    'FERAL AWAKENING': 'KEBANGKITAN LIAR',
    'MITTEN CHAIN': 'KOMBO TINJU',
    'ROCKET PARADE': 'PARADE ROKET',
    'FEATHER WALTZ': 'TARIAN BULU',
    'NIGHT MURMURATION': 'KAWANAN MALAM',
    'VIPER LASH': 'CAMBUK VIPER',
    'DUNE SERPENT': 'ULAR GURUN',
    'FORGE CHAIN': 'HANTAMAN TEMPA',
    'FORGE QUAKE': 'GEMPA TEMPA',
    'SCISSOR JAB': 'TUSUKAN GUNTING',
    'GRAND FINALE': 'PUNCAK AKSI',
    'LANCE LINE': 'JALUR TOMBAK',
    'SKYFALL LANCES': 'TOMBAK LANGIT',
    'ORBIT STRIKE': 'HANTAMAN ORBIT',
    'GRAND ORRERY': 'ORBIT MAHADASYAT',
    'SUNBLADE': 'BILAH SURYA',
    'SUNMANE ROAR': 'AUMAN SURYA',
    'BATON FLURRY': 'SERBUAN TONGKAT',
    'SPECIAL DELIVERY': 'KIRIMAN KHUSUS',
    'STAFF FORMS': 'JURUS TONGKAT',
    'ELDER TORTOISE': 'KURA-KURA PURBA',
    'KEYBOARD SMASH': 'HANTAMAN KEYBOARD',
    'SYSTEM BLUE SCREEN': 'LAYAR BIRU SISTEM',
    'SABETAN BERAT': 'SABETAN BERAT',
    'SISTEM OVERDRIVE': 'SISTEM OVERDRIVE',
    'MUSHROOM SLASH': 'SABETAN JAMUR',
    'FUNGAL ERUPTION': 'ERUPSI SPORA'
  };
  const translateMove = (m) => moveTranslations[m] || m;

  const brand = '<span class="wordmark">RAGNAROK<span>TRINITY</span><i>✦</i></span>';
  const footer = () => '<footer class="menu-footer"><span><kbd>W A S D</kbd> / <kbd>↑ ↓ ← →</kbd> PILIH &nbsp; <kbd>ENTER</kbd> KONFIRMASI &nbsp; <kbd>ESC</kbd> KEMBALI</span></footer>';
  function navHeader(title, subtitle) { return `<header class="select-header"><button class="menu-back" data-cmd="back" aria-label="Kembali">← <span>KEMBALI</span></button><div><span class="eyebrow">${subtitle}</span><h1>${title}</h1></div>${brand}</header>`; }
  function fighterPanel(id, side) {
    const f = info(id);
    let yStyle = '';
    if (id === 'yanfah') {
      yStyle = side === 'enemy' ? 'transform: scale(-1, 1) translate(50%, -3%); transform-origin: bottom center;' : 'transform: scale(1) translate(-50%, -3%); transform-origin: bottom center;';
    }
    let statsHtml = '';
    if (f && window.GAME_BALANCE && window.GAME_BALANCE[id]) {
      const bal = window.GAME_BALANCE[id];
      const comboDmg = bal.combo.reduce((a, b) => a + b, 0);
      const pwrPct = Math.min(100, Math.max(10, (comboDmg / 45) * 100));
      const spdPct = Math.min(100, Math.max(10, (bal.movement.runSpeed / 650) * 100));
      const atkSpdPct = Math.min(100, Math.max(10, ((1.4 - bal.movement.attackSpeed) / 0.7) * 100));
      statsHtml = `<div class="fighter-stats">
        <div class="stat-row"><span>KEKUATAN</span><div class="stat-bar"><div class="stat-fill" style="width:${pwrPct}%; background: var(--accent);"></div></div></div>
        <div class="stat-row"><span>KECEPATAN</span><div class="stat-bar"><div class="stat-fill" style="width:${spdPct}%; background: var(--accent);"></div></div></div>
        <div class="stat-row"><span>KELINCAHAN</span><div class="stat-bar"><div class="stat-fill" style="width:${atkSpdPct}%; background: var(--accent);"></div></div></div>
      </div>`;
    }
    return `<div class="fighter-plinth ${side} ${f ? '' : 'unknown'} ${soon(id) ? 'soon' : ''}">${f ? `<img class="selection-cutin" src="${f.cutin || `assets/${id}/ui/cutin.webp`}" alt="" onerror="this.style.display='none'" onload="this.style.display='block'">` : ''}<div class="plinth-light"></div>${f ? `<img class="selection-art" src="${f.art || f.portrait}" alt="${f.name}" style="${yStyle}" onload="this.style.opacity=1">` : ''}  <div class="fighter-copy"><span>${translateTag(f?.tag || '')}</span><h2>${f?.name || '???'}</h2><p>${translateRace(f?.race || '')}</p>${statsHtml}</div></div>`;
  }

  function galleryPreviewPanel(id) {
    const f = info(id);
    if (!f) return `<section class="gallery-preview" id="gallery-preview"><div class="gallery-preview-empty"><span>DATA KARAKTER</span><strong>TERKUNCI</strong><p>Petarung ini belum tersedia.</p></div></section>`;
    let statsHtml = '';
    if (window.GAME_BALANCE && window.GAME_BALANCE[id]) {
      const bal = window.GAME_BALANCE[id];
      const comboDmg = bal.combo.reduce((a, b) => a + b, 0);
      const pwrPct = Math.min(100, Math.max(10, (comboDmg / 45) * 100));
      const spdPct = Math.min(100, Math.max(10, (bal.movement.runSpeed / 650) * 100));
      const atkSpdPct = Math.min(100, Math.max(10, ((1.4 - bal.movement.attackSpeed) / 0.7) * 100));
      statsHtml = `
        <div class="gallery-stats">
          <div class="gallery-stat"><span>KEKUATAN</span><i><b style="width:${pwrPct}%"></b></i><em>${Math.round(pwrPct)}</em></div>
          <div class="gallery-stat"><span>KECEPATAN</span><i><b style="width:${spdPct}%"></b></i><em>${Math.round(spdPct)}</em></div>
          <div class="gallery-stat"><span>KELINCAHAN</span><i><b style="width:${atkSpdPct}%"></b></i><em>${Math.round(atkSpdPct)}</em></div>
        </div>`;
    }
    return `
      <section class="gallery-preview" id="gallery-preview">
        <div class="gallery-preview-frame"></div>
        <div class="gallery-preview-grid"></div>
        <div class="gallery-preview-glow"></div>
        <div class="gallery-preview-top">
          <span class="gallery-index">KARAKTER // ${String(roster.indexOf(id) + 1).padStart(2, '0')}</span>
          <span class="gallery-status"><i></i> PROFIL AKTIF</span>
        </div>
        <div class="gallery-art-wrap">
          <img class="gallery-full-art" src="${f.art || f.portrait}" alt="${f.name}" draggable="false">
          <div class="gallery-art-shadow"></div>
        </div>
        <div class="gallery-copy">
          <div class="gallery-kicker"><span>${translateTag(f.tag || 'PETARUNG')}</span><i></i><b>${translateRace(f.race || 'TIDAK DIKETAHUI')}</b></div>
          <h2>${f.name}</h2>
          <p class="gallery-detail">${translateDetail(f.detail || 'Seorang penantang mendekati arena.')}</p>
          <div class="gallery-tech">
            <div><small>GAYA</small><strong>${translateStyle(f.style || 'PETARUNG')}</strong></div>
            <div><small>DASAR</small><strong>${translateMove(f.basic || '—')}</strong></div>
            <div><small>PAMUNGKAS</small><strong>${translateMove(f.ultimate || '—')}</strong></div>
          </div>
          ${statsHtml}
        </div>
        <div class="gallery-corner tl"></div><div class="gallery-corner tr"></div>
        <div class="gallery-corner bl"></div><div class="gallery-corner br"></div>
      </section>`;
  }

  function render() {
    if (screen === 'home' && root.dataset.screen === 'home') {
      const status = root.querySelector('#menu-ready');
      if (status) status.textContent = game.snapshot().ready ? 'SIAP' : 'MEMUAT…';
      return;
    }
    if (window._homeCycle) { clearInterval(window._homeCycle); window._homeCycle = null; }
    if (lockIn) { clearTimeout(lockIn); lockIn = null; } for (const t of lockTicks) clearTimeout(t); lockTicks = [];
    if (backgroundVideo) { videoPlayToken++; backgroundVideo.pause(); backgroundVideo.remove(); }
    hoveredFighterTile = null;
    const accentFighter = screen === 'select' ? info(hover) : (screen === 'arena' ? fighters[enemy] : fighters[player]);
    document.documentElement.style.setProperty('--accent', (accentFighter || {}).color || '#e8b94a'); root.dataset.screen = screen; root.dataset.step = String(step); root.dataset.mode = mode;
    if (screen === 'home') {
      window._homeCycle = setInterval(() => {
        if (screen !== 'home') return;
        const keys = Object.keys(fighters);
        player = keys[(keys.indexOf(player) + 1) % keys.length];
        const active = fighters[player];
        const img = root.querySelector('.home-char-art');
        const cutinImg = root.querySelector('.home-char-cutin');
        const infoBox = root.querySelector('.home-char-info');

        let loaded = 0;
        const onReady = () => {
          if (++loaded < 2 || screen !== 'home') return;
          if (img) {
            img.style.animation = 'm-float 7s ease-in-out infinite';
            img.style.opacity = '0';
          }
          if (cutinImg) cutinImg.style.opacity = '0';
          if (infoBox) infoBox.style.opacity = '0';

          setTimeout(() => {
            document.documentElement.style.setProperty('--accent', active.color || '#e8b94a');
            if (img) { img.src = active.art; img.style.opacity = '1'; }
            if (cutinImg) { cutinImg.src = active.cutin || `assets/${player}/ui/cutin.webp`; cutinImg.style.opacity = ''; }
            if (infoBox) {
              const infoStr = infoBox.querySelector('strong');
              if (infoStr) infoStr.textContent = active.name;
              const infoSpan = infoBox.querySelector('span');
              if (infoSpan) infoSpan.textContent = translateTag(active.tag);
              infoBox.style.opacity = '1';
            }
          }, 400);
        };
        const preloader = new Image();
        preloader.onload = preloader.onerror = onReady;
        preloader.src = active.art;
        const cutinPreloader = new Image();
        cutinPreloader.onload = cutinPreloader.onerror = onReady;
        cutinPreloader.src = active.cutin || `assets/${player}/ui/cutin.webp`;
      }, 5000);
      const activeChar = fighters[player] || fighters['arco'];
      const charArt = activeChar?.art || 'assets/menu/arco-select.webp';
      const charName = activeChar?.name || 'ARCO';
      root.innerHTML = `<div class="home-layout">
        <img class="home-char-cutin" src="${activeChar.cutin || `assets/${player}/ui/cutin.webp`}" alt="" onerror="this.style.display='none'" onload="this.style.display='block'">
        <header class="home-header">
          <div class="home-logo"><span class="logo-top">RAGNAROK</span><span class="logo-bot">TRINITY</span></div>
          <nav class="home-tabs">
            <style>#front-menu .home-tabs span:hover, #front-menu .home-tabs span:focus { border-bottom-color: var(--accent) !important; color: var(--bone); box-shadow: inset 0 -2px 0 var(--accent); outline: none; } #front-menu .home-tabs:hover .tab-active:not(:hover), #front-menu .home-tabs:has(span:focus) .tab-active:not(:focus) { border-bottom-color: transparent !important; box-shadow: none !important; color: rgba(255, 255, 255, .7); }</style>
            <span class="${screen === 'home' && mode !== 'gallery' ? 'tab-active' : ''}" data-cmd="tab_main" style="cursor:pointer" tabindex="0">BERANDA</span>
            <span class="${mode === 'gallery' && screen === 'select' ? 'tab-active' : ''}" data-cmd="tab_roster" style="cursor:pointer" tabindex="0">KARAKTER</span>
            <span class="${mode === 'gallery' && screen === 'arena' ? 'tab-active' : ''}" data-cmd="tab_arena" style="cursor:pointer" tabindex="0">ARENA</span>
          </nav>
          <div class="header-right">
            <span class="home-status" id="menu-ready">${game.snapshot().ready ? 'SIAP' : 'MEMUAT…'}</span>
            <div class="home-user-profile">
              <div class="home-user-details">
                <span class="home-user-name">Pemain Tamu</span>
                <span class="home-user-rank">PERINGKAT 14</span>
              </div>
              <img src="assets/menu/arco-select.webp" alt="Avatar" class="home-user-avatar">
            </div>
            ${canFullscreen ? `<button class="menu-fullscreen${fullscreenHint ? ' hinted' : ''}" data-cmd="fullscreen" aria-label="Layar Penuh"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg></button>` : ''}
          </div>
        </header>

        <aside class="home-left">
          <span class="home-game-logo-text">RAGNAROK<span>TRINITY</span></span>
          <button class="home-nav-item active" data-cmd="versus">Lawan Komputer</button>
          <button class="home-nav-item" data-cmd="quicktraining">Tanding Cepat</button>
          <button class="home-nav-item" data-cmd="training">Latihan</button>
          <button class="home-nav-item" data-cmd="settings">Pengaturan</button>
          <button class="home-nav-item" data-cmd="about">Tentang</button>
          <button class="home-play" data-cmd="versus">MULAI BERTARUNG <b>→</b></button>
        </aside>

        <main class="home-center">
          <img class="home-char-art" src="${charArt}" alt="${charName}" draggable="false">
          <div class="home-char-info"><strong>${charName}</strong><span>${translateTag(activeChar.tag)}</span></div>
          <div class="home-ground"></div>
        </main>

        <aside class="home-right">
          <div class="home-challenges-title">TANTANGAN HARIAN</div>
          <div class="home-challenge-list">
            <div class="home-challenge-item">
              <div class="home-challenge-header">
                <span class="home-challenge-label">Menangkan 3 Laga Versus</span>
                <span class="home-challenge-xp">250 XP</span>
              </div>
              <div class="home-challenge-prog-wrap">
                <div class="home-challenge-bar-wrap"><div class="home-challenge-bar" style="width:33%"></div></div>
                <span class="home-challenge-prog-text">1 / 3</span>
              </div>
            </div>
            <div class="home-challenge-item">
              <div class="home-challenge-header">
                <span class="home-challenge-label">Dapatkan 20 Hit Skill</span>
                <span class="home-challenge-xp">250 XP</span>
              </div>
              <div class="home-challenge-prog-wrap">
                <div class="home-challenge-bar-wrap"><div class="home-challenge-bar" style="width:60%"></div></div>
                <span class="home-challenge-prog-text">12 / 20</span>
              </div>
            </div>
            <div class="home-challenge-item">
              <div class="home-challenge-header">
                <span class="home-challenge-label">Gunakan Ultimate 5 Kali</span>
                <span class="home-challenge-xp">250 XP</span>
              </div>
              <div class="home-challenge-prog-wrap">
                <div class="home-challenge-bar-wrap"><div class="home-challenge-bar" style="width:40%"></div></div>
                <span class="home-challenge-prog-text">2 / 5</span>
              </div>
            </div>
            <div class="home-challenge-item">
              <div class="home-challenge-header">
                <span class="home-challenge-label">Lakukan Kombo 10 Hit</span>
                <span class="home-challenge-xp">500 XP</span>
              </div>
              <div class="home-challenge-prog-wrap">
                <div class="home-challenge-bar-wrap"><div class="home-challenge-bar" style="width:0%"></div></div>
                <span class="home-challenge-prog-text">0 / 1</span>
              </div>
            </div>
            
            <div class="home-dl-manager" role="button" tabindex="0" onclick="showGlobalDownloadManager()">
              <div class="home-dl-header">
                <span>PENGELOLA UNDUHAN</span>
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              </div>
              <div class="home-dl-progress">
                <div class="home-dl-fill" style="width: ${(() => {
          if (!window.isDLCDownloaded) return 100;
          let total = charList.length + mapList.length;
          let done = 0;
          charList.forEach(c => { if (dlcStatus[c]) done++; });
          mapList.forEach(m => { if (dlcStatus['map_' + m]) done++; });
          return Math.floor((done / total) * 100);
        })()}%"></div>
              </div>
            </div>

          </div>
        </aside>

        <footer class="home-footer-bar">
          <div class="hfb-left">
            <button class="hfb-btn" data-cmd="versus"><kbd>ENTER</kbd> MAIN</button>
            <button class="hfb-btn" data-cmd="versus"><kbd>V</kbd> VERSUS</button>
            <button class="hfb-btn" data-cmd="training"><kbd>T</kbd> LATIHAN</button>
          </div>
        </footer>
      </div>`;
    } else if (screen === 'select') {
      if (mode === 'gallery') {
        const titleStr = 'GALERI KARAKTER';
        const subtitleStr = 'PENELUSUR KARAKTER';
        root.innerHTML = `<div class="selection-backdrop"></div>${navHeader(titleStr, subtitleStr)}<main class="gallery-stage"><section class="gallery-roster"><div class="gallery-roster-head"><div><span class="gallery-eyebrow">AETHER CLASH // BASIS DATA KARAKTER</span><h3>PILIH PETARUNG</h3></div><div class="gallery-page-meta"><span>KOLEKSI</span><strong>${String(opened.length).padStart(2, '0')} / ${String(roster.length).padStart(2, '0')}</strong></div></div><div class="gallery-grid" role="group" aria-label="Daftar karakter">${roster.map((id, i) => {
          const f = info(id);
          return `<div class="gallery-tile-wrap" style="--tile-accent:${f?.color || 'var(--accent)'}"><button class="gallery-tile ${id === hover ? 'highlight' : ''} ${!f ? 'locked' : ''} ${soon(id) ? 'soon' : ''}" data-fighter="${id}" aria-label="${f ? f.name + ' — ' + translateRace(f.race) : 'Slot ' + (i + 1) + ' terkunci'}" aria-disabled="${!fighters[id]}"><span class="gallery-tile-no">${String(i + 1).padStart(2, '0')}</span><img class="${f ? 'portrait-image' : ''}" src="${f?.portrait || 'assets/menu/locked.svg'}" alt="" draggable="false"><span class="gallery-tile-bottom"><b>${f?.name || 'TERKUNCI'}</b><small>${translateRace(f?.race || 'TIDAK TERSEDIA')}</small></span><span class="gallery-scan"></span></button></div>`;
        }).join('')}</div></section>${galleryPreviewPanel(hover)}</main><div class="gallery-hud"><div><kbd>W A S D</kbd> / <kbd>↑ ↓ ← →</kbd> TELUSURI &nbsp; <kbd>SCROLL</kbd> GULIR</div><div><span class="gallery-hud-dot"></span> MODE GALERI <i></i> TANPA PERTARUNGAN</div><button data-cmd="back"><kbd>ESC</kbd> KEMBALI</button></div>`;
        updatePreview(false);
      } else {
        root.innerHTML = `<div class="selection-backdrop"></div>${navHeader(step === 0 ? 'PILIH PETARUNG ANDA' : 'PILIH LAWAN ANDA', mode === 'versus' ? 'LAWAN KOMPUTER' : 'RUANG LATIHAN')}<div class="select-stage"><div id="player-preview">${fighterPanel(step === 0 ? hover : player, 'player')}</div><div class="roster-center"><div class="selection-steps"><span class="${step === 0 ? 'current' : 'done'}">01 <b>PEMAIN</b></span><i></i><span class="${step === 1 ? 'current' : ''}">02 <b>LAWAN</b></span><i></i><span>03 <b>ARENA</b></span></div><div class="roster-grid" role="group" aria-label="Roster karakter">${roster.slice(rosterPage * 12, rosterPage * 12 + 12).map((id, i) => {
          const f = info(id);
          const needsDL = f && dlcStatus[id] === false && fighters[id];
          return `<button class="roster-tile ${id === hover ? 'highlight' : ''} ${!f ? 'locked' : ''} ${soon(id) ? 'soon' : ''} ${needsDL ? 'needs-dl' : ''}" data-fighter="${id}" aria-label="${f ? f.name + ' — ' + translateRace(f.race) + (soon(id) ? ', belum bisa dimainkan' : '') : 'Slot ' + (i + 1) + ' terkunci'}" aria-disabled="${!fighters[id]}"><img class="${f ? 'portrait-image' : ''}" data-portrait-side="${step === 1 ? 'enemy' : 'player'}" src="${f?.portrait || 'assets/menu/locked.svg'}" alt="">${needsDL ? '<div class="dlc-icon-badge"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg></div>' : ''}<span class="roster-name-tag">${f?.name || 'TERKUNCI'}</span><b>${step === 1 && id === player ? 'P1' : ''}</b></button>`;
        }).join('')}</div><div class="roster-controls-wrapper"><div class="roster-pagination"><button class="page-btn" data-cmd="prev-page">&lt;&lt;</button><span class="page-label">HALAMAN ${rosterPage + 1}</span><button class="page-btn" data-cmd="next-page">&gt;&gt;</button></div><div id="fighter-moves" class="fighter-moves"></div><button class="menu-primary confirm-fighter" data-cmd="confirm">${step === 0 ? 'KONFIRMASI PETARUNG' : 'KONFIRMASI LAWAN'} <b>&rarr;</b></button><p id="roster-notice" class="roster-notice" role="status"></p></div></div><div id="enemy-preview">${fighterPanel(step === 1 ? hover : null, 'enemy')}</div></div>${footer()}`;
        updatePreview(false);
      }
    } else if (screen === 'arena') {
      const stages = Object.entries(MatchRules.stages);
      const stageIndex = Math.max(0, stages.findIndex(([id]) => id === stage));
      const st = MatchRules.stages[stage];
      const stageCount = String(stages.length).padStart(2, '0');
      const currentNumber = String(stageIndex + 1).padStart(2, '0');
      const isStageDownloaded = stage === 'amikom' || dlcStatus['map_' + stage] !== false;
      const ready = game.snapshot().ready;
      root.innerHTML = `<div class="arena-screen-bg" style="background-image:url('${st.image}')"></div>${navHeader(mode === 'gallery' ? 'GALERI ARENA' : 'PILIH ARENA', mode === 'gallery' ? 'PENELUSUR MAP' : (mode === 'versus' ? 'LAWAN KOMPUTER / PERSIAPAN' : 'LATIHAN / PERSIAPAN ARENA'))}
        <div class="arena-content">
          ${mode === 'gallery' ? '' : `<div class="arena-matchbar">
            <div class="arena-matchbar-step"><span>03</span><i></i><b>ARENA</b><small>PERSIAPAN AKHIR</small></div>
            <div class="versus-strip">
              <div><img class="portrait-image" data-portrait-side="player" src="${fighters[player]?.portrait || ''}" alt=""><span>P1<strong>${fighters[player]?.name || ''}</strong></span></div>
              <b>VS</b>
              <div><span>CPU<strong>${fighters[enemy]?.name || ''}</strong></span><img class="portrait-image" data-portrait-side="enemy" src="${fighters[enemy]?.portrait || ''}" alt=""></div>
            </div>
            <div class="arena-matchbar-mode"><span>${mode === 'versus' ? 'LAWAN KOMPUTER' : 'LATIHAN'}</span><small>PERMAINAN LOKAL</small></div>
          </div>`}

          <section class="arena-picker" aria-label="Arena selection">
            <div class="arena-preview">
              <img src="${st.image}" alt="${st.name}" class="arena-preview-image">
              <div class="arena-preview-vignette"></div>
              <div class="arena-preview-grid"></div>
              <div class="arena-preview-top">
                <span class="arena-index">${currentNumber} <i>/</i> ${stageCount}</span>
                <span class="arena-live"><i></i> PRATINJAU ARENA</span>
              </div>
              <div class="arena-preview-copy">
                <small>${st.tag || 'MEDAN PERTEMPURAN'}</small>
                <h2>${st.name}</h2>
                <div class="arena-preview-meta"><span>✦ ${st.time || 'SIANG CERAH'}</span><i></i><span>PERTARUNGAN TERAKHIR</span></div>
              </div>
              <div class="arena-preview-corner tl"></div><div class="arena-preview-corner tr"></div><div class="arena-preview-corner bl"></div><div class="arena-preview-corner br"></div>
            </div>

            <aside class="arena-map-panel">
              <div class="arena-map-heading">
                <div><span class="eyebrow">${mode === 'gallery' ? 'AETHER CLASH // BASIS DATA' : 'MEDAN PERTEMPURAN'}</span><strong>${mode === 'gallery' ? 'KOLEKSI ARENA' : 'PILIH ARENA KAMU'}</strong></div>
                <span>${stageCount} PETA</span>
              </div>
              <div class="arena-map-rail" role="group" aria-label="Pilih arena">
                ${stages.map(([id, a], i) => {
        const mapDL = mode === 'gallery' || id === 'amikom' || dlcStatus['map_' + id] !== false;
        return `<button class="arena-tile ${id === stage ? 'selected' : ''} ${!mapDL ? 'needs-dl' : ''}" data-stage="${id}" aria-pressed="${id === stage}">
                  <span class="arena-tile-number">${String(i + 1).padStart(2, '0')}</span>
                  <img src="${a.image}" alt="${a.name}">
                  ${!mapDL ? '<div class="dlc-icon-badge"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg></div>' : ''}
                  <span class="arena-tile-info"><b>${a.name}</b><small>${a.tag || 'MEDAN PERTEMPURAN'}</small></span>
                  <span class="arena-tile-check">✓</span>
                </button>`;
      }).join('')}
              </div>
            </aside>
          </section>

          ${mode === 'gallery' ? `<div class="gallery-hud"><div><kbd>W A S D</kbd> / <kbd>↑ ↓ ← →</kbd> TELUSURI &nbsp; <kbd>SCROLL</kbd> GULIR</div><div><span class="gallery-hud-dot"></span> MODE GALERI <i></i> TANPA PERTARUNGAN</div><button data-cmd="back"><kbd>ESC</kbd> KEMBALI</button></div>` : `
          <section class="arena-controls">
            <div class="arena-difficulty">
              <div class="arena-control-heading"><span class="eyebrow">${mode === 'versus' ? 'TINGKAT KESULITAN' : 'MODE LATIHAN'}</span><small>${mode === 'versus' ? '' : 'PENGATURAN LATIHAN'}</small></div>
              ${mode === 'versus' ? `<div class="difficulty-buttons" role="group" aria-label="Tingkat kesulitan">${Object.entries(MatchRules.difficulties).map(([id, d], i) => { const label = { 'Easy': 'Mudah', 'Medium': 'Sedang', 'Hard': 'Sulit', 'Excellent': 'Ahli' }[d.label] || d.label; return `<button data-level="${id}" class="${id === level ? 'selected' : ''}" aria-pressed="${id === level}"><i>${'▰'.repeat(i + 1)}</i><b>${label}</b></button>`; }).join('')}</div>` : '<p class="training-note">Waktu tak terbatas · Lawan pasif · Ulangi kapan saja</p>'}
            </div>
            <div class="match-rules"><b>${mode === 'versus' ? 'MENANG 2 KALI' : 'BUAT SETIAP PUKULAN BERARTI'}</b><span>${mode === 'versus' ? 'MAKSIMAL 3 RONDE · 90 DETIK' : 'PELACAK KOMBO · SEMUA JURUS TERSEDIA'}</span></div>
            <button class="menu-primary start-battle" data-cmd="start" ${ready ? '' : 'disabled'}><span>${!isStageDownloaded ? 'UNDUH MAP' : (ready ? (mode === 'versus' ? 'MULAI BATTLE' : 'MASUK LATIHAN') : 'MENYIAPKAN ARENA…')}</span><b>→</b></button>
          </section>
          <p id="setup-error" role="status"></p>
          `}
        </div>${mode === 'gallery' ? '' : footer()}`;
    } else if (screen === 'about') {
      root.innerHTML = `<div class="home-art dim blur-bg"></div>${navHeader('CHRONICLES', 'RAGNAROK: TRINITY')}
<div class="chronicles-wrapper">
  
  <div class="chronicles-hero">
    <div class="c-hero-deco">
      <span>TENTANG</span>
      <i></i>
    </div>
    <div class="c-hero-title">
      <h2>TIGA FRAKSI.</h2>
      <h2 class="c-hl">SATU TAKDIR.</h2>
    </div>
    <p class="c-hero-desc">RAGNAROK TRINITY adalah puncak dari perselisihan kosmis di alam semesta. Ketika batas dimensi hancur, tiga ras agung—Dewa kahyangan, pahlawan gaib dari dunia Fantasi, dan Manusia bertekad baja—bertemu di satu arena pamungkas untuk memperebutkan kendali atas takdir semesta.</p>
  </div>

  <div class="chronicles-factions">
    <div class="c-faction-card" style="animation-delay: 0.10s">
      <div class="c-f-num">01</div>
      <div class="c-f-icon">❂</div>
      <div class="c-f-name">DEWA</div>
      <div class="c-f-label">RAS DEWA · PENGUASA KAHYANGAN</div>
      <div class="c-f-divider"></div>
      <p>Entitas suci pencipta hukum semesta. Mereka turun dari kahyangan dengan kekuatan petir dan penghakiman absolut untuk menundukkan dimensi lain.</p>
      <div class="c-f-divider"></div>
      <div class="c-f-footer"><span>KEKUATAN LANGIT</span><span>01 / 03</span></div>
    </div>
    
    <div class="c-faction-card" style="animation-delay: 0.18s">
      <div class="c-f-num">02</div>
      <div class="c-f-icon">✦</div>
      <div class="c-f-name">FANTASI</div>
      <div class="c-f-label">DIMENSI MISTIS · LEGENDA KUNO</div>
      <div class="c-f-divider"></div>
      <p>Ras pahlawan dan entitas magis dari dimensi lain. Mereka bertarung dengan jurus gaib, sihir elemen, dan kekuatan yang melampaui nalar manusia.</p>
      <div class="c-f-divider"></div>
      <div class="c-f-footer"><span>KEKUATAN MISTIS</span><span>02 / 03</span></div>
    </div>
    
    <div class="c-faction-card" style="animation-delay: 0.26s">
      <div class="c-f-num">03</div>
      <div class="c-f-icon">⚔</div>
      <div class="c-f-name">MANUSIA</div>
      <div class="c-f-label">RAS MANUSIA · TEKAD BAJA</div>
      <div class="c-f-divider"></div>
      <p>Ras manusia biasa yang tidak punya sihir atau mukjizat ilahi. Namun, penguasaan bela diri murni dan tekad tak bisa patah menjadikan mereka petarung paling mematikan.</p>
      <div class="c-f-divider"></div>
      <div class="c-f-footer"><span>KEKUATAN MANUSIA</span><span>03 / 03</span></div>
    </div>
  </div>

  <div class="chronicles-hud">
    <div class="c-hud-left">
      <b>● ARSIP KOSMIS AKTIF</b>
      <i></i>
      <span>3 RAS TERDETEKSI</span>
    </div>
    <div class="c-hud-center">
      <div class="c-stat"><b>03</b><span>RAS</span></div>
      <div class="c-stat"><b>13</b><span>PETARUNG</span></div>
      <div class="c-stat"><b>∞</b><span>RIVALITAS</span></div>
    </div>
    <div class="c-hud-right">
      <button class="c-hud-btn" data-cmd="home">
        <span>↪</span> KEMBALI KE MAIN MENU
      </button>
    </div>
  </div>
</div>`;
    } else if (screen === 'result') {
      const won = result.winner === 'player', winner = won ? result.player : result.enemy; root.innerHTML = `<div class="result-bg"></div>${navHeader('MATCH COMPLETE', MatchRules.stages[result.stage].name.toUpperCase())}<div class="result-layout"><img class="result-fighter" src="${fighters[winner].art}" alt="${fighters[winner].name}"><div class="result-copy"><span class="eyebrow">${won ? 'PLAYER 1' : 'COMPUTER'} TAKES THE MATCH</span><h1>${won ? 'VICTORY' : 'DEFEAT'}</h1><p>${fighters[winner].name} WINS</p><div class="final-score"><span>${result.playerWins}</span><i>—</i><span>${result.enemyWins}</span></div><small>${fighters[result.player].name} vs ${fighters[result.enemy].name} · ${MatchRules.difficulties[result.level].label}</small><button class="menu-primary" data-cmd="rematch">REMATCH <b>→</b></button><button class="result-secondary" data-cmd="reselect">CHARACTER SELECT</button><button class="result-secondary" data-cmd="home">MAIN MENU</button></div></div>`;
    }
    bind(); attachBackground();
  }
  function updatePreview(play = true) {
    document.documentElement.style.setProperty('--accent', (info(hover) || {}).color || '#e8b94a');
    root.querySelectorAll('[data-fighter]').forEach(b => b.classList.toggle('highlight', b.dataset.fighter === hover));
    if (mode === 'gallery') {
      const panel = root.querySelector('#gallery-preview');
      if (panel) {
        panel.outerHTML = galleryPreviewPanel(hover);
        const fresh = root.querySelector('#gallery-preview');
        if (fresh) {
          fresh.classList.add('gallery-preview-refresh');
          requestAnimationFrame(() => fresh.classList.remove('gallery-preview-refresh'));
        }
      }
      if (play) sfx('move');
      return;
    }
    const panel = root.querySelector(step === 0 ? '#player-preview' : '#enemy-preview'); if (panel) panel.innerHTML = fighterPanel(hover, step === 0 ? 'player' : 'enemy');
    const f = info(hover), moves = root.querySelector('#fighter-moves'); if (moves) moves.innerHTML = f ? `<b>${translateRace(f.race)}</b>` : '<b>SEGERA HADIR</b>';
    const confirm = root.querySelector('.confirm-fighter'); if (confirm) confirm.setAttribute('aria-disabled', String(!fighters[hover])); if (play) sfx('move');
  }
  function focusFighter(id) {
    if (hover === id || lockIn) return;
    hover = id;
    updatePreview();
    if (mode === 'gallery') {
      root.querySelector(`[data-fighter="${id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
  function confirm() {
    if (mode === 'gallery') {
      if (soon(hover) || !fighters[hover]) { sfx('locked', true); return; }
      updatePreview(true);
      return;
    }
    if (lockIn) return;
    const needsDL = fighters[hover] && dlcStatus[hover] === false;
    if (needsDL) {
      sfx('locked', true);
      showDownloadModal(hover);
      return;
    }
    if (!fighters[hover]) { sfx('locked', true); root.querySelector('#roster-notice').textContent = soon(hover) ? showcase[hover].name + ' belum bisa dimainkan.' : 'Karakter ini belum terbuka.'; return; }
    // The pick flashes 3 times (tile and big art) with a lock-in chime before the next step, so the screen does not jump.
    sfx('pick', true); game.announceSelection(hover); root.dataset.picking = 'true';
    const tileEl = root.querySelector(`[data-fighter="${hover}"]`);
    if (tileEl) {
      tileEl.classList.remove('picked');
      void tileEl.offsetWidth;
      tileEl.classList.add('picked');
    }
    const targetPreview = root.querySelector(step === 0 ? '#player-preview' : '#enemy-preview');
    if (targetPreview) {
      targetPreview.classList.remove('picked');
      void targetPreview.offsetWidth;
      targetPreview.classList.add('picked');
      const plinthEl = targetPreview.querySelector('.fighter-plinth');
      if (plinthEl) plinthEl.classList.add('picked');
    }
    lockTicks = [1, 2].map(i => setTimeout(() => sfx('blink', true), i * PICK_FLASH * 1000));

    // Check duration of the voice line so we don't cut it off prematurely when moving to arena
    const voiceDuration = (window.ANNOUNCER_MANIFEST?.clips?.['select_' + hover]?.duration || 0) * 1000;
    let transitionDelay = step === 1 ? Math.max(3 * PICK_FLASH * 1000, voiceDuration + 200) : (3 * PICK_FLASH * 1000);
    if (hover === 'yanfah' || hover === 'dhyla') transitionDelay = 2000;
    if (hover === 'valkren') transitionDelay = 3000;

    lockIn = setTimeout(() => { lockIn = null; delete root.dataset.picking; if (step === 0) { player = hover; step = 1; hover = 'arco'; } else { enemy = hover; screen = 'arena'; step = 2; } rosterPage = Math.floor(roster.indexOf(hover) / 12); render(); }, transitionDelay);
  }
  function back() {
    if (lockIn) return;
    game.stopAnnouncer();
    sfx('back', true);
    if (mode === 'gallery') {
      mode = 'versus';
      screen = 'home';
      render();
      return;
    }
    if (screen === 'arena') { screen = 'select'; step = 1; hover = enemy; }
    else if (screen === 'select' && step === 1) { step = 0; hover = player; }
    else screen = 'home';
    if (screen === 'select') rosterPage = Math.floor(roster.indexOf(hover) / 12);
    render();
  }
  function start() {
    if (stage !== 'amikom' && dlcStatus['map_' + stage] === false) {
      sfx('locked', true);
      showDownloadModal(stage, true);
      return;
    }

    // Create VS Screen Overlay
    const p1 = fighters[player] || fighters['arco'];
    const p2 = fighters[enemy] || fighters['fenr'];
    const st = MatchRules.stages[stage];

    const vsHTML = `
      <div id="vs-screen" class="vs-screen" style="--c1: ${p1.color}; --c2: ${p2.color}; background-image: url('${st.image}');">

        <!-- LAPISAN LATAR -->
        <div class="vs-bg-dim"></div>
        <div class="vs-panel vs-panel-p1"></div>
        <div class="vs-panel vs-panel-p2"></div>
        <div class="vs-halftone"></div>
        <div class="vs-speed vs-speed-p1"></div>
        <div class="vs-speed vs-speed-p2"></div>

        <!-- TEKS RAKSASA DI BELAKANG KARAKTER -->
        <div class="vs-ghost vs-ghost-p1">${p1.name}</div>
        <div class="vs-ghost vs-ghost-p2">${p2.name}</div>

        <!-- KARAKTER -->
        <div class="vs-fighter vs-p1">
          <img src="${p1.art}" alt="" style="filter: drop-shadow(0 0 24px ${p1.color}) drop-shadow(0 0 4px #000);">
        </div>
        <div class="vs-fighter vs-p2">
          <img src="${p2.art}" alt="" style="filter: drop-shadow(0 0 24px ${p2.color}) drop-shadow(0 0 4px #000);">
        </div>

        <!-- GARIS DIAGONAL TENGAH -->
        <div class="vs-slash"></div>

        <!-- PLATE NAMA -->
        <div class="vs-plate vs-plate-p1">
          <span class="vs-tag"><b>P1</b> / ${p1.tag}</span>
          <h1>${p1.name}</h1>
        </div>
        <div class="vs-plate vs-plate-p2">
          <span class="vs-tag"><b>${mode === 'versus' ? 'CPU' : 'P2'}</b> / ${p2.tag}</span>
          <h1>${p2.name}</h1>
        </div>

        <!-- LOGO VS -->
        <div class="vs-center-logo" data-text="VS">
          <span class="vs-logo-main">VS</span>
        </div>

        <!-- LOADING -->
        <div class="vs-loading">
          <div class="vs-loading-text">MEMUAT ARENA...</div>
          <div class="vs-loading-bar"><i></i></div>
        </div>

        <!-- EFEK LAYAR PENUH -->
        <div class="vs-bar vs-bar-top"></div>
        <div class="vs-bar vs-bar-bottom"></div>
        <div class="vs-scanlines"></div>
        <div class="vs-vignette"></div>
        <div class="vs-flash"></div>
      </div>
    `;

    const vsNode = document.createElement('div');
    vsNode.innerHTML = vsHTML;
    const vsEl = vsNode.firstElementChild;
    document.body.appendChild(vsEl);

    sfx('confirm', true);
    if (game.playSound) {
      game.playSound('vs_swoosh');
      setTimeout(() => game.playSound('vs_impact'), 350);
      setTimeout(() => game.playSound('vs_tension'), 600);
      setTimeout(() => game.playSound('vs_bersiap'), 1200);
    }

    document.getElementById('load-state')?.classList.add('hidden'); // Hide the old loader just in case

    // Hold VS screen for ~2.5s to let animation play out
    setTimeout(() => {
      const started = game.startMatch({ player, enemy, stage, level, mode });
      if (started) {
        document.querySelector('#arena').focus();

        // Wait for game engine to finish loading and transition out of menu
        const checkLoaded = setInterval(() => {
          if (!document.body.classList.contains('in-menu')) {
            clearInterval(checkLoaded);
            vsEl.classList.add('fade-out');
            setTimeout(() => vsEl.remove(), 500);
          }
        }, 100);

      } else {
        vsEl.remove();
        const error = root.querySelector('#setup-error');
        if (error) error.textContent = 'Aset belum siap. Tunggu sebentar lalu coba lagi.';
        sfx('locked', true);
      }
    }, 2500);
  }
  function command(cmd) {
    if (lockIn) return;
    if (cmd === 'fullscreen') { sfx('move', true); dismissFullscreenHint(); game.toggleFullscreen?.(); return; }
    if (cmd === 'confirm') { confirm(); return; } if (cmd === 'back') { back(); return; }
    if (cmd === 'prev-page') { rosterPage = (rosterPage > 0) ? rosterPage - 1 : Math.ceil(roster.length / 12) - 1; hover = roster[rosterPage * 12]; focusFighter(hover); sfx('move'); render(); return; }
    if (cmd === 'next-page') { rosterPage = (rosterPage < Math.ceil(roster.length / 12) - 1) ? rosterPage + 1 : 0; hover = roster[rosterPage * 12]; focusFighter(hover); sfx('move'); render(); return; }
    if (cmd === 'tab_main') { sfx('move', true); game.stopAnnouncer(); screen = 'home'; mode = 'versus'; render(); return; }
    if (cmd === 'tab_roster') { sfx('move', true); mode = 'gallery'; screen = 'select'; step = 0; player = 'arco'; hover = 'arco'; rosterPage = 0; render(); return; }
    if (cmd === 'tab_arena') { sfx('move', true); mode = 'gallery'; screen = 'arena'; if (!stage) stage = 'amikom'; render(); return; }
    if (cmd === 'tab_settings') { sfx('move', true); game.openSettings(); return; }
    sfx('confirm', true);
    if (cmd === 'versus' || cmd === 'training') { mode = cmd; screen = 'select'; step = 0; player = 'arco'; hover = 'arco'; rosterPage = 0; render(); }
    if (cmd === 'quicktraining') {
      const qmPref = localStorage.getItem('aether.qmChar') || 'random';
      if (qmPref !== 'random' && fighters[qmPref] && dlcStatus[qmPref] === false) {
        sfx('locked', true);
        showDownloadModal(qmPref);
        return;
      }
      const chars = Object.keys(fighters).filter(c => dlcStatus[c] !== false);
      const stages = Object.keys(MatchRules?.stages || {}).filter(s => s === 'amikom' || dlcStatus['map_' + s] !== false);
      const rStage = stages[Math.floor(Math.random() * stages.length)] || 'amikom';
      const rPlayer = (qmPref !== 'random' && chars.includes(qmPref)) ? qmPref : (chars[Math.floor(Math.random() * chars.length)] || 'arco');
      let rEnemy;
      do { rEnemy = chars[Math.floor(Math.random() * chars.length)] || 'arco'; } while (rEnemy === rPlayer && chars.length > 1);
      if (game.startMatch({ player: rPlayer, enemy: rEnemy, stage: rStage, level: 'medium', mode: 'training' })) { document.querySelector('#arena').focus(); }
      else { sfx('locked', true); }
    }
    if (cmd === 'settings') game.openSettings(); if (cmd === 'about') { screen = 'about'; render(); }
    if (cmd === 'home') { game.stopAnnouncer(); screen = 'home'; render(); } if (cmd === 'start') start();
    if (cmd === 'rematch') { ({ player, enemy, stage, level, mode } = result); start(); }
    if (cmd === 'reselect') { screen = 'select'; step = 0; hover = player; render(); }
  }
  function bind() {
    root.querySelectorAll('[data-cmd]').forEach(b => { b.onclick = () => command(b.dataset.cmd); b.onfocus = () => sfx('hover'); });
    root.querySelectorAll('.home-nav-item').forEach(b => {
      const updateNav = () => {
        root.querySelectorAll('.home-nav-item').forEach(n => n.classList.remove('active'));
        b.classList.add('active');
        const playBtn = root.querySelector('.home-play');
        if (playBtn) {
          playBtn.dataset.cmd = b.dataset.cmd;
          let label = b.textContent.trim().toUpperCase();
          playBtn.innerHTML = `${label} <b>&rarr;</b>`;
        }
      };
      b.addEventListener('pointerenter', () => {
        hoveredNavItem = b;
        updateNav();
      });
      b.addEventListener('pointerleave', () => {
        if (hoveredNavItem === b) hoveredNavItem = null;
      });
      b.addEventListener('focus', () => {
        if (!hoveredNavItem) updateNav();
      });
    });
    root.querySelectorAll('[data-fighter]').forEach(b => {
      b.onpointerenter = () => {
        hoveredFighterTile = b.dataset.fighter;
        focusFighter(b.dataset.fighter);
      };
      b.onpointerleave = () => {
        if (hoveredFighterTile === b.dataset.fighter) hoveredFighterTile = null;
      };
      b.onfocus = () => {
        if (!hoveredFighterTile) focusFighter(b.dataset.fighter);
      };
      b.onclick = () => {
        focusFighter(b.dataset.fighter);
        if (!touch) confirm();
      };
    });
    root.querySelectorAll('[data-stage]').forEach(b => b.onclick = () => { stage = b.dataset.stage; sfx('move', true); render(); const el = root.querySelector(`[data-stage="${stage}"]`); if (el) { el.focus(); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); } });
    root.querySelectorAll('.arena-tile .dlc-icon-badge').forEach(b => {
      b.onclick = (e) => {
        e.stopPropagation();
        const st = b.closest('[data-stage]').dataset.stage;
        if (st && window.downloadDLC) {
          sfx('locked', true);
          showDownloadModal(st, true);
        }
      };
    });
    root.querySelectorAll('[data-level]').forEach(b => b.onclick = () => { level = b.dataset.level; sfx('move', true); render(); root.querySelector(`[data-level="${level}"]`).focus(); });
  }
  document.addEventListener('keydown', e => {
    if (root.hidden || document.querySelector('dialog[open]')) return;
    interacted = true;
    if (lockIn) { e.preventDefault(); return; }
    if (e.key === 'Escape') { e.preventDefault(); back(); return; }

    const keyLower = e.key.toLowerCase();
    const isNavKey = ['arrowleft', 'arrowright', 'arrowup', 'arrowdown', 'a', 'd', 'w', 's'].includes(keyLower);

    // Enforce cooldown delay for navigation keys (WASD / arrows) across all screens
    if (isNavKey) {
      const now = performance.now();
      if (now - lastNavTime < NAV_DELAY) {
        e.preventDefault();
        return;
      }
      lastNavTime = now;
    }

    if (screen === 'select' && isNavKey) {
      e.preventDefault();
      if (hoveredFighterTile) return;
      const offset = { arrowleft: -1, a: -1, arrowright: 1, d: 1, arrowup: -4, w: -4, arrowdown: 4, s: 4 }[keyLower];
      if (mode === 'gallery') {
        const curIdx = roster.indexOf(hover);
        let nextIdx = curIdx + offset;
        if (nextIdx < 0) {
          nextIdx = (curIdx + offset + roster.length) % roster.length;
        } else if (nextIdx >= roster.length) {
          nextIdx = (Math.abs(offset) === 4) ? (curIdx % 4) : 0;
          if (nextIdx >= roster.length) nextIdx = roster.length - 1;
        }
        const nextHover = roster[nextIdx];
        if (nextHover) {
          focusFighter(nextHover);
          const el = root.querySelector(`[data-fighter="${nextHover}"]`);
          if (el) {
            el.focus();
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
        return;
      }
      const pageStart = rosterPage * 12;
      let localIndex = (roster.indexOf(hover) - pageStart);
      const oldPage = rosterPage;
      if (Math.abs(offset) === 4) { localIndex = (localIndex + offset + 12) % 12; } else { localIndex += offset; if (localIndex < 0) { rosterPage = (rosterPage > 0) ? rosterPage - 1 : Math.ceil(roster.length / 12) - 1; localIndex = 11; } else if (localIndex >= 12) { rosterPage = (rosterPage < Math.ceil(roster.length / 12) - 1) ? rosterPage + 1 : 0; localIndex = 0; } }
      const nextHover = roster[rosterPage * 12 + localIndex];

      if (rosterPage !== oldPage) {
        hover = nextHover;
        sfx('move');
        render();
        const el = root.querySelector(`[data-fighter="${hover}"]`);
        if (el) el.focus();
      } else {
        focusFighter(nextHover);
        const el = root.querySelector(`[data-fighter="${hover}"]`);
        if (el) el.focus();
      }
      return;
    }
    if (screen === 'select' && (e.key === 'Enter' || e.key === ' ')) { const cmd = e.target.closest?.('[data-cmd]')?.dataset.cmd; if (cmd && cmd !== 'confirm') return; e.preventDefault(); confirm(); return; }
    if (screen === 'arena' && isNavKey) {
      e.preventDefault();
      const levels = Object.keys(MatchRules.difficulties), stages = Object.keys(MatchRules.stages);
      const vertical = ['arrowup', 'arrowdown', 'w', 's'].includes(keyLower);
      const backward = ['arrowleft', 'arrowup', 'a', 'w'].includes(keyLower);
      if (!vertical && mode === 'versus') { level = levels[(levels.indexOf(level) + (backward ? -1 : 1) + levels.length) % levels.length]; } else { stage = stages[(stages.indexOf(stage) + (backward ? -1 : 1) + stages.length) % stages.length]; }
      sfx('move');
      render();
        const el = root.querySelector(`[data-stage="${stage}"]`);
        if (el) { el.focus(); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
        return;
      }
    if (screen === 'arena' && mode !== 'gallery' && e.key === 'Enter' && (!e.target.closest?.('button') || e.target.closest('.arena-tile') || e.target.closest('[data-level]'))) { e.preventDefault(); command('start'); return; }
    if (screen === 'home' && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      const activeTab = document.activeElement?.closest('.home-tabs span');
      if (activeTab && activeTab.dataset.cmd) {
        command(activeTab.dataset.cmd);
        return;
      }
      const currentActive = root.querySelector('.home-nav-item.active');
      if (currentActive && currentActive.dataset.cmd) {
        command(currentActive.dataset.cmd);
      } else {
        command('versus');
      }
      return;
    }
    if (screen === 'home' && ['arrowleft', 'arrowright', 'a', 'd'].includes(keyLower)) {
      e.preventDefault();
      const tabs = [...root.querySelectorAll('.home-tabs span')];
      let current = tabs.findIndex(t => document.activeElement === t);
      if (current === -1) current = tabs.findIndex(t => t.classList.contains('tab-active'));
      if (current === -1) current = 0;
      const next = (current !== -1 && document.activeElement?.closest('.home-tabs')) ? (current + (['arrowleft', 'a'].includes(keyLower) ? -1 : 1) + tabs.length) % tabs.length : current;
      tabs[next].focus();
      sfx('move');
      return;
    }
    if (screen === 'home' && ['arrowup', 'arrowdown', 'w', 's'].includes(keyLower)) {
      e.preventDefault();
      const list = [...root.querySelectorAll('.home-nav-item')];
      const activeEl = root.querySelector('.home-nav-item.active') || document.activeElement;
      let current = list.indexOf(activeEl);
      if (current === -1) current = 0;
      const next = (current + (['arrowup', 'w'].includes(keyLower) ? -1 : 1) + list.length) % list.length;
      list[next].focus();
      root.querySelectorAll('.home-nav-item').forEach(n => n.classList.remove('active'));
      list[next].classList.add('active');
      const playBtn = root.querySelector('.home-play');
      if (playBtn) {
        playBtn.dataset.cmd = list[next].dataset.cmd;
        let label = list[next].textContent.trim().toUpperCase();
        playBtn.innerHTML = `${label} <b>&rarr;</b>`;
      }
    }
  });
  window.FrontEnd = { syncBackground, home() { screen = 'home'; game.setMenuOpen(true); render(); }, showResult(data) { result = data; ({ player, enemy, stage, level, mode } = data); screen = 'result'; game.setMenuOpen(true); render(); }, assetsReady(ok = true) { if (game.snapshot().menuOpen) { render(); if (!ok) { const status = root.querySelector('#menu-ready'); if (status) status.textContent = 'ASSET ERROR · RELOAD REQUIRED'; } } } };
  // First paint after the loading screen's download, so menu pictures come straight from the cache.
  Promise.resolve(window.RAGNAROK_PRELOAD).then(render);
})();







