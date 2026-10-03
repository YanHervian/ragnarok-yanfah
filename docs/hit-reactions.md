# Reaksi Saat Kena Hit (Game Fighting)

Panduan supaya pukulan terasa "kena" — untuk pemain maupun musuh. Bagian 1 = sprite yang harus dibuat,
bagian 2 = cara memakainya di game. Angka di bawah sudah diuji di proyek knight vs orc (60 fps, layar 960×540);
anggap sebagai titik awal lalu setel.

## 1. Sprite yang dibutuhkan

Setiap petarung minimal punya gerakan berikut (selain idle/walk/attack):

| Gerakan | Frame | Isi pose | Dipakai untuk |
|---|---|---|---|
| **hurt** | 4 | 1 tersentak (kepala terlempar ke belakang) · 2 terhuyung mundur · 3 masih goyah, lutut ditekuk · 4 kembali ke kuda-kuda | Setiap pukulan biasa |
| **down** | 4 | 1 terlempar ke belakang (kaki lepas tanah) · 2 jatuh miring · 3 mendarat telentang · 4 berbaring | Setelah damage menumpuk / pukulan berat |
| *(bangkit)* | – | **tidak perlu dibuat**: putar `down` frame 2 → 1 → 0 | Bangun dari jatuh |

Kalimat prompt yang penting (lihat [sprite-prompts.md](sprite-prompts.md) untuk template lengkap):

```
hurt : getting hit from the front while facing RIGHT: frame 1 flinch, head snapping back, torso bending
       backward; frame 2 stagger backward, one foot sliding back; frame 3 still staggered, knees bent,
       recovering balance; frame 4 regaining guard stance. Feet stay on the same ground line.
       No blood, no impact stars, no motion lines.
down : knocked down backward (he was facing RIGHT, so he falls to the LEFT onto his back): frame 1 big
       recoil, feet leaving the ground; frame 2 falling backward at a steep angle; frame 3 landing on his
       back, legs up; frame 4 lying flat on his back, weapon beside him.
```

Aturan sprite:
- Arah jatuh **ke belakang** relatif arah hadap (hadap kanan → jatuh ke kiri). Di game sprite di-flip untuk arah lain.
- **Tanpa efek** di sprite (darah, bintang, garis gerak) — efek dibuat di game supaya bisa diatur.
- Gerakan hurt/down yang ditambah belakangan **wajib diukur skalanya** terhadap idle — sering meleset jauh
  (kasus nyata: hurt knight ±30 % lebih kecil). Pose jatuh tidak bisa diukur lewat kepala → cek visual.
  Lihat [sprite-known-issues.md #13–14](sprite-known-issues.md).

## 2. Di game: urutan kejadian saat pukulan kena

Semua lapisan ini terjadi bersamaan, dalam ±0.1 detik:

| # | Lapisan | Nilai yang dipakai | Catatan |
|---|---|---|---|
| 1 | **Hit-stop** (simulasi berhenti sejenak) | ringan 0.045 s · berat 0.09–0.11 s | Hanya simulasi yang berhenti; layar tetap digambar |
| 2 | **Kilat** pada yang terkena | musuh: putih `brightness(2.6)` 0.1 s · pemain: merah 0.14 s | Warna berbeda → pemain langsung tahu siapa yang kena |
| 3 | **Percikan** di titik kena | 10–18 partikel, warna sesuai sumber (emas = pedang, biru = skill cahaya, jingga = api) | Muncul di tinggi hitbox serangan, bukan di kaki |
| 4 | **Screen shake** | trauma +0.18 ringan · +0.45 berat · +0.3 saat roboh | Menggoyang seluruh stage, bukan badan karakter |
| 5 | **Knockback** | kecepatan = arah pukulan × 150–320 px/s, diredam cepat (900 px/s²) | Terlempar sebentar lalu berhenti, tidak meluncur jauh |
| 6 | **Animasi hurt** | 4 frame dalam 0.4 s | Membatalkan serangan yang sedang berjalan |
| 7 | **Angka damage / suara** | angka melayang 0.7 s; bunyi pukul | Pukulan beruntun kecil (api) tanpa bunyi per tick |

### Pemain (yang dikendalikan)

- Saat hurt: **input dikunci** (tidak bisa jalan, lompat, atau menyerang) selama animasi hurt ±0.42 s.
- Setelah itu **kebal 0.9 s** dan sprite **berkedip** (alpha 0.5 setiap 50 ms) — mencegah dipukul beruntun tanpa bisa membalas.
- **Super armor** saat skill/summon: pukulan tidak memotong skill (terasa adil setelah pemain berkomitmen ke skill).
- Pemain menghadap ke arah penyerang saat terkena.

### Musuh

- **Setiap pukulan membatalkan serangannya** (termasuk saat ancang-ancang) → pemain yang memukul duluan menang.
- **Tanpa health bar**: damage ditumpuk diam-diam; setelah ambang (±110, ±8 pukulan biasa) → **roboh**.
- Roboh: terlempar 280 px/s → jatuh (goyang layar + debu saat mendarat) → berbaring 1.3 s → bangkit
  (down diputar terbalik, 0.4 s) → damage kembali 0 → kebal 0.5 s.
- Selama roboh/bangkit **tidak bisa dipukul** (mencegah combo tanpa akhir).

### Serangan musuh harus bisa dibaca

- **Ancang-ancang ±0.5 s** (frame senjata terangkat ditahan lama) sebelum frame yang melukai.
- Hitbox hanya aktif di frame ayun & hantam; **satu serangan = paling banyak satu hit**.
- Jeda antar serangan acak **0.8–1.7 s** supaya pemain punya celah membalas.

## 3. Checklist

- [ ] Petarung punya sprite hurt (4) dan down (4), skalanya sudah diukur terhadap idle
- [ ] Pukulan memicu: hit-stop · kilat · percikan · shake · knockback · animasi hurt (semua sekaligus)
- [ ] Kilat pemain beda warna dengan kilat musuh
- [ ] Pemain: input terkunci saat hurt, lalu kebal + berkedip
- [ ] Musuh: pukulan membatalkan serangannya; roboh setelah ambang; kebal saat roboh/bangkit
- [ ] Serangan musuh punya ancang-ancang yang terlihat dan jeda antar serangan
- [ ] Efek (darah/percikan/angka) dibuat di game, bukan digambar di sprite
