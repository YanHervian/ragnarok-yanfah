# Panduan Membuat Karakter — Aether Clash

> **Versi:** Oktober 2026 — Diaudit berdasarkan kode Ramuru, Valkren, Dhyla, dan Yanfah.

---

## UNTUK AI — BACA DULU, JANGAN LANGSUNG EKSEKUSI

Kamu adalah asisten yang memandu pembuatan karakter baru dari awal sampai selesai.

**ATURAN KERAS:**
1. **SELALU tanya terlebih dahulu** sebelum eksekusi apapun di tiap tahap.
2. **JANGAN edit `core/game.js`** untuk mengatur posisi, ukuran, warna, atau timing efek visual. Semua itu diatur di `assets/[nama]/[nama].js`.
3. **JANGAN lanjut ke tahap berikutnya** sebelum semua checklist selesai dan developer konfirmasi.
4. **Ganti semua placeholder** (`[nama]`, `[NAMA]`, `[NamaClass]`, dll) sebelum kode dieksekusi.
5. **Bump cache** di `index.html` setiap kali ada perubahan file yang dipakai game.

---

## LANGKAH 0 — Wawancara Awal (WAJIB, TANYA SEMUA SEBELUM MULAI)

Sebelum melakukan APAPUN, tanyakan semua pertanyaan ini ke developer:

```
1.  Nama karakternya?     (contoh: ramuru)           -> [nama]
2.  Nama class-nya?       (contoh: Ramuru)            -> [NamaClass]
3.  Singkatan 2 huruf?    (contoh: RM)               -> [AB]
4.  Nama tampil di game?  (contoh: 'Ramuru')          -> [NamaDisplay]
5.  Ras karakter?         (Manusia/Fantasi/Dewa)      -> [RAS]
6.  Julukan singkat?      (contoh: THE SLIME ALCHEMIST) -> [JULUKAN]
7.  Warna tema (hex)?     (contoh: #00bfff)           -> [KodeWarnaHex]
8.  Mulai dari tahap mana?
    -> Tahap 1: Sprite (dari nol)
    -> Tahap 2: FX/Efek Visual
    -> Tahap 3: UI (Portrait, Icon, Cutin)
    -> Tahap 4: Audio
9.  Skill 1 bertipe apa?
    -> PROYEKTIL: tembakan terbang ke depan
    -> DASH: karakter melesat maju menabrak musuh
    -> AREA: diam di tempat, serangan menghantam area     -> [TipeSkill1]
10. Skill 2 bertipe apa?
    -> Area, Ground, atau Lainnya                         -> [TipeSkill2]
```

Setelah semua dijawab:
- Tulis ringkasan: *"Baik! Saya akan buat karakter [NamaDisplay] ([nama]) ras [RAS] warna [KodeWarnaHex]. Skill 1: [TipeSkill1], Skill 2: [TipeSkill2]. Mulai Tahap [X]."*
- **Tunggu konfirmasi developer** sebelum lanjut.

---

## Referensi Singkatan

| Variabel | Penjelasan | Contoh (Ramuru) |
|---|---|---|
| `[nama]` | Nama huruf kecil | `ramuru` |
| `[NAMA]` | Nama HURUF BESAR | `RAMURU` |
| `[NamaClass]` | Nama object `window.X` | `Ramuru` |
| `[AB]` | Singkatan 2 huruf variabel kit | `RM` |
| `[NamaDisplay]` | Nama tampil di game | `'Ramuru'` |
| `[RAS]` | Ras karakter | `Manusia` |
| `[JULUKAN]` | Julukan | `THE SLIME ALCHEMIST` |
| `[KodeWarnaHex]` | Warna tema efek hit/partikel | `#00bfff` |
| `[TipeSkill1]` | Tipe skill 1 | `DASH` |
| `[TipeSkill2]` | Tipe skill 2 | `AREA` |

---

## Konsep Pipeline Asset

```
USER TARUH PNG MENTAHAN        AI PROSES               HASIL FINAL
di folder raw-source      =>   resize/sprite-gen   =>  WebP + manifest.js
(tidak langsung dipakai)                               (dipakai game)
```

**Tiga folder raw-source:**

| Folder | Isi |
|---|---|
| `run/raw-original/` | PNG sprite animasi karakter |
| `ui/raw-original-skill/` | PNG efek visual / FX |
| `ui/raw-original-ui/` | PNG aset UI (portrait, cutin, ikon) |

---

## Struktur Folder Karakter Lengkap

```
assets/[nama-karakter]/
|
+-- [nama-karakter].js          <- Logika combat (dibuat oleh AI)
+-- manifest.js                 <- Salinan dari run/manifest.js (dikopi oleh AI)
|
+-- run/
|   +-- raw-original/           <- USER TARUH PNG SPRITE DI SINI
|   |   +-- idle.png
|   |   +-- walk.png
|   |   +-- run.png
|   |   +-- jump.png
|   |   +-- doublejump.png
|   |   +-- crouch.png
|   |   +-- attack1.png
|   |   +-- attack2.png
|   |   +-- attack3.png
|   |   +-- skill1.png
|   |   +-- skill2.png
|   |   +-- ultimate.png
|   |   +-- hurt.png
|   |   +-- down.png
|   |   +-- recover.png
|   |
|   +-- raw/                    <- AI OUTPUT: hasil resize
|   +-- frames/                 <- AI OUTPUT: frame individual
|   +-- manifest.js             <- AI OUTPUT
|   +-- manifest.json           <- AI OUTPUT
|   +-- sprite-sheet-alpha.png  <- AI OUTPUT
|   +-- sprite-sheet-alpha.webp <- AI OUTPUT (dipakai game)
|
+-- ui/
|   +-- raw-original-skill/     <- USER TARUH PNG FX DI SINI
|   +-- raw-original-ui/        <- USER TARUH PNG UI DI SINI
|   +-- fx-*.webp               <- AI OUTPUT: konversi FX
|   +-- portrait.webp
|   +-- cutin.webp
|   +-- icon-attack.webp
|   +-- icon-skill1.webp
|   +-- icon-skill2.webp
|   +-- icon-ultimate.webp
|
+-- audio/
    +-- [nama]-ultimate.mp3     <- USER TARUH LANGSUNG
    +-- [nama]-wins.mp3         <- USER TARUH LANGSUNG
    +-- select-[nama].mp3       <- USER TARUH LANGSUNG
    +-- [nama]-skill1.mp3       <- USER TARUH (opsional, sfx skill 1)
    +-- [nama]-skill2.mp3       <- USER TARUH (opsional, sfx skill 2)
```

---

## TAHAP 1 — Sprite & Karakter (Bisa Dimainkan)

**Hasil akhir tahap ini:** Karakter bisa dipilih dan dimainkan di arena dengan semua animasi.

---

### STOP & TANYA — Sebelum mulai Tahap 1

Tanyakan ini ke developer sebelum eksekusi:

```
1. "Sudah ada folder assets/[nama]/ belum?"
2. "15 PNG sprite sudah siap untuk ditaruh di folder?"
   Jika BELUM: buat folder dulu, minta developer taruh file, tunggu konfirmasi.
   Jika SUDAH: lanjut proses.
3. "Ada perubahan ukuran sprite yang diinginkan, atau pakai scale default?"
```

---

### 1.1 — Buat Folder

```powershell
$char = "[nama]"
$base = "c:\Users\ACER\Downloads\aether-clash-main\assets\$char"

New-Item -ItemType Directory -Force -Path "$base\run\raw-original"
New-Item -ItemType Directory -Force -Path "$base\run\raw"
New-Item -ItemType Directory -Force -Path "$base\run\frames"
New-Item -ItemType Directory -Force -Path "$base\ui\raw-original-skill"
New-Item -ItemType Directory -Force -Path "$base\ui\raw-original-ui"
New-Item -ItemType Directory -Force -Path "$base\audio"

Write-Host "Folder siap! Taruh 15 PNG sprite di: $base\run\raw-original\"
Write-Host "Background sprite WAJIB: MAGENTA #FF00FF"
Write-Host "Kabari kalau sudah selesai menaruh file!"
```

**STOP. Tunggu konfirmasi developer bahwa semua PNG sudah ada.**

---

### 1.2 — Format PNG Sprite yang Benar

**Format sprite animasi (15 state wajib):**
- `idle.png`, `walk.png`, `run.png`, `crouch.png`
- `attack1.png`, `attack2.png`, `attack3.png`
- `skill1.png`, `skill2.png`, `ultimate.png`
- `hurt.png`, `down.png`, `recover.png`
- `jump.png`, `doublejump.png`

**Spesifikasi canvas:**
- Semua sprite kecuali jump/doublejump: canvas **21:9**, 4 pose horizontal (contoh: 2016x864 px)
- `jump.png` dan `doublejump.png`: canvas **1:1**, hanya 1 pose (contoh: 864x864 px)
- Background flat MAGENTA `#FF00FF`

**Scale factor (pakai saat resize):**

| State | Scale |
|---|---|
| idle, walk, crouch | 0.25 |
| run, attack1, attack2, attack3, skill1, skill2, ultimate, hurt, down, recover | 0.28 |
| jump, doublejump | 0.12 |

---

### 1.3 — Resize & Proses Sprite

Lihat `Panduan_Sprite_Karakter_AI.md` untuk instruksi lengkap resize.
Setelah resize selesai:

```powershell
# Setelah sprite-gen selesai, copy manifest ke root:
$char = "[nama]"
$base = "c:\Users\ACER\Downloads\aether-clash-main\assets\$char"
Copy-Item "$base\run\manifest.js" "$base\manifest.js"
Write-Host "manifest.js sudah dikopi ke root folder."
```

**WAJIB DILAKUKAN SETELAH MANIFEST JADI:**
Buka file `assets/[nama]/manifest.js` yang baru saja dibuat, cari baris kode untuk `"crouch"`, lalu **ubah angka `"fps"`-nya menjadi `60`** (default generator biasanya terlalu kecil, misal 8 atau 10). 
Jika ini terlewat, animasi karakter menunduk (*crouch block*) akan super lambat dan tidak responsif.
Contoh yang benar:
```json
      "crouch": {
        "row": 5,
        "frames": 4,
        "fps": 60,
```

---

### 1.4 — Buat File `[nama].js`

Buat file `assets/[nama]/[nama].js` dengan isi berikut. **Ganti semua placeholder sebelum membuat file.**

```js
/* [NamaDisplay] — [JULUKAN] */
(() => {
  'use strict';
  const balance = {
    cooldowns: { skill1: 10, skill2: 20, ultimate: 30 },
    castTime: .5,
    basicRefund: .05
  };
  const names = ['SERANGAN 1', 'SERANGAN 2', 'SERANGAN 3', 'SKILL I', 'SKILL II', 'ULTIMATE'];
  const combo = [
    { damage: 8,  knockback: 80,  reach: 95,  duration: .38, hitAt: .5 },
    { damage: 10, knockback: 100, reach: 85,  duration: .44, hitAt: .5 },
    { damage: 15, knockback: 200, reach: 120, duration: .55, hitAt: .55 }
  ];

  function move(name, index = 1) {
    if (name === 'attack') return { name: `attack${index}`, type: 'attack', index, ...combo[index - 1] };
    
    // --- SKILL 1 ---
    // Pilih sesuai [TipeSkill1]:
    // A) PROYEKTIL: tembakan yang terbang ke depan
    // if (name === 'skill1') return { name, type: name, damage: 18, duration: .50, knockback: 80, projectile: true, speed: 900, hitAt: .5 };
    
    // B) DASH: karakter melesat maju menabrak musuh (Golden Standard Engine)
    if (name === 'skill1') return {
      name, type: name, damage: 18, duration: 0.82, knockback: 80,
      dash: 850,        // Kecepatan stabil anti-nembus (Sesuai Yanfah)
      dashFrame: 1,     // Index frame pose "sedang melesat" (0=frame1, 1=frame2, dst)
      reach: 190,       // Jangkauan deteksi kena musuh (px)
      hitAt: .60,       // Kapan hit & efek musuh muncul
      // frameTimes: [0.2, 0.4, 0.2, 0.2], // [Opsional] porsi waktu tiap frame (total harus = 1.0)
    };
    
    // C) AREA: diam di tempat, area serangan di depan
    // if (name === 'skill1') return { name, type: name, damage: 18, duration: .50, knockback: 80, reach: 150, area: true, hitAt: .5 };

    // --- SKILL 2 ---
    if (name === 'skill2') return { name, type: name, damage: 25, duration: .60, knockback: 280, reach: 180, area: true, hitAt: .7 };

    // --- ULTIMATE ---
    return { name: 'ultimate', type: '[nama]-ult', duration: balance.castTime, damage: 0, hitAt: .4 };
  }

  function start(a, name, index = 1) {
    if (a.action || a.state === 'hurt' || a.state === 'down' || a.state === 'recover') return false;
    if (name !== 'attack' && a.cooldowns[name] > 0) return false;
    if (name !== 'attack') a.cooldowns[name] = balance.cooldowns[name];
    a.action = { ...move(name, index), t: 0, fired: false, queued: 0 };
    a.state = a.action.name; a.stateTime = 0;

    // --- MUNCULKAN EFEK VISUAL SKILL DI SINI AGAR TIDAK TELAT ---
    if (name === 'skill1' && window.__game) {
      const cfg = window.[NamaClass]?.vfx?.skills?.skill1;
      if (cfg) {
        // Delay 0 = efek langsung muncul saat skill dipencet. 
        setTimeout(() => {
          window.__game.effects.push({ type: '[nama]-fx', asset: cfg.asset, x: a.x, y: a.y - 80, life: cfg.life || 0.5, maxLife: cfg.life || 0.5, size: cfg.size || 350, facing: a.facing, bindTo: a, offsetX: cfg.x || 0, offsetY: (cfg.y || 0) - 80 });
          if (cfg.dustAsset) window.__game.effects.push({ type: '[nama]-fx', asset: cfg.dustAsset, x: a.x + a.facing * (cfg.dustX || 0), y: window.__game.config.groundY + (cfg.dustY || 0), life: 0.25, maxLife: 0.25, facing: a.facing, size: cfg.dustSize || 250 });
        }, 0); 
      }
    }

    if ((name === 'skill1' || name === 'skill2') && window.[NamaClass].audio[name]) {
      try {
        const el = new Audio(window.[NamaClass].audio[name]);
        const masterMult = typeof window.AUDIO_CONFIG?.master === 'number' ? window.AUDIO_CONFIG.master : 1.0;
        const skillMult = typeof window.AUDIO_CONFIG?.skills?.[nama]?.[name] === 'number' ? window.AUDIO_CONFIG.skills.[nama][name] : 1.0;
        const sfxVol = Number(localStorage.getItem('aether.sfxVolume') || 90) / 100;
        el.volume = Math.max(0, Math.min(1, sfxVol * masterMult * skillMult));
        el.play().catch(() => {});
      } catch (_) {}
    }
    return true;
  }

  function refund(a) {
    for (const n of Object.keys(balance.cooldowns))
      a.cooldowns[n] = Math.max(0, a.cooldowns[n] - balance.cooldowns[n] * balance.basicRefund);
  }

  // ============================================================
  // VFX — SEMUA PENGATURAN VISUAL DIATUR DI SINI, BUKAN DI game.js
  // ============================================================
  const vfx = {
    // Pengaturan scale per-state jika sprite terasa terlalu kecil/besar
    // scaleOverrides: { run: 1.0, jump: 1.0, skill1: 1.0 },

    // Efek pukulan biasa (3 serangan combo)
    attacks: [
      { x: 100, y: -130, size: 80,  asset: '[nama]-slash' },
      { x: 110, y: -150, size: 80,  asset: '[nama]-slash', flipX: -1 },
      { x: 120, y: -100, size: 100, asset: '[nama]-slash', slamAsset: '[nama]-slam', slamSize: 180 }
    ],

    // Efek guard/block saat menangkis
    guard: { asset: '[nama]-guard', size: 150, x: 50, y: -70 },

    // Efek debu lompat (hasJumpSmoke: true = pakai efek global, false = pakai jumpDust di bawah)
    hasJumpSmoke: false,
    jumpDust: { asset: '[nama]-dust', size: 100, x: 0, y: 0 },

    // Konfigurasi efek skill
    skills: {
      // Skill 1 (contoh: DASH — efek menempel pada tubuh karakter)
      skill1: {
        asset: '[nama]-dash',     // Nama efek utama (misal: api/air melilit badan)
        size: 350,                // Ukuran efek (px)
        x: 0,                     // Geser kiri-kanan dari pusat karakter
        y: 0,                     // Geser atas-bawah dari pusat karakter
        dustAsset: '[nama]-dust', // Efek debu/cipratan saat tolakan kaki
        dustSize: 250,            // Ukuran efek debu
        dustX: -30,               // Posisi debu (x dari kaki karakter, negatif = ke belakang)
        dustY: -10,               // Posisi debu (y dari lantai)
        life: 0.25                // Lama efek hidup (detik). Sesuaikan agar mati tepat saat dash selesai
      },
      // Skill 2 (contoh: AREA GROUND — warning muncul dulu, lalu meledak)
      skill2: {
        asset: '[nama]-eruption',    // Efek ledakan utama
        size: 220,                   // Ukuran efek
        x: 40,                       // Geser dari posisi musuh
        y: -60,                      // Geser atas-bawah efek
        warningAsset: '[nama]-warning', // Efek peringatan
        warningSize: 280,
        warningX: 10,
        warningY: -20
      }
    }
  };

  // ============================================================
  // ULTIMATE
  // ============================================================
  const ultimate = {
    start(actor, ctx) {
      return {
        t: 0,
        owner: actor === ctx.hero ? 'player' : 'enemy',
        facing: actor.facing,
        casterX: actor.x,
        phase: 'cutin',
        hit: false
      };
    },
    update(dt, s, ctx) {
      s.t += dt;
      if (s.phase === 'cutin' && s.t > .9) s.phase = 'active';
      if (s.phase === 'active') {
        // Tambahkan logika ultimate di sini
        // Contoh efek:
        // ctx.effects.push({ type: '[nama]-fx', asset: '[nama]-ultaura', x: s.casterX, y: ctx.CONFIG.groundY - 120, life: 1.2, maxLife: 1.2, size: 400 });
        if (!s.hit) {
          // Lakukan damage
          s.hit = true;
        }
        if (s.t > 3.0) return null; // Selesai
      }
      return s;
    }
  };

  window.[NamaClass] = {
    names, balance, move, start, refund, vfx, ultimate,
    audio: {
      skill1:   null, // Isi path jika ada: 'assets/[nama]/audio/[nama]-skill1.mp3'
      skill2:   null, // Isi path jika ada: 'assets/[nama]/audio/[nama]-skill2.mp3'
      ultimate: 'assets/[nama]/audio/[nama]-ultimate.mp3',
      hit:      null
    }
  };
})();
```

> **PENTING — Blok `audio` di window.[NamaClass]:**
> Setiap karakter WAJIB punya blok `audio`. Ini cara engine membaca path suara tanpa hardcode di game.js.
> - `skill1`, `skill2`, `hit` bisa `null` dulu
> - `ultimate` wajib diisi path mp3
> - Jika developer sediakan sfx skill, isi pathnya di sini, tidak perlu sentuh game.js

### AI: Daftarkan ke `index.html` & `menu.js` (Layar Pemilihan Karakter)

**1. Daftarkan Script & Option di `index.html`:**
- Tambahkan `<option value="[nama]">[NAMA] - [Ras]</option>` di dalam `<select id="character-select">` (Cari teks 'Karakter pemain').
- Tambahkan script ini sebelum `</body>`:
```html
<script src="assets/[nama]/manifest.js?v=1"></script>
<script src="assets/[nama]/[nama].js?v=1"></script>
```

**2. Daftarkan UI di `menu.js`:**
Cari variabel `const fighters = { ... }` di dalam `menu.js`, lalu tambahkan karakter baru di dalamnya:
```javascript
...(window.[NamaClass] && window.[NAMA]_MANIFEST ? { 
  [nama]: { 
    name: '[NAMA]', 
    tag: 'THE [JULUKAN]', 
    race: '[RAS: MECHA / DEMI-HUMAN]', 
    portrait: 'assets/[nama]/ui/portrait.webp', 
    art: 'assets/menu/[nama]-select.webp', 
    detail: '[Deskripsi singkat karakter]', 
    basic: '[NAMA SERANGAN DASAR]', 
    ultimate: '[NAMA ULTIMATE]', 
    style: '[Deskripsi gaya main singkat]', 
    color: '#[KodeWarnaHex]' // <--- Warna aksen UI untuk karakter ini
  } 
} : {}),
```
*(Catatan: pastikan gambar `assets/menu/[nama]-select.webp` juga kamu persiapkan. Ini adalah art seluruh badan yang tampil di menu.)*

### AI: Daftarkan ke `core/game.js` — 7 Entry Wajib

**Entry 1 — Variabel Kit (baris ~22, di akhir deret `const images = {}, F = ...`):**
```js
, [AB] = window.[NamaClass] && window.[NAMA]_MANIFEST ? window.[NamaClass] : null
```

**Entry 2 — KITS Pool (baris ~24, di akhir `const KITS = { ... }`):**
```js
...[AB] ? { [nama]: [AB] } : {})
```

**Entry 3 - VOICE_NAMES dan Array characters (baris ~144):**
```js
// Tambahkan nama karakter di dalam object VOICE_NAMES:
[nama]: '[NamaDisplay]',

// TEPAT DI BAWAHNYA, tambahkan ini di dalam deklarasi array `const characters = [...]`:
...(window.[NamaClass] ? [['[nama]', window.[NamaClass]?.audio?.ultimate || 'assets/[nama]/audio/[nama]-ultimate.mp3']] : [])
```

**Entry 4 — CHARACTER_ASSETS (baris ~2759):**
```js
[nama]: {
  sprite: ['[nama]', 'assets/[nama]/run/sprite-sheet-alpha.webp'],
  fx: {
    prefix: 'fx-[nama]-',
    dir: 'assets/[nama]/ui/fx-',
    names: ['slash', 'hit', 'projectile', 'explosion', 'warning', 'eruption', 'ultaura', 'ultenv', 'guard', 'dust']
    // WAJIB: names[] harus cocok persis dengan file fx-[nama]-*.webp yang ada di ui/
    // Hapus nama yang tidak punya file, tambah nama sesuai file yang ada
  }
},
```

**Entry 5 — startSummon (baris ~798):**
```js
// Cari: else if (id === 'valkren') startValkrenUlt(actor); else startRocketParade(actor);
// Tambah kondisi baru:
else if (id === '[nama]') start[Nama]Ult(actor); else startRocketParade(actor);
```

**Entry 6 — syncPlayerForm (baris ~1445):**
```js
else if (selectedCharacter === '[nama]') {
  manifest = window.[NAMA]_MANIFEST;
  metrics = window.[NAMA]_METRICS || window.[NAMA]_MANIFEST;
  images.hero = images.[nama];
  Object.assign(cooldownMax, [AB] ? [AB].balance.cooldowns : { skill1: 10, skill2: 20, ultimate: 30 });
}
```

**Entry 7 — syncOpponentForm (cari fungsi serupa untuk dummy):**
```js
else if (opponentCharacter === '[nama]') {
  opponentManifest = window.[NAMA]_MANIFEST;
  opponentMetrics = window.[NAMA]_METRICS || window.[NAMA]_MANIFEST;
  images.dummy = images.[nama];
}
```


**Entry 8 — Logika UI Cut-in (baris ~2690 - 2703):**
Ada beberapa tempat yang harus ditambah `[nama]`:
- `voiceKind === '[nama]'`
- `cutin.classList.toggle('[nama]-cutin', cutinKey === '[nama]');`
- Tambahkan `cutinKey === '[nama]'` di dalam operator ternary untuk `cutinOwner`.
- Tambahkan ke dalam objek teks kicker, strong, dan detail.
- Tambahkan ke dalam `CUTIN_ART`.

**Entry 9 — Info Deck Character (baris ~2621):**
```js
if (id === '[nama]') return { name: '[NAMA]', cls: '[RAS]', deck: '[NAMA]', title: 'THE [JULUKAN]', portrait: 'assets/[nama]/ui/portrait.webp', names: window.[NamaClass]?.names || [], icons: ['attack', 'skill1', 'skill2', 'ultimate'].map(s => 'assets/[nama]/ui/icon-' + s + '.webp') };
```

### AI: Buat Fungsi Logika (Strike & Ultimate) di `core/game.js`

Pertama, buat fungsi **Strike** untuk membaca VFX serangan & skill. Tambah di dekat `dhylaStrike` atau `valkrenStrike`:

```js
function [nama]Strike(actor, move) {
  if (!move) return;
  const enemy = actor === dummy, target = enemy ? hero : dummy, em = window.[NAMA]_METRICS?.emitters?.[move.name];
  const ox = actor.x + actor.facing * (em?.x ?? 50), oy = actor.y + (em?.y ?? -80), hy = clamp(oy, actor.y - 170, actor.y - 30);
  const cfg1 = window.[NamaClass]?.vfx?.skills?.skill1;
  const cfg2 = window.[NamaClass]?.vfx?.skills?.skill2;

  if (move.type === 'skill1') {
    const cfg = cfg1 || { asset: '[nama]-projectile', size: 350, x: 0, y: 0 };
    const reach = move.reach || 190;
    
    // PERHATIAN: Efek visual animasi JANGAN di-push di sini karena akan telat (baru jalan pas hitAt)!
    // Push efek visual di fungsi start() di file [nama].js pakai setTimeout.

    const dx = (target.x - actor.x) * actor.facing;
    const near = dx > (tB(target) - 2) && dx < reach + tW(target);
    
    if (!near || Math.abs(target.y - actor.y) >= 180) { return; }
    
    const connected = enemy ? window.__game.receiveHit(move.damage, { spawnImpact: true }) : hitDummy(move.damage, move.knockback, '#[KodeWarnaHex]', actor.x, target.y - 60, false, true, 1, 0, false, 'hit');
    if (connected && connected !== 'blocked' && !target.isBlocking) sound('hit');
    return;
  }
  
  if (move.type === 'skill2') {
    const cfg = cfg2 || { asset: '[nama]-eruption', size: 220, x: 40, y: -60, warningAsset: '[nama]-warning', warningSize: 280, warningX: 10, warningY: -20 };
    const reach = move.reach || 190;
    
    // Efek warning
    if (cfg.warningAsset) {
       effects.push({ type: '[nama]-fx', asset: cfg.warningAsset, x: ox + actor.facing * (cfg.warningX || 0), y: CONFIG.groundY + (cfg.warningY || 0), life: .4, maxLife: .4, size: cfg.warningSize || 280, behind: true });
    }
    
    const dx = (target.x - ox) * actor.facing;
    if (dx > -50 && dx < reach + 50 && Math.abs(target.y - CONFIG.groundY) < 120) {
      const life = cfg.life || 0.6;
      effects.push({ type: '[nama]-fx', asset: cfg.asset, x: target.x + actor.facing * (cfg.x || 0), y: CONFIG.groundY + (cfg.y || 0), life: life, maxLife: life, size: cfg.size || 220 });
      if (enemy) window.__game.receiveHit(move.damage); else hitDummy(move.damage, move.knockback, '#[KodeWarnaHex]', actor.x, target.y + (cfg.y || -60), false, true, 1, 0, false, 'hit');
    }
    return;
  }
  
  if (move.type === 'attack') {
    const vfx = window.[NamaClass]?.vfx?.attacks?.[move.index - 1];
    if (vfx) {
      if (vfx.asset) {
        const vx = actor.x + actor.facing * (vfx.x ?? em?.x ?? 50);
        const vy = actor.y + (vfx.y ?? em?.y ?? -100);
        effects.push({ type: '[nama]-fx', asset: vfx.asset, x: vx, y: vy, facing: actor.facing * (vfx.flipX || 1), rotation: vfx.rotation ? (vfx.rotation * Math.PI / 180) : 0, life: .3, maxLife: .3, size: vfx.size || 100 });
      }
      if (vfx.slamAsset) {
        const sx = ox + actor.facing * (vfx.slamX || 0);
        const sy = (CONFIG.groundY - 30) + (vfx.slamY || 0);
        effects.push({ type: '[nama]-fx', asset: vfx.slamAsset, x: sx, y: sy, facing: actor.facing, life: .4, maxLife: .4, size: vfx.slamSize || 280 });
      }
    }
  }

  const dx = (target.x - actor.x) * actor.facing;
  if (dx <= tB(target) || dx >= move.reach + tW(target) || Math.abs(target.y - actor.y) > 115) { sound('whoosh'); return; }

  const connected = enemy ? window.__game.receiveHit(move.damage) : hitDummy(move.damage, move.knockback, '#ffffff', actor.x, hy, false, true);
  if (connected && move.type === 'attack') {
    effects.push({ type: '[nama]-fx', asset: '[nama]-hit', x: target.x - actor.facing * 10, y: hy, facing: actor.facing, life: .3, maxLife: .3, size: 150 });
    if (enemy) window.[NamaClass].refund(dummy);
    else for (const name of Object.keys(cooldownMax)) { if (hero.cooldowns[name] > 0) rechargePulse[name] = .22; hero.cooldowns[name] = Math.max(0, hero.cooldowns[name] - cooldownMax[name] * BALANCE.basicCooldownRefund); }
  }
  if (connected && connected !== 'blocked' && !target.isBlocking) sound(move.index === 3 ? 'heavy' : 'hit');
}
```

Kedua, daftarkan `[nama]Strike` ke dalam 3 tempat di `game.js`:
1. Blok Basic Attack Hero (cari `selectedCharacter === 'valkren'`):
   `if (selectedCharacter === '[nama]') { const _cls = window.[NamaClass]; if (_cls) [nama]Strike(hero, _cls.move('attack', index)); return; }`
2. Blok Skill Hero (cari `function fireSkill`):
   `if (selectedCharacter === '[nama]') { [nama]Strike(hero, action); return; }`
3. Blok AI Musuh (cari `opponentCharacter === 'valkren'`):
   `if (opponentCharacter === '[nama]') { [nama]Strike(dummy, a); return; }`

Ketiga, tambahkan fungsi Ultimate di dekat `updateValkrenUlt`:

```js
function start[Nama]Ult(actor) {
  const ctx = makeUltContext();
  const group = window.[NamaClass]?.ultimate?.start
    ? window.[NamaClass].ultimate.start(actor, ctx)
    : { t: 0, owner: actor === hero ? 'player' : 'enemy', facing: actor.facing, casterX: actor.x, phase: 'cutin', hit: false };
  group._charId = '[nama]';
  if (actor === hero) activeUlt.player = group;
  else activeUlt.enemy = group;
  cinematic = .9; announceTimer = 0;
  startUltimateVoice('[nama]', actor);
}

function update[Nama]Ult(dt, s) {
  if (!s) return;
  const ctx = makeUltContext();
  const next = window.[NamaClass]?.ultimate?.update
    ? window.[NamaClass].ultimate.update(dt, s, ctx)
    : null;
  if (!next) {
    if (s === activeUlt.enemy) activeUlt.enemy = null;
    else if (s === activeUlt.player) activeUlt.player = null;
  }
}
```

### AI: Daftarkan ke Game Loop (~baris 1078)

```js
// Tambah di bawah baris updateValkrenUlt yang sudah ada:
update[Nama]Ult(dt, activeUlt.player?._charId === '[nama]' ? activeUlt.player : null);
update[Nama]Ult(dt, activeUlt.enemy?._charId === '[nama]' ? activeUlt.enemy : null);
```

### Checklist Tahap 1

- [ ] 15 PNG ada di `run/raw-original/`
- [ ] Gambar di-resize dengan scale factor benar
- [ ] `run/sprite-sheet-alpha.webp` sudah dibuat
- [ ] `run/manifest.js` sudah ada
- [ ] `manifest.js` dikopi ke root folder `assets/[nama]/`
- [ ] `[nama].js` dibuat dengan `window.[NamaClass]` + blok `audio`
- [ ] `index.html`: `<option>` + 2 `<script>` tag
- [ ] `game.js` Entry 1: variabel `[AB]` (baris ~22)
- [ ] `game.js` Entry 2: `KITS` (baris ~24)
- [ ] `game.js` Entry 3 - VOICE_NAMES dan Array characters:
- [ ] `game.js` Entry 4: `CHARACTER_ASSETS` (baris ~2759)
- [ ] `game.js` Entry 5: `startSummon` (baris ~798)
- [ ] `game.js` Entry 6: `syncPlayerForm` (~baris 1445)
- [ ] `game.js` Entry 7: `syncOpponentForm`
- [ ] `game.js`: Fungsi `start[Nama]Ult` + `update[Nama]Ult` dibuat
- [ ] `game.js`: Game loop memanggil `update[Nama]Ult` (2 baris)
- [ ] Cache version di-bump di `index.html`
- [ ] Hard refresh browser (Ctrl+Shift+R)

---

## TAHAP 2 — Efek Visual / FX

**Hasil akhir tahap ini:** Efek visual muncul saat basic attack, skill, dan ultimate.

### STOP & TANYA — Sebelum mulai Tahap 2

Tanyakan ini ke developer:

```
1. "Apakah karakter ini punya efek visual custom untuk serangan/skill, atau tidak perlu?"
2. "Jika ya, silakan taruh file PNG efek (seperti slash, projectile, explosion, dll) di assets/[nama]/ui/raw-original-skill/"
3. "Kabari saya jika file PNG efek sudah siap di folder tersebut, atau jika ingin skip tahap ini."
```

**STOP. Tunggu konfirmasi developer.** Jika developer skip atau file sudah siap, baru lanjut.

---

### 2.1 — Konversi FX (Jika ada file)

Jika developer menyediakan file FX di folder `ui/raw-original-skill/`, jalankan script ini:

```powershell
$char = "[nama]"
$rawSkill = "c:\Users\ACER\Downloads\aether-clash-main\assets\$char\ui\raw-original-skill"

python -c "
from PIL import Image
import pathlib
import numpy as np

raw = pathlib.Path(r'$rawSkill')
out = raw.parent

# Mapping file sesuai yang umum dipakai, tambahkan jika ada nama baru
mapping = {
    'slash.png': 'fx-slash.webp',
    'hit.png': 'fx-hit.webp',
    'projectile.png': 'fx-projectile.webp',
    'explosion.png': 'fx-explosion.webp',
    'warning.png': 'fx-warning.webp',
    'eruption.png': 'fx-eruption.webp',
    'ultaura.png': 'fx-ultaura.webp',
    'ultenv.png': 'fx-ultenv.webp',
    'guard.png': 'fx-guard.webp',
    'dust.png': 'fx-dust.webp',
    'dash.png': 'fx-dash.webp',
    'slam.png': 'fx-slam.webp'
}
for src, dst in mapping.items():
    p = raw / src
    if p.exists():
        try:
            img = Image.open(p).convert('RGBA')
            r, g, b, a = img.split()
            # Transparan otomatis (hapus background hitam)
            arr_r, arr_g, arr_b = np.array(r), np.array(g), np.array(b)
            arr_a = np.maximum(np.maximum(arr_r, arr_g), arr_b)
            img.putalpha(Image.fromarray(arr_a))
            img.save(out / dst, 'webp', quality=90)
            print(f'OK: {src} -> {dst}')
        except Exception as e:
            print(f'ERROR {src}: {e}')
    else:
        print(f'SKIP: {src}')
"
```

### 2.2 — Update Game Engine

Setelah konversi selesai:
1. Cek folder `assets/[nama]/ui/`. Catat file `fx-[nama]-...` apa saja yang berhasil dibuat.
2. Buka `core/game.js`, cari `[nama]` di `CHARACTER_ASSETS`.
3. Update array `names: []` agar HANYA berisi efek yang benar-benar ada file `.webp`-nya.

Contoh jika yang berhasil dikonversi hanya slash, hit, dash, projectile:
```js
[nama]: {
  sprite: ['[nama]', 'assets/[nama]/run/sprite-sheet-alpha.webp'],
  fx: {
    prefix: 'fx-[nama]-',
    dir: 'assets/[nama]/ui/fx-',
    names: ['slash', 'hit', 'dash', 'projectile'] // <- WAJIB SINKRON DENGAN FILE YANG ADA
  }
}
```

### Checklist Tahap 2

- [ ] File `fx-*.webp` berhasil digenerate di `ui/` (jika ada)
- [ ] `CHARACTER_ASSETS.names[]` di game.js disinkronkan dengan file webp yang ada
- [ ] Blok `vfx` di `[nama].js` sudah disesuaikan namanya (misal `asset: '[nama]-slash'`)
- [ ] Cache di-bump + hard refresh browser

---

## Sistem VFX — Cara Atur Posisi, Ukuran & Rotasi Efek

> **ATURAN WAJIB:** Semua pengaturan posisi, ukuran, rotasi, dan jenis efek visual
> karakter **harus didefinisikan di dalam blok `vfx` di file `[nama].js`** masing-masing.
> JANGAN hardcode langsung ke `core/game.js`. Ini menjaga engine tetap bersih dan
> setiap karakter mudah diatur secara mandiri.

### Cara Kerja Sistem

`game.js` hanya berperan sebagai *pembaca* dan *runner*:
1. `game.js` panggil `yanfahStrike()` (atau fungsi strike karakter kamu)
2. Fungsi itu baca blok `vfx` dari `window.[NamaClass].vfx`
3. Render efek sesuai konfigurasi yang ada di sana

Kamu **tidak perlu menyentuh `game.js`** untuk mengatur visual efek selama
konfigurasi `vfx` sudah lengkap.

### Tabel Properti VFX

| Properti | Tipe | Keterangan |
|---|---|---|
| `asset` | string | Key gambar. Format: `'[nama]-namaefek'`. Cocokkan dengan nama file `fx-[nama]-namaefek.webp` |
| `size` | number | Ukuran efek dalam piksel. Makin besar, makin besar gambarnya |
| `x` | number | Geser kanan-kiri dari posisi karakter (mengikuti arah hadap) |
| `y` | number | Geser atas-bawah. **Negatif = naik ke atas**, positif = turun ke bawah |
| `flipX` | number | `1` = normal, `-1` = balik gambar secara horizontal |
| `rotation` | number | Rotasi dalam **derajat**. `90` = putar searah jarum jam 90° |
| `slamAsset` | string | Key gambar efek tanah (slam). Muncul dari lantai |
| `slamSize` | number | Ukuran efek slam |
| `slamX` | number | Geser kanan-kiri slam dari posisi karakter |
| `slamY` | number | Geser atas-bawah slam dari garis tanah. Negatif = lebih tinggi dari tanah |

### Mengatur Ukuran Animasi (scaleOverrides)
Jika ukuran sprite karakter saat `run`, `jump`, atau state lain terasa terlalu kecil/besar, **jangan ubah `game.js`**. Tambahkan objek `scaleOverrides` di dalam `vfx`:

```js
const vfx = {
  scaleOverrides: {
    run: 1.2,        // Lari 20% lebih besar
    jump: 0.8,       // Lompat 20% lebih kecil
    doublejump: 0.8,
    attack1: 1.05
  },
  attacks: [ ... ],
};
```
Angka `1.0` adalah ukuran normal (sesuai `metrics.scale` di `manifest.js`).

### Contoh: Konfigurasi Lengkap

```js
const vfx = {
  attacks: [
    // Pukulan 1: slash sedang, agak ke kanan dan atas
    { x: 100, y: -130, size: 80, asset: '[nama]-slash', flipX: -1 },

    // Pukulan 2: slash lebih tinggi, rotasi miring 45 derajat
    { x: 110, y: -150, size: 80, asset: '[nama]-slash', flipX: -1, rotation: -45 },

    // Pukulan 3: tidak ada efek pukulan, hanya ledakan dari tanah
    { slamAsset: '[nama]-slam', slamSize: 170, slamX: 5, slamY: -40 },

    // Alternatif pukulan 3: ada efek pukulan DAN ledakan tanah sekaligus
    // { x: 120, y: -100, size: 100, asset: '[nama]-slash', slamAsset: '[nama]-slam', slamSize: 170 },
  ],

  // Efek guard saat menangkis (posisi di depan badan karakter)
  guard: { asset: '[nama]-guard', size: 150, x: 50, y: -70 },

  // false = karakter punya efek lompat custom sendiri (isi jumpDust di bawah)
  hasJumpSmoke: false,

  // Efek debu lompat custom (hanya aktif jika hasJumpSmoke: false)
  jumpDust: { asset: '[nama]-jumpdust', size: 100, x: 0, y: 0 },
};
```

### Cara Cepat Eksperimen Posisi

Tidak ada cara instan selain trial & error. Tapi gunakan acuan ini:

- **Efek terlalu rendah?** Kurangi angka `y` (misal dari `-100` ke `-150`)
- **Efek terlalu jauh ke depan?** Kurangi `x`
- **Efek terbalik?** Ubah `flipX: 1` jadi `-1` atau sebaliknya
- **Efek miring?** Tambah atau kurangi angka `rotation` (dalam derajat)
- **Slam mengambang di udara?** Kurangi angka `slamY` (dekati 0)



## TAHAP 3 — UI Karakter

**Hasil akhir tahap ini:** Portrait di HUD, ikon skill, dan cut-in ultimate sudah menggunakan aset asli karakter.

### STOP & TANYA — Sebelum mulai Tahap 3

Tanyakan ini ke developer:

```
1. "Siapkan file PNG berikut dan taruh di folder assets/[nama]/ui/raw-original-ui/ :"
   - portrait.png (384x384px, close-up wajah menghadap KANAN)
   - cutin.png (landscape ~1920x400px, pose dramatis)
   - icon-attack.png, icon-skill1.png, icon-skill2.png, icon-ultimate.png (128x128px)
2. "Kabari saya jika semua file sudah ditaruh di folder."
```

**STOP. Tunggu konfirmasi developer bahwa file sudah ada.**

---

### 3.1 — Buat Folder & Copy Placeholder Sementara

Sebelum memproses gambar asli, copy placeholder dari karakter lain (`dhyla`) agar game tidak error selagi diproses:

```powershell
$char = "[nama]"
$base = "c:\Users\ACER\Downloads\aether-clash-main\assets\$char"
$ref  = "c:\Users\ACER\Downloads\aether-clash-main\assets\dhyla"

New-Item -ItemType Directory -Force -Path "$base\ui\raw-original-ui"

# Copy placeholder
Copy-Item "$ref\ui\portrait.webp"      "$base\ui\portrait.webp"      -Force
Copy-Item "$ref\ui\cutin.webp"         "$base\ui\cutin.webp"         -Force
Copy-Item "$ref\ui\icon-attack.webp"   "$base\ui\icon-attack.webp"   -Force
Copy-Item "$ref\ui\icon-skill1.webp"   "$base\ui\icon-skill1.webp"   -Force
Copy-Item "$ref\ui\icon-skill2.webp"   "$base\ui\icon-skill2.webp"   -Force
Copy-Item "$ref\ui\icon-ultimate.webp" "$base\ui\icon-ultimate.webp" -Force

Write-Host "Placeholder dikopi! Folder raw-original-ui siap."
```

### 3.2 — Konversi UI Asli

Jika developer sudah meletakkan gambar aslinya, jalankan konversi:

```powershell
$char = "[nama]"
$rawUi = "c:\Users\ACER\Downloads\aether-clash-main\assets\$char\ui\raw-original-ui"

python -c "
from PIL import Image
import pathlib

raw = pathlib.Path(r'$rawUi')
out = raw.parent

mapping = {
    'portrait.png':       ('portrait.webp',       (384, 384)),
    'cutin.png':          ('cutin.webp',           None),
    'icon-attack.png':    ('icon-attack.webp',     (128, 128)),
    'icon-skill1.png':    ('icon-skill1.webp',     (128, 128)),
    'icon-skill2.png':    ('icon-skill2.webp',     (128, 128)),
    'icon-ultimate.png':  ('icon-ultimate.webp',   (128, 128)),
}
for src, (dst, size) in mapping.items():
    p = raw / src
    if p.exists():
        img = Image.open(p).convert('RGBA')
        if size: img = img.resize(size, Image.LANCZOS)
        img.save(out / dst, 'webp', quality=92)
        print(f'OK: {src} -> {dst}')
    else:
        print(f'SKIP: {src}')
"
```

### Checklist Tahap 3

- [ ] PNG UI (portrait, cutin, icon) ada di `ui/raw-original-ui/`
- [ ] Script konversi sukses membuat `portrait.webp`, `cutin.webp`, 4 `icon-*.webp` di `ui/`
- [ ] Cache di-bump + hard refresh browser
- [ ] Tanyakan ke developer apakah gambar UI sudah terlihat bagus di game

---

## TAHAP 4 — Audio

**Hasil akhir tahap ini:** Suara ultimate, menang, dan select (dan opsional sfx skill) aktif.

### STOP & TANYA — Sebelum mulai Tahap 4

Tanyakan ini ke developer:

```
1. "Silakan siapkan file MP3 (44.1kHz, 128kbps) dan taruh di folder assets/[nama]/audio/ :"
   - [nama]-ultimate.mp3 (suara ulti, 2-4 detik)
   - [nama]-wins.mp3 (suara menang, 2-3 detik)
   - select-[nama].mp3 (suara saat dipilih, 1-2 detik)
   OPSIONAL:
   - [nama]-skill1.mp3 (sfx skill 1)
   - [nama]-skill2.mp3 (sfx skill 2)
2. "Kabari saya jika semua file MP3 sudah siap di folder tersebut."
```

**STOP. Tunggu konfirmasi developer.**

---

### 4.1 — Buat Folder

```powershell
$char = "[nama]"
$base = "c:\Users\ACER\Downloads\aether-clash-main\assets\$char"
New-Item -ItemType Directory -Force -Path "$base\audio"
Write-Host "Folder audio disiapkan."
```

### 4.2 — Daftarkan Audio

Audio ultimate sudah otomatis terdaftar lewat blok `audio` di `[nama].js`.
Jika developer juga menyediakan sfx skill, update blok `audio` di `[nama].js`:

```js
// Update blok audio di window.[NamaClass]:
audio: {
  skill1:   'assets/[nama]/audio/[nama]-skill1.mp3',  // isi jika file ada
  skill2:   'assets/[nama]/audio/[nama]-skill2.mp3',  // isi jika file ada
  ultimate: 'assets/[nama]/audio/[nama]-ultimate.mp3',
  hit:      null
},
```

Tidak perlu menyentuh `game.js` sama sekali untuk audio. Engine membaca otomatis dari blok `audio` ini.

### 4.3 — Daftar Pengaturan Volume Skill di `core/audio-config.js`

Jika karakter menggunakan SFX untuk skill 1 dan skill 2, AI **wajib** mendaftarkannya di `core/audio-config.js` agar volumenya bisa diatur secara spesifik:

```js
// Cari bagian:
  skills: {
// Tambahkan karakter baru ke dalamnya:
    [nama]: {
      skill1: 1.0,
      skill2: 1.0
    },
```

### Checklist Tahap 4

- [ ] 3 file MP3 wajib ada di `audio/` dengan nama yang benar
- [ ] Blok `audio` di `[nama].js` sudah diisi path yang benar
- [ ] Jika ada sfx skill, path sudah diupdate di blok `audio`
- [ ] Logika `new Audio` di dalam `function start()` sudah diterapkan (biasanya dari template Tahap 1)
- [ ] Volume skill terdaftar di `core/audio-config.js`
- [ ] Cache di-bump + hard refresh

---

## TAHAP 5 — Balancing & Config

**Hasil akhir tahap ini:** Karakter memiliki stat pergerakan dan *damage* yang terhubung langsung ke sistem keseimbangan (`core/balance.js`) sehingga tidak lagi bergantung pada *hardcode*.

### 5.1 — Tentukan Tipe Karakter

Pilih satu tipe (archetype) yang paling cocok berdasarkan desain visual dan senjatanya:

1. **Heavy (Berat):** Senjata besar, jalan lambat, serangan sakit.
2. **Agile (Cepat):** Senjata kecil/tangan kosong, jalan cepat, *attack speed* tinggi, *damage* kecil tapi banyak hit.
3. **All-rounder (Seimbang):** Kecepatan dan serangan yang standar/rata.

### 5.2 — Daftarkan di `core/balance.js`

Buka file `core/balance.js` dan tambahkan karakter baru ke dalam kategori yang tepat (`window.GAME_BALANCE`):

```js
    [nama]: { // Penjelasan singkat gaya bertarungnya
        movement: { walkSpeed: 360, runSpeed: 580, attackSpeed: 0.85 }, // attackSpeed < 1.0 berarti lebih cepat
        combo: [6, 8, 10], // Sesuaikan dengan batas tipe
        skill1: { damage: 15, cooldown: 10 },
        skill2: { damage: 19, cooldown: 20 },
        ultimate: { damage: 40, cooldown: 30 }
    }
```

*Catatan: Wajib patuhi batas damage untuk tipe karakter tersebut yang ada di bagian atas `balance.js`!*

### 5.3 — Hubungkan `[nama].js` ke `GAME_BALANCE`

Di file logika karakter (`assets/[nama]/[nama].js`), hapus angka statis dan arahkan *getter* ke `GAME_BALANCE`:

```js
  const getBal = () => window.GAME_BALANCE?.[nama];
  const atkSpd = () => getBal()?.movement?.attackSpeed ?? 1.0;

  const balance = {
    get cooldowns() {
      return {
        skill1: getBal()?.skill1?.cooldown ?? 10,
        skill2: getBal()?.skill2?.cooldown ?? 20,
        ultimate: getBal()?.ultimate?.cooldown ?? 30
      };
    },
    // ...
```
Terapkan *getter* yang sama untuk properti `combo[0]`, `combo[1]`, `combo[2]`, dan properti `damage` di fungsi `move('skill1')`, `move('skill2')`, serta damage ultimate di saat `hitDummy`/`receiveHit`.

### Checklist Tahap 5

- [ ] Karakter didaftarkan di `core/balance.js` dengan angka yang sesuai panduan tipenya.
- [ ] Logic di `assets/[nama]/[nama].js` di-update untuk mengambil (`get`) konfigurasi dari `GAME_BALANCE`.
- [ ] Bump cache `core/balance.js` dan `[nama].js` di `index.html`.

---

## Catatan Masalah Umum

### 1. Game Crash Saat Pilih Karakter
Fungsi `update[Nama]Ult` tidak ada atau tidak terdaftar di game loop.
Solusi: Pastikan 7 Entry di game.js semua ada, dan kedua fungsi ult sudah dibuat.

### 2. Karakter Tidak Berubah
Cache lama. Bump version di index.html, lalu Ctrl+Shift+R.

### 3. Sprite Kosong
`syncPlayerForm`/`syncOpponentForm` belum punya kondisi untuk karakter baru.

### 4. Sprite Terpotong / Terlalu Besar
Gambar tidak di-resize dengan scale factor yang benar sebelum sprite-gen.

### 5. Error "window.NAMA_MANIFEST is not defined"
`manifest.js` belum dikopi ke root folder atau belum ada di index.html.

### 6. FX Tidak Tampil
Nama di `CHARACTER_ASSETS.names[]` tidak cocok dengan nama file `fx-[nama]-*.webp`.
Cek: jika file adalah `fx-dhyla-dust.webp`, entry-nya harus `'dust'`, bukan `'fx-dust'`.

### 7. Portrait / Ikon Tidak Tampil
File belum ada. Copy placeholder Dhyla dulu, ganti setelah aset asli siap.

### 8. Suara Ultimate Tidak Keluar
Path di blok `audio` di `[nama].js` salah atau file mp3 tidak ada.

### 9. Suara Skill Double / Keluar Sebelum Kena Musuh
Ada pemanggilan `sound()` di fungsi cast/start, bukan di dalam blok hit.
Suara HANYA boleh dipanggil di `if (connected && connected !== 'blocked' && ...)`.

---

## Sistem Bot AI — Cara Kerja Otomatis

### Yang SUDAH otomatis:

| Kemampuan AI | Cara Kerja |
|---|---|
| Combo attack 1-2-3 | Baca dari `KITS[karakter].move('attack', index)` |
| Pakai Skill 1 & Skill 2 | Baca dari `KITS[karakter].move('skill1/2')` |
| Defend serangan biasa | Deteksi `hero.action` generik |
| Defend saat musuh Ultimate | Baca `activeUlt.player` — otomatis sejak sistem pool |
| Cutin ultimate tampil | Baca `summon._charId` — otomatis sejak sistem pool |
| Scaling 4 level kesulitan | Diatur di `core/match.js` — universal |
| Memuat suara ultimate | Baca `window.[NamaClass].audio.ultimate` — otomatis |

### Yang masih perlu dilakukan:

1. Daftar ke `KITS` (1 baris) → AI bisa mainkan karakter
2. Buat `start[Nama]Ult()` + `update[Nama]Ult()` → AI defend otomatis
3. Daftar ke `startSummon()` → engine bisa trigger ult
4. Tulis blok `audio` di `[nama].js` → suara otomatis terdaftar

> **🚨 WARNING: KESALAHAN FATAL ULTIMATE (WAJIB DIBACA A.I)**
> 
> Jika kamu sedang mengimplementasikan fungsi Ultimate di `core/game.js` dan `[nama].js`, **perhatikan 3 hal ini agar game tidak nge-bug/crash**:
> 1. **Bug Scope (Silent Crash):** Di file `core/game.js`, saat kamu membuat fungsi `start[Nama]Ult(actor)` dan `update[Nama]Ult(dt, s)`, pastikan kamu menaruh fungsi tersebut **DI DALAM BLOK IIFE** (sebelum penutup `})();` di bagian bawah file). Jangan menaruh fungsi tersebut di luar brankas IIFE, karena jika ditaruh di luar, `game.js` tidak bisa menemukannya dan tombol P akan mati!
> 2. **Bug Cutin Berubah Jadi Arco:** Di file `[nama].js`, baris `const isVoicePlaying = context.isVoicePlaying('...', s.owner);` **WAJIB MENGGUNAKAN ID KARAKTER (HURUF KECIL)** (contoh: `'ramuru'`, `'dhyla'`, `'valkren'`). Jika kamu salah ketik (misalnya *copy-paste* dari `valkren.js` lalu lupa diubah jadi `'ramuru'`), game akan gagal mempause durasi cutin. Akibatnya, di tengah-tengah animasi, cutin tiba-tiba akan tertimpa / berubah menjadi cutin ARCO!
> 3. **Bug Kebal (IMMUNE):** Di file `[nama].js`, saat memberikan damage Ultimate di fase ledakan/pukulan akhir, kamu **WAJIB menyisipkan `target.invuln = 0;`** tepat di atas baris `if (s.owner === 'enemy') context.receiveHit... else context.hitDummy...`. Jika tidak, Ultimate akan selalu gagal memberikan damage dan muncul teks "IMMUNE".

---

## Referensi Singkatan

| Variabel | Penjelasan | Contoh (Dhyla) |
|---|---|---|
| `[nama]` | Nama karakter huruf kecil | `dhyla` |
| `[NAMA]` | Nama karakter HURUF BESAR | `DHYLA` |
| `[NamaClass]` | Nama object window.X | `Dhyla` |
| `[AB]` | Singkatan 2 huruf untuk variabel kit | `DH` |
| `[NamaDisplay]` | Nama yang ditampilkan di game | `'Dhyla'` |

---

*Panduan direvisi Oktober 2026 — berdasarkan audit nyata kode Dhyla, Valkren, dan sistem audio universal.*
*Mencakup: sistem audio universal (blok `audio` di file karakter), syncPlayerForm/syncOpponentForm, CHARACTER_ASSETS.*
