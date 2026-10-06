# Panduan Lengkap: Membuat Karakter di Ragnarok Trinity

---

## INSTRUKSI UNTUK AI — BACA INI DULU SEBELUM MULAI

> Jika kamu adalah AI yang menerima file panduan ini dari developer, **wajib ikuti alur di bawah ini** sebelum melakukan apapun.

### Alur Wajib saat Developer Menyerahkan Panduan Ini:

**LANGKAH 0 — Validasi Awal (Tanya Developer)**

Tanyakan pertanyaan berikut satu per satu:

1. "Kamu mau buat karakter baru ya? Siapa nama karakternya? (contoh: dhyla, valkren, rael)"
2. "Kamu sekarang sudah di tahap mana?"
   - Tahap 1 — Baru mau mulai, belum ada sprite sama sekali
   - Tahap 2 — Sprite sudah selesai, mau tambah efek visual (FX)
   - Tahap 3 — FX sudah ada, mau buat UI (portrait, ikon, cutin)
   - Tahap 4 — UI sudah ada, mau tambah audio/suara
   - Semua asset sudah siap, tinggal integrasi ke game
3. "Kamu sudah punya folder karakter di `assets/[nama]/` atau belum?"

**Berdasarkan jawaban developer, AI harus:**
- Buatkan folder lengkap sesuai tahap (lihat perintah di tiap tahap)
- Kasih tahu developer: *"Silakan taruh file PNG kamu di folder raw-source berikut..."*
- **Tunggu konfirmasi developer** sebelum mulai proses apapun
- Setelah developer konfirmasi file sudah ada, AI mulai proses
- Jangan langsung lompat ke integrasi engine sebelum semua aset diproses

---

## Konsep Pipeline Asset

```
USER TARUH PNG MENTAHAN          AI PROSES                    HASIL FINAL
di folder raw-source        =>   resize/crop/convert      =>  di lokasi yang dipakai game
(tidak dipakai langsung)         WebP/sprite-gen              (WebP, manifest.js, dll)
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

## Tahap 1 — Sprite & Karakter (Bisa Dimainkan)

### Apa yang dihasilkan:
Karakter bisa dipilih dan dimainkan di arena dengan semua 14 animasi.

### AI: Buat Folder Tahap 1

```powershell
$char = "[nama]"
$base = "c:\Users\ACER\Downloads\ragnarok-trinity-main\assets\$char"

New-Item -ItemType Directory -Force -Path "$base\run\raw-original"
New-Item -ItemType Directory -Force -Path "$base\run\raw"
New-Item -ItemType Directory -Force -Path "$base\run\frames"
New-Item -ItemType Directory -Force -Path "$base\ui\raw-original-skill"
New-Item -ItemType Directory -Force -Path "$base\ui\raw-original-ui"
New-Item -ItemType Directory -Force -Path "$base\audio"

Write-Host "Folder siap! Taruh 14 PNG di: $base\run\raw-original\"
Write-Host "Background harus MAGENTA #FF00FF. Kabari kalau sudah!"
```

### Asset yang dibutuhkan developer (Tahap 1):

**Format sprite:**
- Canvas 21:9 (contoh 2016x864 px), 4 pose horizontal
- Background flat MAGENTA `#FF00FF`
- jump dan doublejump: canvas 1:1, hanya 1 pose

**Scale factor:**

| State | Scale |
|---|---|
| idle, walk, crouch | 0.25 |
| run, attack1-3, skill1-2, ultimate, hurt, down | 0.28 |
| jump, doublejump | 0.12 |

### AI: Proses Sprite

```powershell
$char = "[nama]"
$base = "c:\Users\ACER\Downloads\ragnarok-trinity-main\assets\$char"

# Step 1: Resize (lihat Panduan_Sprite_Karakter_AI.md)
# Step 2: Jalankan sprite-gen
# Step 3: Copy manifest
Copy-Item "$base\run\manifest.js" "$base\manifest.js"
```

### AI: Buat File `[nama].js`

```js
/* [NAMA] moves: [Deskripsi karakter] */
(() => {
  'use strict';
  const balance = {
    cooldowns: { skill1: 10, skill2: 20, ultimate: 30 },
    castTime: .5,
    passDamage: 16,
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
    // A) Skill proyektil:
    if (name === 'skill1') return { name, type: name, damage: 18, duration: .50, knockback: 80, projectile: true, speed: 900, hitAt: .5 };
    // B) Skill area/dash:
    if (name === 'skill2') return { name, type: name, damage: 25, duration: .60, knockback: 280, reach: 180, area: true, hitAt: .7 };
    return { name: 'ultimate', type: '[nama]-ult', duration: balance.castTime, damage: 0, hitAt: .4 };
  }
  function start(a, name, index = 1) {
    if (a.action || a.state === 'hurt' || a.state === 'down' || a.state === 'recover') return false;
    if (name !== 'attack' && a.cooldowns[name] > 0) return false;
    if (name !== 'attack') a.cooldowns[name] = balance.cooldowns[name];
    a.action = { ...move(name, index), t: 0, fired: false, queued: 0 };
    a.state = a.action.name; a.stateTime = 0;
    
    // Play SFX Skill
    if ((name === 'skill1' || name === 'skill2') && window.[NamaClass].audio[name]) {
      try {
        const el = new Audio(window.[NamaClass].audio[name]);
        const masterMult = typeof window.AUDIO_CONFIG?.master === 'number' ? window.AUDIO_CONFIG.master : 1.0;
        const skillMult = typeof window.AUDIO_CONFIG?.skills?.[nama]?.[name] === 'number' ? window.AUDIO_CONFIG.skills.[nama][name] : 1.0;
        const sfxVolumeConfig = Number(localStorage.getItem('aether.sfxVolume') || 90) / 100;
        el.volume = Math.max(0, Math.min(1, sfxVolumeConfig * masterMult * skillMult));
        el.play().catch(()=>{});
      } catch (e) {}
    }

    return true;
  }
  const vfx = {
    /**
     * KONFIGURASI EFEK VISUAL (VFX) — WAJIB DIISI DI FILE KARAKTER INI
     *
     * PRINSIP UTAMA:
     * Semua pengaturan visual efek (posisi, ukuran, rotasi) harus didefinisikan
     * di sini, BUKAN di dalam core/game.js. game.js hanya membaca konfigurasi
     * ini dan menjalankannya. Ini membuat setiap karakter mudah diatur tanpa
     * harus menyentuh engine game.
     *
     * === ATTACKS ===
     * Array berisi 3 objek untuk 3 pukulan basic attack.
     * Setiap objek mendukung properti berikut:
     *
     *   asset      : (string) nama key gambar, tanpa prefix "fx-[nama]-"
     *                Contoh: 'slash' → file fx-[nama]-slash.webp
     *   size       : (number) ukuran efek dalam piksel
     *   x          : (number) offset horizontal dari posisi aktor (ke arah hadap)
     *   y          : (number) offset vertikal. Negatif = ke atas. 0 = setinggi kaki
     *   flipX      : (number) 1 = normal, -1 = flip horizontal
     *   rotation   : (number, opsional) rotasi dalam DERAJAT. Contoh: -45, 90
     *
     *   --- Untuk pukulan ke-3 yang memunculkan efek tanah (slam) ---
     *   slamAsset  : (string) nama key gambar efek slam
     *   slamSize   : (number) ukuran efek slam
     *   slamX      : (number, opsional) offset horizontal slam dari posisi aktor
     *   slamY      : (number, opsional) offset vertikal slam dari titik tanah
     *                Contoh: -40 = efek muncul 40px di atas tanah
     */
    attacks: [
      // Pukulan 1: efek slash kiri ke kanan
      { x: 95,  y: -130, size: 80,  asset: '[nama]-slash', flipX: -1 },
      // Pukulan 2: efek slash dengan rotasi miring
      { x: 95,  y: -155, size: 80,  asset: '[nama]-slash', flipX: -1, rotation: -45 },
      // Pukulan 3 (finisher): hanya slam dari tanah, tanpa efek pukulan biasa
      // Untuk menambah efek pukulan sekaligus slam, tambah juga 'asset' dan 'size'
      { slamAsset: '[nama]-slam', slamSize: 170, slamX: 5, slamY: -40 }
    ],

    /**
     * === GUARD / DEFEND ===
     * Efek yang muncul di depan karakter saat menangkis serangan musuh
     * sambil dalam posisi crouch (jongkok).
     *
     *   guardAsset : (string) nama key gambar efek defend/shield
     *   guardSize  : (number) ukuran efek guard
     *   guardX     : (number, opsional) offset horizontal dari posisi karakter
     *   guardY     : (number, opsional) offset vertikal dari posisi karakter
     *
     * Jika tidak ada efek guard, hapus baris ini atau isi null.
     */
    guard: { asset: '[nama]-guard', size: 150, x: 50, y: -70 },

    /**
     * === JUMP SMOKE ===
     * Apakah karakter mengeluarkan efek asap/debu saat melompat?
     *   true  = pakai efek smoke default engine
     *   false = tidak ada efek jump (karakter punya efek custom sendiri)
     */
    hasJumpSmoke: true,

    /**
     * === JUMP DUST CUSTOM ===
     * Jika hasJumpSmoke: false, isi ini untuk efek lompat custom.
     *
     *   asset  : (string) nama key gambar efek lompat
     *   size   : (number) ukuran efek
     *   x      : (number) offset horizontal
     *   y      : (number) offset vertikal (0 = setinggi kaki karakter)
     *
     * Hapus baris jumpDust jika hasJumpSmoke: true.
     */
    // jumpDust: { asset: '[nama]-jumpdust', size: 100, x: 0, y: 0 },
  };
  const ultimate = {
    start(actor, context) {
      return {
        t: 0,
        owner: actor === context.hero ? 'player' : 'enemy',
        facing: actor.facing,
        casterX: actor.x,
        phase: 'cutin',
        hit: false
      };
    },
    update(dt, s, context) {
      if (!s) return null;
      s.t += dt;
      if (s.phase === 'cutin' && s.t >= 1.2) {
        s.phase = 'active';
        // Logika damage/efek ultimate di sini
        if (s.owner === 'player') context.hitDummy(35, 400, '#ff5555', s.casterX, context.dummy.y - 60, true, true);
        else context.receiveHit(35, { knockdown: true });
      }
      if (s.t >= 3.0) { context.stopVoice('[nama]', s.owner); return null; }
      return s;
    }
  };
  function refund(a) {
    for (const n of Object.keys(balance.cooldowns))
      a.cooldowns[n] = Math.max(0, a.cooldowns[n] - balance.cooldowns[n] * balance.basicRefund);
  }
  window.[NamaClass] = {
    audio: {
      skill1: null,
      skill2: null,
      ultimate: 'assets/[nama]/audio/[nama]-ultimate.mp3',
      hit: null
    },
    balance, names, combo, vfx, ultimate, move, start, refund
  };
})();
```

> **PENTING — Blok `audio` di window.[NamaClass]:**
> Setiap karakter WAJIB punya blok `audio`. Ini cara engine membaca path suara tanpa hardcode di game.js.
> - `skill1`, `skill2`, `hit` bisa `null` dulu
> - `ultimate` wajib diisi path mp3
> - Jika developer sediakan sfx skill, isi pathnya di sini, tidak perlu sentuh game.js

### AI: Daftarkan ke `index.html` & `menu.js` (Layar Pemilihan Karakter)

**1. Daftarkan Script di `index.html` (Sebelum `</body>`):**
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

**Entry 3 — VOICE_NAMES (baris ~136):**
```js
[nama]: '[NamaDisplay]',
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

### AI: Buat Fungsi Ultimate di `core/game.js`

Tambah di dekat `updateValkrenUlt`:

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

- [ ] 14 PNG ada di `run/raw-original/`
- [ ] Gambar di-resize dengan scale factor benar
- [ ] `run/sprite-sheet-alpha.webp` sudah dibuat
- [ ] `run/manifest.js` sudah ada
- [ ] `manifest.js` dikopi ke root folder `assets/[nama]/`
- [ ] `[nama].js` dibuat dengan `window.[NamaClass]` + blok `audio`
- [ ] `index.html`: `<option>` + 2 `<script>` tag
- [ ] `game.js` Entry 1: variabel `[AB]` (baris ~22)
- [ ] `game.js` Entry 2: `KITS` (baris ~24)
- [ ] `game.js` Entry 3: `VOICE_NAMES` (baris ~136)
- [ ] `game.js` Entry 4: `CHARACTER_ASSETS` (baris ~2759)
- [ ] `game.js` Entry 5: `startSummon` (baris ~798)
- [ ] `game.js` Entry 6: `syncPlayerForm` (~baris 1445)
- [ ] `game.js` Entry 7: `syncOpponentForm`
- [ ] `game.js`: Fungsi `start[Nama]Ult` + `update[Nama]Ult` dibuat
- [ ] `game.js`: Game loop memanggil `update[Nama]Ult` (2 baris)
- [ ] Cache version di-bump di `index.html`
- [ ] Hard refresh browser (Ctrl+Shift+R)

---

## Tahap 2 — Efek Visual / FX

### Apa yang dihasilkan:
Efek visual muncul saat serangan, skill, dan ultimate.

### AI: Buat Folder & Minta File

```powershell
$char = "[nama]"
$base = "c:\Users\ACER\Downloads\ragnarok-trinity-main\assets\$char"
New-Item -ItemType Directory -Force -Path "$base\ui\raw-original-skill"

Write-Host "Taruh PNG efek di: $base\ui\raw-original-skill\"
Write-Host "Nama yang disarankan (sesuaikan dengan skill karakter):"
Write-Host "  slash.png, hit.png, projectile.png, explosion.png"
Write-Host "  warning.png, eruption.png, ultaura.png, ultenv.png, guard.png, dust.png"
Write-Host "Format: PNG transparan, sprite sheet horizontal 4-8 frame, 256x256 atau 512x512 per frame"
```

### AI: Konversi FX

```powershell
$char = "[nama]"
$rawSkill = "c:\Users\ACER\Downloads\ragnarok-trinity-main\assets\$char\ui\raw-original-skill"

python -c "
from PIL import Image
import pathlib

raw = pathlib.Path(r'$rawSkill')
out = raw.parent

# Sesuaikan mapping dengan file yang benar-benar ada:
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
}
for src, dst in mapping.items():
    p = raw / src
    if p.exists():
        Image.open(p).save(out / dst, 'webp', quality=90)
        print(f'OK: {src} -> {dst}')
    else:
        print(f'SKIP: {src}')
"
```

Setelah konversi, pastikan `names[]` di `CHARACTER_ASSETS` di `game.js` sudah cocok dengan file yang terbentuk.

### Checklist Tahap 2

- [ ] PNG FX ada di `ui/raw-original-skill/`
- [ ] File `fx-*.webp` ada di `ui/` (hasil konversi)
- [ ] `CHARACTER_ASSETS.names[]` di game.js sesuai dengan file yang ada
- [ ] Blok `vfx` di `[nama].js` sudah dikonfigurasi (posisi, ukuran, rotasi)
- [ ] Cache di-bump + hard refresh

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



## Tahap 3 — UI Karakter

### Apa yang dihasilkan:
Portrait di HUD, ikon skill, cut-in ultimate.

### AI: Buat Folder & Copy Placeholder

```powershell
$char = "[nama]"
$base = "c:\Users\ACER\Downloads\ragnarok-trinity-main\assets\$char"
$ref  = "c:\Users\ACER\Downloads\ragnarok-trinity-main\assets\dhyla"

New-Item -ItemType Directory -Force -Path "$base\ui\raw-original-ui"

# Copy placeholder Dhyla dulu agar game tidak crash:
Copy-Item "$ref\ui\portrait.webp"      "$base\ui\portrait.webp"      -Force
Copy-Item "$ref\ui\cutin.webp"         "$base\ui\cutin.webp"         -Force
Copy-Item "$ref\ui\icon-attack.webp"   "$base\ui\icon-attack.webp"   -Force
Copy-Item "$ref\ui\icon-skill1.webp"   "$base\ui\icon-skill1.webp"   -Force
Copy-Item "$ref\ui\icon-skill2.webp"   "$base\ui\icon-skill2.webp"   -Force
Copy-Item "$ref\ui\icon-ultimate.webp" "$base\ui\icon-ultimate.webp" -Force

Write-Host "Placeholder dikopi! Taruh PNG asli di: $base\ui\raw-original-ui\"
Write-Host "  portrait.png    - 384x384px, close-up wajah, HADAP KANAN"
Write-Host "  cutin.png       - landscape ~1920x400px, pose dramatis"
Write-Host "  icon-attack.png / icon-skill1.png / icon-skill2.png / icon-ultimate.png - 128x128px"
```

### AI: Konversi UI

```powershell
python -c "
from PIL import Image
import pathlib

raw = pathlib.Path(r'c:\Users\ACER\Downloads\ragnarok-trinity-main\assets\[nama]\ui\raw-original-ui')
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

- [ ] PNG UI ada di `ui/raw-original-ui/`
- [ ] `portrait.webp`, `cutin.webp`, 4 `icon-*.webp` ada di `ui/`
- [ ] Cache di-bump + hard refresh

---

## Tahap 4 — Audio

### Apa yang dihasilkan:
Suara ultimate, menang, dan select. Opsional: sfx skill.

### AI: Buat Folder & Minta File

```powershell
$char = "[nama]"
$base = "c:\Users\ACER\Downloads\ragnarok-trinity-main\assets\$char"
New-Item -ItemType Directory -Force -Path "$base\audio"

Write-Host "Taruh MP3 di: $base\audio\"
Write-Host "WAJIB:"
Write-Host "  ${char}-ultimate.mp3  - voice ultimate (2-4 detik)"
Write-Host "  ${char}-wins.mp3      - voice menang (2-3 detik)"
Write-Host "  select-${char}.mp3    - suara dipilih (1-2 detik)"
Write-Host "OPSIONAL:"
Write-Host "  ${char}-skill1.mp3   - sfx skill 1 mengenai musuh"
Write-Host "  ${char}-skill2.mp3   - sfx skill 2 mengenai musuh"
Write-Host "Format: MP3, 44.1kHz, 128kbps"
```

### AI: Daftarkan Audio

Audio ultimate sudah otomatis terdaftar lewat blok `audio` di `[nama].js`.
Jika developer juga sediakan sfx skill, update blok `audio` di `[nama].js`:

```js
// Update blok audio di window.[NamaClass]:
audio: {
  skill1:   'assets/[nama]/audio/[nama]-skill1.mp3',  // isi jika file ada
  skill2:   'assets/[nama]/audio/[nama]-skill2.mp3',  // isi jika file ada
  ultimate: 'assets/[nama]/audio/[nama]-ultimate.mp3',
  hit:      null
},
```

Tidak perlu sentuh `game.js` sama sekali untuk audio. Engine membaca otomatis dari blok `audio` ini.

### AI: Daftar Pengaturan Volume Skill di `core/audio-config.js`

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
- [ ] Logika `new Audio` di dalam `function start()` sudah diterapkan
- [ ] Volume skill terdaftar di `core/audio-config.js`
- [ ] Cache di-bump + hard refresh

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
