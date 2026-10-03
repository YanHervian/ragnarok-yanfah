# Panduan Lengkap: Membuat Karakter di Aether Clash

---

## INSTRUKSI UNTUK AI — BACA INI DULU SEBELUM MULAI

> Jika kamu adalah AI yang menerima file panduan ini dari developer, **wajib ikuti alur di bawah ini** sebelum melakukan apapun.

### Alur Wajib saat Developer Menyerahkan Panduan Ini:

**LANGKAH 0 — Validasi Awal (Tanya Developer)**

Tanyakan pertanyaan berikut satu per satu:

1. "Kamu mau buat karakter baru ya? Siapa nama karakternya? (contoh: valkren, zhora, rael)"
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
- Setelah developer konfirmasi file sudah ada, AI mulai proses: resize → convert → taruh di lokasi final
- Jangan langsung lompat ke integrasi engine sebelum semua aset diproses

**Pola komunikasi AI yang benar:**
```
AI: "Oke! Aku buatkan folder dulu..."
    [jalankan perintah buat folder]
AI: "Folder sudah siap! Taruh file PNG kamu di sini:
     assets/[nama]/run/raw-original/
     File yang dibutuhkan: idle.png, walk.png, dst.
     Kabari aku kalau sudah!"

Developer: "Sudah!"

AI: "Oke, aku mulai proses sekarang..."
    [jalankan resize + sprite-gen + copy manifest]
AI: "Selesai! Karakter [nama] sudah bisa dimainkan.
     Mau lanjut ke Tahap 2 (efek visual) atau dicoba dulu?"
```

---

## Konsep Pipeline Asset

> Penting untuk dipahami sebelum memulai. Ini pola kerja yang konsisten di semua tahap.

```
USER TARUH PNG MENTAHAN          AI PROSES                    HASIL FINAL
di folder raw-source        →    resize/crop/convert      →   di lokasi yang dipakai game
(tidak dipakai langsung)         WebP/sprite-gen              (WebP, manifest.js, dll)
```

**Kenapa ada folder raw-source?**
- File asli PNG tidak pernah dihapus → bisa regenerasi ulang kapanpun
- Memisahkan sumber mentah dari hasil proses
- Tidak perlu generate ulang dari AI jika hanya perlu resize ulang

**Tiga folder raw-source yang ada di project:**

| Folder | Isi |
|---|---|
| `run/raw-original/` | PNG sprite animasi karakter (idle, walk, attack, dll) |
| `ui/raw-original-skill/` | PNG efek visual / FX (slash, explosion, aura, dll) |
| `ui/raw-original-ui/` | PNG aset UI (portrait, cutin, ikon skill) |

---

## Struktur Folder Karakter Lengkap

```
assets/[nama-karakter]/
│
├── [nama-karakter].js          ← Logika combat (dibuat oleh AI)
├── manifest.js                 ← Salinan dari run/manifest.js (dikopi oleh AI)
│
├── run/
│   ├── raw-original/           ← USER TARUH PNG SPRITE DI SINI
│   │   ├── idle.png
│   │   ├── walk.png
│   │   ├── run.png
│   │   ├── jump.png
│   │   ├── doublejump.png
│   │   ├── crouch.png
│   │   ├── attack1.png
│   │   ├── attack2.png
│   │   ├── attack3.png
│   │   ├── skill1.png
│   │   ├── skill2.png
│   │   ├── ultimate.png
│   │   ├── hurt.png
│   │   └── down.png
│   │
│   ├── raw/                    ← AI OUTPUT: hasil resize dari raw-original
│   ├── frames/                 ← AI OUTPUT: frame individual hasil extract
│   ├── manifest.js             ← AI OUTPUT: dihasilkan sprite-gen
│   ├── manifest.json           ← AI OUTPUT: versi JSON manifest
│   ├── sprite-sheet-alpha.png  ← AI OUTPUT: sprite sheet final PNG
│   └── sprite-sheet-alpha.webp ← AI OUTPUT: sprite sheet final WebP (dipakai game)
│
├── ui/
│   ├── raw-original-skill/     ← USER TARUH PNG EFEK FX DI SINI
│   │   ├── slash.png           (atau nama bebas, tapi kasih nama yang jelas)
│   │   ├── hit.png
│   │   ├── explosion.png
│   │   ├── aura.png
│   │   └── ... dst
│   │
│   ├── raw-original-ui/        ← USER TARUH PNG UI DI SINI
│   │   ├── portrait.png
│   │   ├── cutin.png
│   │   ├── icon-attack.png
│   │   ├── icon-skill1.png
│   │   ├── icon-skill2.png
│   │   └── icon-ultimate.png
│   │
│   ├── fx-slash.webp           ← AI OUTPUT: konversi dari raw-original-skill
│   ├── fx-hit.webp             ← AI OUTPUT
│   ├── fx-skill1.webp          ← AI OUTPUT
│   ├── fx-skill2.webp          ← AI OUTPUT
│   ├── fx-ultaura.webp         ← AI OUTPUT
│   ├── portrait.webp           ← AI OUTPUT: konversi dari raw-original-ui
│   ├── cutin.webp              ← AI OUTPUT
│   ├── icon-attack.webp        ← AI OUTPUT
│   ├── icon-skill1.webp        ← AI OUTPUT
│   ├── icon-skill2.webp        ← AI OUTPUT
│   └── icon-ultimate.webp      ← AI OUTPUT
│
└── audio/
    ├── [nama]-ultimate.mp3     ← USER TARUH LANGSUNG (sudah format final)
    ├── [nama]-wins.mp3         ← USER TARUH LANGSUNG
    └── select-[nama].mp3       ← USER TARUH LANGSUNG
```

---

## Tahap 1 — Sprite & Karakter (Bisa Dimainkan)

### Apa yang dihasilkan di akhir tahap ini:
Karakter sudah bisa dipilih dan dimainkan di arena dengan semua 14 animasi berjalan.

---

### AI: Buat Folder Tahap 1

```powershell
$char = "[nama]"   # ← ganti dengan nama karakter
$base = "c:\Users\ACER\Downloads\aether-clash-main\assets\$char"

New-Item -ItemType Directory -Force -Path "$base\run\raw-original"
New-Item -ItemType Directory -Force -Path "$base\run\raw"
New-Item -ItemType Directory -Force -Path "$base\run\frames"
New-Item -ItemType Directory -Force -Path "$base\ui\raw-original-skill"
New-Item -ItemType Directory -Force -Path "$base\ui\raw-original-ui"
New-Item -ItemType Directory -Force -Path "$base\audio"

Write-Host ""
Write-Host "======================================"
Write-Host " Folder Tahap 1 siap untuk: $char"
Write-Host "======================================"
Write-Host ""
Write-Host "Sekarang taruh 14 file PNG sprite kamu di:"
Write-Host "  $base\run\raw-original\"
Write-Host ""
Write-Host "File yang dibutuhkan (background harus MAGENTA #FF00FF):"
Write-Host ""
Write-Host "  [Animasi Berdiri]"
Write-Host "  idle.png        - berdiri diam, 4 pose berurutan horizontal"
Write-Host "  walk.png        - jalan kaki, 4 pose berurutan horizontal"
Write-Host "  run.png         - lari sprint, 4 pose berurutan horizontal"
Write-Host "  crouch.png      - menunduk/guard, 4 pose berurutan horizontal"
Write-Host ""
Write-Host "  [Animasi Udara]"
Write-Host "  jump.png        - 1 pose melayang atletis"
Write-Host "  doublejump.png  - 1 pose tuck/gulung"
Write-Host ""
Write-Host "  [Animasi Serangan]"
Write-Host "  attack1.png     - serangan 1, 4 pose"
Write-Host "  attack2.png     - serangan 2, 4 pose"
Write-Host "  attack3.png     - finisher, 4 pose"
Write-Host "  skill1.png      - skill I, 4 pose"
Write-Host "  skill2.png      - skill O, 4 pose"
Write-Host "  ultimate.png    - ultimate P, 4 pose"
Write-Host ""
Write-Host "  [Animasi Kena Pukul]"
Write-Host "  hurt.png        - kena pukul, 4 pose"
Write-Host "  down.png        - jatuh/KO, 4 pose"
Write-Host ""
Write-Host "Kabari aku kalau semua file sudah ditaruh!"
```

---

### Asset yang dibutuhkan developer (Tahap 1):

**Format generate AI untuk sprite:**
- Canvas 21:9 (contoh 2016x864 px)
- 4 pose karakter berurutan horizontal dalam 1 gambar
- Background flat MAGENTA `#FF00FF`
- Tidak ada teks, nomor frame, atau garis guide
- Kecuali jump dan doublejump: canvas 1:1 atau 9:16, hanya 1 pose

---

### AI: Proses Sprite (setelah developer konfirmasi file sudah ada)

```powershell
# Setelah developer taruh semua PNG di raw-original/
# AI jalankan proses ini:

$char = "[nama]"
$base = "c:\Users\ACER\Downloads\aether-clash-main\assets\$char"

# Step 1: Resize gambar AI ke ukuran yang benar
# (jalankan skrip resize dari Panduan_Sprite_Karakter_AI.md)
# Scale factor per animasi:
#   idle, walk, crouch        → 0.25
#   run, attack, skill, ult   → 0.28
#   jump, doublejump          → 0.12

Write-Host "Step 1: Resize gambar..."
# python resize_sprite.py --input "$base\run\raw-original" --output "$base\run\raw" ...

# Step 2: Jalankan sprite-gen
Write-Host "Step 2: Extract frames dan compose sprite sheet..."
# & $spritePy -X utf8 -m sprite_gen.cli compose-atlas --run-dir "$base\run"

# Step 3: Copy manifest.js ke root folder (WAJIB!)
Write-Host "Step 3: Copy manifest.js ke root folder..."
Copy-Item "$base\run\manifest.js" "$base\manifest.js"

Write-Host ""
Write-Host "Sprite sheet selesai!"
Write-Host "  Output: $base\run\sprite-sheet-alpha.webp"
Write-Host "  Manifest: $base\manifest.js"
```

**Scale factor detail (penting, baca Panduan_Sprite_Karakter_AI.md untuk skrip resize):**

| State | Scale | Kenapa |
|---|---|---|
| idle, walk, crouch | **0.25** | Pose berdiri, ukuran standar |
| run, attack1-3, skill1-2, ultimate, hurt, down | **0.28** | Pose aksi, sedikit lebih besar |
| jump, doublejump | **0.12** | Kanvas AI sangat tinggi, harus dikecilkan ekstrem |

---

### AI: Buat File Logika Karakter & Daftarkan ke Engine

Setelah sprite sheet selesai, AI buat `[nama].js` dan daftarkan di `index.html` + `core/game.js`.

**Template [nama].js:**
```js
/* [NAMA] moves: [Deskripsi] */
(() => {
  'use strict';
  const balance = { cooldowns:{ skill1:10, skill2:20, ultimate:30 }, castTime:.5, passDamage:16, basicRefund:.05 };
  const names = ['BASIC ATK','ATK 2','ATK 3','SKILL 1','SKILL 2','ULTIMATE'];
  const combo = [
    { damage:6,  knockback:75,  reach:90,  duration:.34, hitAt:.5 },
    { damage:8,  knockback:100, reach:78,  duration:.40, hitAt:.5 },
    { damage:12, knockback:180, reach:115, duration:.50, hitAt:.55 }
  ];
  function move(name, index=1) {
    if (name==='attack') return { name:`attack${index}`, type:'attack', index, ...combo[index-1] };
    if (name==='skill1') return { name, type:name, damage:16, duration:.46, knockback:60, projectile:true, speed:840, hitAt:.5 };
    if (name==='skill2') return { name, type:name, damage:24, duration:.45, knockback:300, reach:190, area:true, dash:850, hitAt:.75 };
    return { name:'ultimate', type:'[nama]-ult', duration:balance.castTime, damage:0, hitAt:.4 };
  }
  function start(a, name, index=1) {
    if (a.action || a.state==='hurt' || a.state==='down' || a.state==='recover') return false;
    if (name!=='attack' && a.cooldowns[name]>0) return false;
    if (name!=='attack') a.cooldowns[name]=balance.cooldowns[name];
    a.action={ ...move(name,index), t:0, fired:false, queued:0 };
    a.state=a.action.name; a.stateTime=0;
    return true;
  }
  const vfx = {
    attacks: [
      { x:100, y:-130, size:80,  asset:'[nama]-slash', flipX:-1 },
      { x:100, y:-160, size:80,  asset:'[nama]-slash', flipX:-1 },
      { x:125, y:-115, size:100, asset:'[nama]-slash', flipX:-1 }
    ],
    hasJumpSmoke: true
  };
  const ultimate = {
    start(actor, context) {
      return { t:0, owner:actor===context.hero?'player':'enemy', facing:actor.facing, casterX:actor.x, phase:'cutin', hit:false };
    },
    update(dt, s, context) {
      if (!s) return null;
      s.t += dt;
      if (s.t>=3.0) { context.stopVoice('[nama]',s.owner); return null; }
      return s;
    }
  };
  function refund(a) {
    for (const n of Object.keys(balance.cooldowns))
      a.cooldowns[n]=Math.max(0, a.cooldowns[n]-balance.cooldowns[n]*balance.basicRefund);
  }
  window.[NamaClass] = { balance, names, combo, vfx, ultimate, move, start, refund };
})();
```

**7 Entry wajib di core/game.js (dikurangi dari 10 — sistem baru):**
1. Variabel `[ABBR] = window.[Class] && window.[NAMA]_MANIFEST ? window.[Class] : null`
2. Entry KITS `...([ABBR] ? { [nama]: [ABBR] } : {})`
3. Voice path constant `[NAMA]_VOICE_PATH = 'assets/[nama]/audio/[nama]-ultimate.mp3'`
4. VOICE_NAMES entry `[nama]: '[NamaDisplay]'`
5. Loop voice loading `...([ABBR] ? [['[nama]', [NAMA]_VOICE_PATH]] : [])`
6. Fungsi `start[Nama]Ult()` dan `update[Nama]Ult()` (taruh dekat updateDhylaUlt) — lihat catatan di bawah
7. Entry di `startSummon` sebelum `else startRocketParade`

> **⚠️ PENTING — Sistem Ultimate Pool Otomatis (berlaku sejak Oktober 2026):**
> 
> Tidak perlu lagi mendaftarkan variable ult secara manual (`[nama]Ult`, `enemy[Nama]Ult`),
> tidak perlu tambah ke `heroSummon`, tidak perlu tambah ke `cutinKey`.
> 
> **Cara mendaftarkan ultimate ke pool universal:**
> Di dalam fungsi `start[Nama]Ult()`, ganti baris assignment lama dengan:
> ```js
> group._charId = '[nama]'; // ← ID karakter, dipakai otomatis oleh cutin
> if (actor === hero) activeUlt.player = group; else activeUlt.enemy = group;
> ```
> Di dalam fungsi `update[Nama]Ult()`, ganti baris null-assignment dengan:
> ```js
> if (s === activeUlt.enemy) activeUlt.enemy = null;
> else if (s === activeUlt.player) activeUlt.player = null;
> ```
> 
> Dengan ini, AI bot musuh **otomatis akan defend/block** saat player pakai ultimate karakter baru,
> dan cutin display juga **otomatis tampil** tanpa perlu edit bagian cutinKey.

### Checklist Tahap 1

- [ ] 14 PNG ada di `run/raw-original/`
- [ ] Gambar di-resize dengan scale factor benar
- [ ] `run/sprite-sheet-alpha.webp` sudah dibuat
- [ ] `run/manifest.js` sudah ada
- [ ] `manifest.js` dikopi ke **root folder** `assets/[nama]/`
- [ ] `[nama].js` dibuat dengan `window.[NamaClass]` di akhir
- [ ] `index.html` punya `<option>` dan 2 `<script>` tag
- [ ] `core/game.js` punya semua 7 entry (sistem pool baru, bukan 10)
- [ ] Cache version di-bump di `index.html`
- [ ] Hard refresh browser (Ctrl+Shift+R)

**→ Checklist semua centang = karakter bisa dimainkan!**

---

## Tahap 2 — Efek Visual / FX (Bisa Tampil)

### Apa yang dihasilkan di akhir tahap ini:
Efek visual muncul saat serangan, skill, dan ultimate (slash, ledakan, aura, dll).

---

### AI: Buat Folder Tahap 2

```powershell
$char = "[nama]"
$base = "c:\Users\ACER\Downloads\aether-clash-main\assets\$char"

New-Item -ItemType Directory -Force -Path "$base\ui\raw-original-skill"

Write-Host ""
Write-Host "======================================"
Write-Host " Folder FX siap untuk: $char"
Write-Host "======================================"
Write-Host ""
Write-Host "Taruh PNG efek visual kamu di:"
Write-Host "  $base\ui\raw-original-skill\"
Write-Host ""
Write-Host "Nama file bebas, tapi kasih nama yang jelas. Contoh:"
Write-Host "  slash.png           - efek ayunan serangan basic"
Write-Host "  hit.png             - efek kena pukul"
Write-Host "  skill1-effect.png   - efek skill 1"
Write-Host "  skill2-effect.png   - efek skill 2"
Write-Host "  ultimate-aura.png   - aura saat ultimate aktif"
Write-Host "  ultimate-env.png    - efek lingkungan ultimate"
Write-Host ""
Write-Host "Format PNG: sprite sheet HORIZONTAL 4-8 frame, background transparan"
Write-Host "Ukuran per frame: 256x256 atau 512x512 px"
Write-Host ""
Write-Host "Kabari aku kalau file sudah siap!"
```

---

### Asset yang dibutuhkan developer (Tahap 2):

**Format generate AI untuk FX:**
- Sprite sheet horizontal 4-8 frame berurutan
- Background transparan (PNG dengan alpha channel)
- Ukuran per frame: 256×256 atau 512×512 px
- Untuk efek besar (ultimate aura): bisa 512×512 per frame

---

### AI: Proses FX (setelah developer konfirmasi file sudah ada)

Setelah PNG mentahan ada di `raw-original-skill/`, AI konversi ke WebP dan taruh di `ui/`:

```powershell
# Convert PNG FX ke WebP
$char = "[nama]"
$base = "c:\Users\ACER\Downloads\aether-clash-main\assets\$char"
$rawSkill = "$base\ui\raw-original-skill"

# Contoh konversi (sesuaikan nama file sumber dan target):
# slash.png        → ui/fx-slash.webp
# hit.png          → ui/fx-hit.webp
# skill1-effect.png → ui/fx-skill1.webp
# skill2-effect.png → ui/fx-skill2.webp
# ultimate-aura.png → ui/fx-ultaura.webp
# ultimate-env.png  → ui/fx-ultenv.webp

# Gunakan Python Pillow untuk konversi:
python -c "
from PIL import Image
import pathlib

raw = pathlib.Path(r'$rawSkill')
out = raw.parent

mapping = {
    'slash.png':          'fx-slash.webp',
    'hit.png':            'fx-hit.webp',
    'skill1-effect.png':  'fx-skill1.webp',
    'skill2-effect.png':  'fx-skill2.webp',
    'ultimate-aura.png':  'fx-ultaura.webp',
    'ultimate-env.png':   'fx-ultenv.webp',
}
for src_name, dst_name in mapping.items():
    src = raw / src_name
    if src.exists():
        img = Image.open(src)
        img.save(out / dst_name, 'webp', quality=90)
        print(f'Converted: {src_name} -> {dst_name}')
    else:
        print(f'SKIP (tidak ada): {src_name}')
"

Write-Host ""
Write-Host "FX sudah dikonversi ke WebP di $base\ui\"
```

**Setelah konversi, update `CHARACTER_ASSETS` di `core/game.js`:**
```js
[nama]: {
  sprite: ['[nama]', 'assets/[nama]/run/sprite-sheet-alpha.webp'],
  fx: {
    prefix: 'fx-[nama]-',
    dir: 'assets/[nama]/ui/fx-',
    names: ['slash', 'hit', 'skill1', 'skill2', 'ultaura']
    // Nama harus cocok persis dengan file fx-*.webp yang ada
  }
},
```

### Checklist Tahap 2

- [ ] PNG FX ada di `ui/raw-original-skill/`
- [ ] File `fx-*.webp` sudah ada di `ui/` (hasil konversi)
- [ ] `CHARACTER_ASSETS.names[]` di game.js sudah diupdate
- [ ] Cache di-bump + hard refresh

---

## Tahap 3 — UI Karakter (Bisa Tampil)

### Apa yang dihasilkan di akhir tahap ini:
Portrait muncul di HUD, ikon skill tampil, cut-in dramatis saat ultimate.

---

### AI: Buat Folder & Placeholder Tahap 3

```powershell
$char = "[nama]"
$base = "c:\Users\ACER\Downloads\aether-clash-main\assets\$char"
$ref  = "c:\Users\ACER\Downloads\aether-clash-main\assets\dhyla"

New-Item -ItemType Directory -Force -Path "$base\ui\raw-original-ui"

# Copy placeholder dari Dhyla agar game tidak crash selagi aset asli belum ada
Copy-Item "$ref\ui\portrait.webp"      "$base\ui\portrait.webp"      -Force
Copy-Item "$ref\ui\cutin.webp"         "$base\ui\cutin.webp"         -Force
Copy-Item "$ref\ui\icon-attack.webp"   "$base\ui\icon-attack.webp"   -Force
Copy-Item "$ref\ui\icon-skill1.webp"   "$base\ui\icon-skill1.webp"   -Force
Copy-Item "$ref\ui\icon-skill2.webp"   "$base\ui\icon-skill2.webp"   -Force
Copy-Item "$ref\ui\icon-ultimate.webp" "$base\ui\icon-ultimate.webp" -Force

Write-Host ""
Write-Host "======================================"
Write-Host " Folder UI siap untuk: $char"
Write-Host "======================================"
Write-Host ""
Write-Host "Placeholder dari Dhyla sudah dikopi (agar game tidak crash dulu)."
Write-Host ""
Write-Host "Taruh PNG asli karakter kamu di:"
Write-Host "  $base\ui\raw-original-ui\"
Write-Host ""
Write-Host "File yang dibutuhkan:"
Write-Host "  portrait.png       - 384x384px, close-up wajah, HARUS HADAP KANAN"
Write-Host "  cutin.png          - ~1920x400px landscape, pose dramatis saat ultimate"
Write-Host "  icon-attack.png    - 128x128px, ikon serangan basic"
Write-Host "  icon-skill1.png    - 128x128px, ikon skill I"
Write-Host "  icon-skill2.png    - 128x128px, ikon skill O"
Write-Host "  icon-ultimate.png  - 128x128px, ikon ultimate P"
Write-Host ""
Write-Host "Kabari aku kalau file sudah siap!"
```

---

### AI: Proses UI (setelah developer konfirmasi file sudah ada)

Setelah PNG ada di `raw-original-ui/`, AI konversi ke WebP dan taruh di `ui/`:

```powershell
$char = "[nama]"
$base = "c:\Users\ACER\Downloads\aether-clash-main\assets\$char"
$rawUi = "$base\ui\raw-original-ui"

python -c "
from PIL import Image
import pathlib

raw = pathlib.Path(r'$rawUi')
out = raw.parent

# Mapping nama file sumber -> nama file output
mapping = {
    'portrait.png':       ('portrait.webp',       (384, 384)),
    'cutin.png':          ('cutin.webp',           None),
    'icon-attack.png':    ('icon-attack.webp',     (128, 128)),
    'icon-skill1.png':    ('icon-skill1.webp',     (128, 128)),
    'icon-skill2.png':    ('icon-skill2.webp',     (128, 128)),
    'icon-ultimate.png':  ('icon-ultimate.webp',   (128, 128)),
}
for src_name, (dst_name, size) in mapping.items():
    src = raw / src_name
    if src.exists():
        img = Image.open(src).convert('RGBA')
        if size:
            img = img.resize(size, Image.LANCZOS)
        img.save(out / dst_name, 'webp', quality=92)
        print(f'Converted: {src_name} -> {dst_name}')
    else:
        print(f'SKIP (tidak ada): {src_name}')
"

Write-Host "UI sudah dikonversi ke WebP!"
Write-Host "Portrait dan ikon sekarang sudah menggunakan aset asli."
```

**Catatan portrait:**
- Harus **hadap ke kanan** — UI musuh di game otomatis di-flip ke kiri
- Close-up kepala besar, bukan full body
- Resize otomatis ke 384×384

### Checklist Tahap 3

- [ ] PNG UI ada di `ui/raw-original-ui/`
- [ ] File `portrait.webp`, `cutin.webp`, dan 4 `icon-*.webp` ada di `ui/`
- [ ] Cache di-bump + hard refresh

---

## Tahap 4 — Audio Karakter (Bisa Dipakai)

### Apa yang dihasilkan di akhir tahap ini:
Suara muncul saat ultimate diaktifkan, menang, dan saat dipilih di menu.

---

### AI: Buat Folder Tahap 4

```powershell
$char = "[nama]"
$base = "c:\Users\ACER\Downloads\aether-clash-main\assets\$char"

New-Item -ItemType Directory -Force -Path "$base\audio"

Write-Host ""
Write-Host "======================================"
Write-Host " Folder Audio siap untuk: $char"
Write-Host "======================================"
Write-Host ""
Write-Host "Taruh 3 file MP3 langsung di (sudah format final, tidak diproses lagi):"
Write-Host "  $base\audio\"
Write-Host ""
Write-Host "Nama file HARUS PERSIS seperti ini:"
Write-Host "  ${char}-ultimate.mp3   - voice line saat ultimate (2-4 detik)"
Write-Host "  ${char}-wins.mp3       - voice line saat menang (2-3 detik)"
Write-Host "  select-${char}.mp3     - suara pendek saat dipilih (1-2 detik)"
Write-Host ""
Write-Host "Format: MP3, mono/stereo, 44.1kHz, 128kbps"
Write-Host "Tips: Bisa generate pakai TTS atau rekam manual"
Write-Host ""
Write-Host "Kabari aku kalau file sudah siap!"
```

---

### AI: Daftarkan Audio ke game.js (setelah developer konfirmasi file ada)

Tambah 3 entry di `core/game.js`:

```js
// 1. Baris voice path constant (~baris 110):
[NAMA]_VOICE_PATH = 'assets/[nama]/audio/[nama]-ultimate.mp3';

// 2. Object VOICE_NAMES (~baris 111):
[nama]: '[NamaDisplay]',

// 3. Loop voice loading (~baris 117):
...([ABBR] ? [['[nama]', [NAMA]_VOICE_PATH]] : [])
```

### Checklist Tahap 4

- [ ] 3 file MP3 ada di `audio/` dengan nama yang benar
- [ ] `[NAMA]_VOICE_PATH` terdaftar di game.js
- [ ] Entry di `VOICE_NAMES` sudah ada
- [ ] Loop voice loading sudah include karakter ini
- [ ] Cache di-bump + hard refresh

---

## Catatan Masalah Umum & Solusinya

### 1. Game Crash Saat Pilih Karakter
**Penyebab:** Fungsi `update[Nama]Ult` tidak ada tapi sudah dipanggil di game loop.
**Solusi:** Tambah kedua fungsi ult (lihat Tahap 1 - 7 Entry). Pastikan pakai sistem pool baru (`activeUlt`) bukan variabel lama.

### 2. Karakter Tidak Berubah / Cache Lama
**Penyebab:** Service Worker menyimpan cache lama.
**Solusi:** Bump version di `index.html`, lalu Ctrl+Shift+R.

### 3. Sprite Kosong / Tidak Tampil
**Penyebab:** `images.[nama]` undefined saat render pertama (lazy loading).
**Solusi:** Tambah guard null-check di `syncPlayerForm` di game.js.

### 4. Sprite Terpotong atau Terlalu Besar
**Penyebab:** Gambar AI tidak di-resize sebelum diekstrak.
**Solusi:** Ikuti `Panduan_Sprite_Karakter_AI.md`, resize dengan scale factor yang benar.

### 5. Error "window.NAMA_MANIFEST is not defined"
**Penyebab:** `manifest.js` belum dikopi dari `run/` ke root folder.
```powershell
Copy-Item "assets\[nama]\run\manifest.js" "assets\[nama]\manifest.js"
```

### 6. FX Tidak Tampil
**Penyebab:** Nama di `CHARACTER_ASSETS.names[]` tidak cocok nama file.
**Solusi:** Cek `names: ['slash',...]` harus ada file `fx-slash.webp` di `ui/`.

### 7. Portrait / Ikon Tidak Tampil
**Penyebab:** File belum ada.
**Solusi:** Copy placeholder dulu (lihat Tahap 3 - AI: Buat Folder).

---

## Status Rilis Karakter

| Komponen | Tahap | Status Minimum |
|---|---|---|
| Bisa dipilih dan dimainkan | Tahap 1 | **WAJIB** |
| Efek visual semua skill tampil | Tahap 2 | Opsional (tapi direkomendasikan) |
| Portrait, ikon, cut-in asli | Tahap 3 | Opsional (placeholder bisa dipakai dulu) |
| Suara ultimate, menang, select | Tahap 4 | Opsional |

---

## Sistem Bot AI — Cara Kerja Otomatis

> Bagian ini penting dibaca oleh AI coding yang akan membuat karakter baru.

### Apa yang SUDAH otomatis (tidak perlu dilakukan apapun):

| Kemampuan AI | Cara Kerja |
|---|---|
| Combo attack 1-2-3 | Baca dari `KITS[karakter].move('attack', index)` — otomatis |
| Pakai Skill 1 & Skill 2 | Baca dari `KITS[karakter].move('skill1/2')` — otomatis |
| Defend saat musuh attack biasa | Deteksi `hero.action` secara generik — otomatis |
| Defend saat musuh pakai Skill 1 & Skill 2 | Deteksi `hero.action` secara generik — otomatis |
| Defend saat musuh pakai Ultimate | Baca `activeUlt.player` — **otomatis sejak sistem pool** |
| Cutin ultimate tampil dengan nama karakter | Baca `summon._charId` — **otomatis sejak sistem pool** |
| Scaling 4 level kesulitan (Easy-Excellent) | Diatur di `core/match.js` difficulties — universal |

### Yang masih perlu dilakukan developer saat membuat karakter baru:

1. **Daftar ke `KITS`** (1 baris di game.js) → AI bisa mainkan karakter itu
2. **Buat `start[Nama]Ult()` + `update[Nama]Ult()`** dengan pola pool → AI defend otomatis
3. **Daftar ke `startSummon()`** → trigger ult bisa dijalankan engine

### Pola wajib untuk Ultimate Pool (copy-paste ini):

```js
// Di start[Nama]Ult(actor):
function start[Nama]Ult(actor) {
    const ctx = makeUltContext();
    const group = window.[NamaClass]?.ultimate?.start ? window.[NamaClass].ultimate.start(actor, ctx)
        : { t: 0, owner: actor === hero ? 'player' : 'enemy', facing: actor.facing, casterX: actor.x, phase: 'cutin', hit: false };
    group._charId = '[nama]';                          // ← WAJIB, untuk cutin otomatis
    if (actor === hero) activeUlt.player = group;      // ← pool universal
    else activeUlt.enemy = group;
    cinematic = .9; announceTimer = 0;
    startUltimateVoice('[nama]', actor);
}

// Di update[Nama]Ult(dt, s):
function update[Nama]Ult(dt, s) {
    if (!s) return;
    const ctx = makeUltContext();
    const next = window.[NamaClass]?.ultimate?.update ? window.[NamaClass].ultimate.update(dt, s, ctx) : null;
    if (!next) {
        if (s === activeUlt.enemy) activeUlt.enemy = null;        // ← bersihkan pool
        else if (s === activeUlt.player) activeUlt.player = null;
    }
}
```

### Cara panggil di game loop (~baris 1078):
```js
updateSystemCrash(dt, systemcrash); updateSystemCrash(dt, enemySystemcrash);
updateDhylaUlt(dt, activeUlt.player?._charId === 'dhyla' ? activeUlt.player : null);
updateDhylaUlt(dt, activeUlt.enemy?._charId === 'dhyla' ? activeUlt.enemy : null);
updateValkrenUlt(dt, activeUlt.player?._charId === 'valkren' ? activeUlt.player : null);
updateValkrenUlt(dt, activeUlt.enemy?._charId === 'valkren' ? activeUlt.enemy : null);
// Tambah baris untuk karakter baru di bawah pola yang sama:
updateNamaUlt(dt, activeUlt.player?._charId === '[nama]' ? activeUlt.player : null);
updateNamaUlt(dt, activeUlt.enemy?._charId === '[nama]' ? activeUlt.enemy : null);
```

---

*Panduan ini dibuat dari pengalaman nyata membuat Yanfah, Dhyla, dan Valkren.*
*Perbarui dokumen ini setiap kali menemukan pola atau masalah baru.*
