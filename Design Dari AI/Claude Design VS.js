// Ganti HANYA isi template literal vsHTML di menu.js dengan ini.
// Logika setInterval / setTimeout / game.startMatch() JANGAN diubah.

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
