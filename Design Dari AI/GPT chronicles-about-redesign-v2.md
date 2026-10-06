# RAGNAROK: TRINITY — ABOUT / CHRONICLES REDESIGN v2

## BRIEF UNTUK AI CODING

Saya ingin kamu **merombak total halaman `About / Chronicles`** pada game fighting web **RAGNAROK: TRINITY**.

Gunakan file yang sudah ada sebagai basis. Jangan membuat halaman baru di luar sistem menu yang sekarang.

Tujuan utamanya:

> Jadikan halaman Chronicles terasa seperti **lore screen dari game fighting AAA modern**, bukan seperti website yang memiliki satu panel/card di tengah.

Referensi nuansa:

- Tekken
- Valorant
- Street Fighter modern
- Guilty Gear
- Arena fighting game premium
- Tactical HUD
- Cinematic anime battle UI

Namun jangan meniru desain salah satu game secara mentah. Buat identitas visual sendiri untuk RAGNAROK: TRINITY.

---

# 1. SCOPE — WAJIB DIPATUHI

## File yang boleh disentuh

### `menu.js`

Hanya bagian:

```js
else if (screen === 'about') {
  ...
}
```

Lokasi saat ini sekitar:

```text
baris 576
```

Boleh mengganti **seluruh HTML di dalam kondisi About**.

Jangan mengubah logic screen lain.

---

### `menu.css`

Kali ini kamu **BEBAS menyentuh CSS sebanyak yang diperlukan**, tetapi hanya jika CSS tersebut benar-benar berhubungan dengan halaman About / Chronicles.

Artinya boleh:

- mengganti CSS `.lore-wrapper`
- mengganti CSS `.lore-panel`
- mengganti CSS `.lore-header`
- mengganti CSS `.lore-body`
- mengganti CSS `.faction-card`
- mengganti CSS `.lore-footer`
- mengganti CSS `.about-*` lama jika masih relevan
- menghapus CSS About lama
- menambahkan class baru khusus Chronicles
- menambahkan pseudo-element
- menambahkan animation
- menambahkan media query khusus Chronicles
- menambahkan decorative elements
- mengatur background khusus Chronicles
- menggunakan CSS variable
- menggunakan `clip-path`
- menggunakan `mask`
- menggunakan gradient
- menggunakan glow
- menggunakan transform
- menggunakan grid/flex
- menggunakan CSS `color-mix`

### DILARANG

Jangan menyentuh:

```text
style.css
```

Jangan merombak CSS:

- Home
- Character Select
- Arena Select
- Settings
- VS Screen
- Result
- Gameplay
- HUD in-game

Jika selector lama ternyata dipakai halaman lain, **jangan mengubahnya secara global**.

Lebih aman gunakan selector baru yang diawali:

```text
.chronicles-
.faction-
.lore-
```

dan pastikan hanya digunakan untuk About.

---

# 2. MASALAH DESAIN SAAT INI

Desain lama menggunakan:

```text
background
    ↓
panel kecil di tengah
    ↓
judul
    ↓
3 card
    ↓
footer
```

Hasilnya terlihat seperti:

> website landing page yang dimasukkan ke dalam game.

Itu yang harus dihilangkan.

JANGAN membuat lagi:

```css
max-width: 780px;
margin: auto;
```

sebagai panel utama.

JANGAN membuat satu `.lore-panel` besar yang menampung seluruh halaman.

---

# 3. KONSEP BARU

Gunakan konsep:

# FULLSCREEN CHRONICLES COMMAND SCREEN

Halaman harus memakai hampir seluruh viewport.

Header `CHRONICLES` yang sudah disediakan oleh:

```js
navHeader('CHRONICLES', 'RAGNAROK: TRINITY')
```

harus tetap berada di tempatnya.

Jangan menabrak header.

Konten About dimulai di bawah area header.

---

# 4. KOMPOSISI LAYAR

Desktop ideal:

```text
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│ CHRONICLES                                      RAGNAROK: TRINITY    │
│                                                                     │
│                                                                     │
│   ARCHIVE 001                                  ┌────────┐ ┌────────┐│
│   ────────                                     │        │ │        ││
│                                                │ 01     │ │ 02     ││
│   TIGA FRAKSI.                                │        │ │        ││
│   SATU TAKDIR.                                 │ DIVINE │ │FANTASY ││
│                                                │        │ │        ││
│   Ketika tiga dunia bertabrakan,               │  lore  │ │  lore  ││
│   arena menjadi tempat terakhir                │        │ │        ││
│   untuk menentukan siapa yang                  └────────┘ └────────┘│
│   pantas berdiri.                                      ┌────────┐   │
│                                                        │ 03     │   │
│                                                        │ MORTAL  │   │
│                                                        └────────┘   │
│                                                                     │
│  ● ARCHIVE ONLINE              03  13  ∞          [ RETURN ]       │
└─────────────────────────────────────────────────────────────────────┘
```

Tetapi **jangan terpaku pada gambar ASCII di atas**.

Yang penting adalah rasa:

- asymmetric
- cinematic
- spacious
- game UI
- tidak simetris seperti website corporate
- memiliki depth

---

# 5. HERO AREA

Sisi kiri digunakan untuk lore introduction.

Gunakan:

```text
ARSIP DUNIA · 001
```

kemudian:

```text
TIGA FRAKSI.
SATU TAKDIR.
```

Buat sangat besar.

Contoh:

```text
TIGA FRAKSI.
SATU TAKDIR.
```

`TIGA FRAKSI.` berwarna putih.

`SATU TAKDIR.` menggunakan:

```css
var(--ui-color)
```

Headline harus menggunakan font:

```css
font-family: 'Chaos', serif;
```

Ukuran desktop sekitar:

```css
clamp(52px, 5.5vw, 96px)
```

Tetapi jangan sampai keluar layar.

---

# 6. HERO DECORATION

Di sekitar hero tambahkan elemen dekoratif:

```text
01
ARCHIVE
────────────
```

atau:

```text
TRINITY
SYSTEM / 001
```

Boleh menggunakan:

- garis horizontal
- nomor besar transparan
- bracket
- corner marks
- tiny labels
- diagonal line
- technical markings

Semua harus subtle.

Jangan membuat seperti sci-fi dashboard berlebihan.

---

# 7. BACKGROUND

Gunakan:

```html
<div class="home-art dim blur-bg"></div>
```

sebagai background dasar.

Background harus:

```css
filter:
  blur(8px)
  brightness(.20)
  saturate(1.25);

transform: scale(1.08);
```

Tambahkan overlay cinematic.

Contoh:

```css
background:
  radial-gradient(
    circle at 75% 45%,
    color-mix(
      in srgb,
      var(--ui-color) 12%,
      transparent
    ),
    transparent 32%
  ),
  linear-gradient(
    90deg,
    rgba(2,7,12,.98),
    rgba(4,12,19,.88),
    rgba(2,7,12,.97)
  );
```

Tambahkan:

### Vignette

Sisi layar lebih gelap.

### Grid

Grid sangat tipis.

### Scanline

Sangat subtle.

### Noise

Boleh menggunakan pseudo-element.

Semua harus hampir tidak terasa.

Tujuannya:

> memberikan depth, bukan membuat background ramai.

---

# 8. FRACTION CARDS — JANGAN CARD BIASA

Ini bagian paling penting.

Jangan membuat tiga card kecil biasa seperti:

```text
┌─────────┐
│  ICON   │
│ DIVINE  │
│ TEXT    │
└─────────┘
```

Buat seperti **character/faction dossier**.

Setiap faction card harus memiliki:

```text
01
DIVINE

DEWA · PETIR · PENGHAKIMAN

[ lore ]

KEKUATAN LANGIT
```

Gunakan:

- nomor besar
- icon
- label kecil
- title besar
- description
- footer
- border angular

---

# 9. CARD COMPOSITION

Card boleh memiliki layout yang berbeda.

Contoh:

DIVINE:

```text
01
             ⚡

DIVINE
DEWA · PETIR

────────────

lore text

────────────

KEKUATAN LANGIT
```

FANTASY:

```text
02

✦

FANTASY
SIHIR · MISTIS

lore

MISTICAL POWER
```

MORTAL:

```text
03

⚔

MORTAL
MANUSIA · TEKAD

lore

HUMAN WILL
```

Tidak harus benar-benar berbeda struktur, tetapi gunakan detail visual supaya ketiga faction terasa memiliki identitas.

---

# 10. DIVINE

Label:

```text
DEWA · PETIR · PENGHAKIMAN
```

Nama:

```text
DIVINE
```

Deskripsi:

```text
Para dewa dan entitas suci yang berdiri di atas kehendak manusia.
Mereka membawa kekuatan langit, petir, dan penghakiman ilahi
ke dalam arena.
```

Footer:

```text
KEKUATAN LANGIT
01 / 03
```

Icon:

Lightning / thunder.

---

# 11. FANTASY

Label:

```text
SIHIR · MISTIS · LEGENDA
```

Nama:

```text
FANTASY
```

Deskripsi:

```text
Makhluk yang lahir dari legenda dan sihir kuno. Mereka menguasai
elemen, perubahan wujud, serta ilmu gaib yang tidak dapat
dijelaskan oleh dunia manusia.
```

Footer:

```text
KEKUATAN MISTIS
02 / 03
```

Icon:

Magic star / mystical symbol.

---

# 12. MORTAL

Label:

```text
MANUSIA · BELA DIRI · TEKAD
```

Nama:

```text
MORTAL
```

Deskripsi:

```text
Manusia yang tidak memiliki kekuatan ilahi maupun sihir kuno.
Hanya teknik, keberanian, dan tekad untuk terus berdiri
ketika dunia menuntut mereka menyerah.
```

Footer:

```text
KEKUATAN MANUSIA
03 / 03
```

Icon:

Martial arts / combat.

---

# 13. CARD VISUAL

Gunakan:

```css
clip-path
```

untuk membuat sudut:

```text
╲─────────────
│
│
│
─────────────╱
```

Jangan menggunakan border-radius besar.

Boleh:

```css
border-radius: 0;
```

atau sangat kecil.

Gunakan background:

```css
linear-gradient(...)
```

dengan opacity.

Gunakan:

```css
backdrop-filter: blur(...)
```

jika sesuai.

Tetapi jangan membuat glassmorphism terlalu kuat.

---

# 14. CARD HOVER

Saat mouse masuk:

Card harus:

```text
naik sedikit
lebih terang
border menjadi accent
glow tipis
```

Contoh:

```css
transform: translateY(-8px) scale(1.01);
```

Border:

```css
border-color:
  color-mix(
    in srgb,
    var(--ui-color) 75%,
    transparent
  );
```

Glow:

```css
box-shadow:
  0 20px 50px rgba(0,0,0,.45),
  0 0 30px
  color-mix(
    in srgb,
    var(--ui-color) 10%,
    transparent
  );
```

Jangan glow seperti neon cyberpunk.

---

# 15. NOMOR BESAR

Setiap faction memiliki nomor:

```text
01
02
03
```

Nomor bisa dibuat semi-transparent besar di belakang card.

Contoh:

```css
opacity: .12;
font-size: 80px;
```

Ini membuat card terasa seperti dossier / character profile.

---

# 16. BOTTOM HUD

Jangan menggunakan footer website.

Gunakan HUD.

Kiri:

```text
● ARCHIVE ONLINE
────────────────
3 FRAKSI TERIDENTIFIKASI
```

Tengah:

```text
03       13       ∞
FRAKSI   PETARUNG RIVALITAS
```

Kanan:

```text
[ ↪ KEMBALI KE MAIN MENU ]
```

Button tetap menggunakan:

```html
data-cmd="home"
```

Supaya logic back yang sudah ada tetap berjalan.

---

# 17. BUTTON

Button harus terasa seperti tombol game.

Bukan:

```text
rounded website button
```

Gunakan:

- rectangular
- angular corner
- thin border
- accent fill saat hover
- arrow/icon
- uppercase
- letter spacing

Normal:

```text
dark background
accent border
accent text
```

Hover:

```text
accent background
dark text
```

---

# 18. ANIMATION

Saat About dibuka:

### Background

Fade in.

### Hero

Masuk dari kiri:

```css
transform: translateX(-40px);
opacity: 0;
```

menjadi normal.

### Faction 1

Muncul lebih dulu.

### Faction 2

Delay sedikit.

### Faction 3

Delay sedikit lagi.

Contoh:

```text
DIVINE  .10s
FANTASY .18s
MORTAL  .26s
```

### Bottom HUD

Muncul terakhir.

Gunakan:

```css
cubic-bezier(.16,1,.3,1)
```

Jangan membuat animasi terlalu cepat.

Jangan membuat looping animation besar.

---

# 19. FULLSCREEN

Desktop harus benar-benar menggunakan viewport.

Gunakan:

```css
position: absolute;
inset: 0;
```

atau struktur equivalent yang sudah kompatibel dengan menu system.

Jangan:

```css
max-width: 780px;
margin: auto;
```

untuk container utama.

Jangan membuat panel besar di tengah.

---

# 20. HEADER SAFETY

Header:

```js
navHeader('CHRONICLES', 'RAGNAROK: TRINITY')
```

tetap dipakai.

Jangan menimpa:

```text
CHRONICLES
```

di pojok kiri atas.

Content hero harus mulai di bawah area header.

Gunakan spacing seperti:

```css
top: 15vh;
```

atau layout equivalent.

---

# 21. RESPONSIVE

Desktop:

```text
> 1100px
```

Gunakan layout asymmetric.

Tablet:

```text
801px - 1100px
```

Kurangi:

- font size
- card height
- gap
- padding

Mobile:

```text
<= 800px
```

Ubah menjadi:

```text
INTRO
↓
DIVINE
↓
FANTASY
↓
MORTAL
↓
STATS
↓
BACK BUTTON
```

Gunakan scroll vertical.

Tidak boleh ada horizontal overflow.

---

# 22. CSS VARIABLE

WAJIB menggunakan:

```css
var(--ui-color)
```

Jangan hanya menggunakan:

```css
#e8b94a
```

Accent harus adaptif.

Boleh mendefinisikan fallback:

```css
.chronicles-screen {
  --ui-color: var(--accent, #e8b94a);
}
```

Setelah itu gunakan:

```css
var(--ui-color)
```

untuk seluruh accent.

---

# 23. CLASS YANG DISARANKAN

Gunakan namespace khusus:

```text
.chronicles-screen
.chronicles-grid
.chronicles-noise
.chronicles-intro
.chronicles-kicker
.chronicles-line
.chronicles-caption

.faction-stage
.faction-card
.faction-divine
.faction-fantasy
.faction-mortal
.faction-index
.faction-icon
.faction-content
.faction-type
.faction-footer

.chronicles-bottom
.chronicles-status
.status-dot
.chronicles-stats

.lore-btn
```

Namespace ini penting agar CSS tidak bocor ke halaman lain.

---

# 24. PSEUDO ELEMENT

Boleh gunakan:

```css
.chronicles-screen::before
.chronicles-screen::after
```

untuk:

- vignette
- light sweep
- atmospheric overlay

Boleh juga:

```css
.faction-card::before
.faction-card::after
```

untuk:

- top accent line
- glow
- decorative geometry

Jangan menambahkan elemen HTML hanya untuk dekorasi jika pseudo-element sudah cukup.

---

# 25. TYPOGRAPHY

Headline:

```css
font-family: 'Chaos', serif;
```

Untuk UI:

gunakan font existing dari `menu.css`.

Jangan import font eksternal.

Jangan menggunakan Google Fonts.

Heading harus:

```text
besar
berani
condensed
agresif
```

UI label harus:

```text
uppercase
letter-spacing
small
technical
```

---

# 26. IMPORTANT — JANGAN BERLEBIHAN

Desain harus terlihat mahal karena:

```text
spacing
typography
hierarchy
contrast
geometry
motion
```

bukan karena:

```text
glow everywhere
gradient everywhere
animation everywhere
```

Hindari:

- neon berlebihan
- rainbow
- terlalu banyak shadow
- rounded card
- background putih
- dashboard SaaS
- layout corporate
- panel tengah
- terlalu banyak teks

---

# 27. KODE HTML TARGET

Berikut struktur dasar yang boleh digunakan sebagai basis implementasi:

```js
} else if (screen === 'about') {
  root.innerHTML = `
    <div class="home-art dim blur-bg"></div>

    ${navHeader('CHRONICLES', 'RAGNAROK: TRINITY')}

    <main class="chronicles-screen">

      <div class="chronicles-grid"></div>
      <div class="chronicles-noise"></div>

      <div class="chronicles-intro">

        <span class="chronicles-kicker">
          ARSIP DUNIA · 001
        </span>

        <div class="chronicles-line"></div>

        <h2>
          TIGA FRAKSI.
          <strong>SATU TAKDIR.</strong>
        </h2>

        <p>
          Ketika tiga kekuatan dunia bertabrakan, hanya satu tempat
          yang mampu menampung kehendak mereka: arena.
        </p>

        <span class="chronicles-caption">
          KISAH TIGA DUNIA · RAGNAROK: TRINITY
        </span>

      </div>


      <section class="faction-stage">

        <article class="faction-card faction-divine">
          <div class="faction-index">01</div>

          <div class="faction-icon">
            <!-- SVG PETIR -->
          </div>

          <div class="faction-content">
            <span class="faction-type">
              DEWA · PETIR · PENGHAKIMAN
            </span>

            <h3>DIVINE</h3>

            <p>
              Para dewa dan entitas suci yang berdiri di atas
              kehendak manusia. Mereka membawa kekuatan langit,
              petir, dan penghakiman ilahi ke dalam arena.
            </p>
          </div>

          <div class="faction-footer">
            <span>KEKUATAN LANGIT</span>
            <b>01 / 03</b>
          </div>
        </article>


        <article class="faction-card faction-fantasy">
          <div class="faction-index">02</div>

          <div class="faction-icon">
            <!-- SVG MISTIS -->
          </div>

          <div class="faction-content">
            <span class="faction-type">
              SIHIR · MISTIS · LEGENDA
            </span>

            <h3>FANTASY</h3>

            <p>
              Makhluk yang lahir dari legenda dan sihir kuno.
              Mereka menguasai elemen, perubahan wujud, serta
              ilmu gaib yang tidak dapat dijelaskan oleh dunia manusia.
            </p>
          </div>

          <div class="faction-footer">
            <span>KEKUATAN MISTIS</span>
            <b>02 / 03</b>
          </div>
        </article>


        <article class="faction-card faction-mortal">
          <div class="faction-index">03</div>

          <div class="faction-icon">
            <!-- SVG BELA DIRI -->
          </div>

          <div class="faction-content">
            <span class="faction-type">
              MANUSIA · BELA DIRI · TEKAD
            </span>

            <h3>MORTAL</h3>

            <p>
              Manusia yang tidak memiliki kekuatan ilahi maupun
              sihir kuno. Hanya teknik, keberanian, dan tekad
              untuk terus berdiri ketika dunia menuntut mereka menyerah.
            </p>
          </div>

          <div class="faction-footer">
            <span>KEKUATAN MANUSIA</span>
            <b>03 / 03</b>
          </div>
        </article>

      </section>


      <div class="chronicles-bottom">

        <div class="chronicles-status">
          <span class="status-dot"></span>
          <span>ARCHIVE ONLINE</span>
          <i></i>
          <span>3 FRAKSI TERIDENTIFIKASI</span>
        </div>

        <div class="chronicles-stats">

          <div>
            <b>03</b>
            <span>FRAKSI</span>
          </div>

          <div>
            <b>13</b>
            <span>PETARUNG</span>
          </div>

          <div>
            <b>∞</b>
            <span>RIVALITAS</span>
          </div>

        </div>

        <button class="lore-btn" data-cmd="home">
          KEMBALI KE MAIN MENU
        </button>

      </div>

    </main>
  `;
}
```

---

# 28. TARGET AKHIR

Setelah implementasi, ketika user masuk ke:

```text
Tentang / Chronicles
```

hasilnya harus terasa seperti:

```text
RAGNAROK: TRINITY
WORLD LORE DATABASE
```

yang berada di dalam game.

Bukan:

```text
website about page
```

Visual hierarchy yang diinginkan:

```text
BACKGROUND
    ↓
CHRONICLES HEADER
    ↓
GIANT TITLE
    ↓
THREE FACTION DOSSIERS
    ↓
TACTICAL HUD
```

Keseluruhan layar harus terasa:

```text
DARK
PREMIUM
AGGRESSIVE
CINEMATIC
FUTURISTIC
CLEAN
SPACIOUS
FIGHTING GAME
```

---

# 29. IMPLEMENTATION CHECKLIST

Sebelum selesai, pastikan:

- [ ] Hanya `menu.js` blok `screen === 'about'` yang diubah.
- [ ] Hanya CSS yang berhubungan dengan About / Chronicles yang diubah di `menu.css`.
- [ ] `style.css` tidak disentuh.
- [ ] Tidak ada panel utama kecil di tengah.
- [ ] About memakai fullscreen.
- [ ] Header `CHRONICLES` tetap aman.
- [ ] Background game tetap digunakan.
- [ ] Hero title besar.
- [ ] Tiga faction terlihat jelas.
- [ ] DIVINE menggunakan tema petir/dewa.
- [ ] FANTASY menggunakan tema sihir/mistis.
- [ ] MORTAL menggunakan tema manusia/bela diri.
- [ ] Bahasa Indonesia untuk lore.
- [ ] `var(--ui-color)` digunakan sebagai accent.
- [ ] Hover card terlihat premium.
- [ ] Animasi masuk halus.
- [ ] Tidak ada horizontal overflow.
- [ ] Mobile tetap usable.
- [ ] Tombol `data-cmd="home"` tetap berfungsi.
- [ ] Tidak mengubah game logic.
- [ ] Tidak merusak screen lain.

---

# 30. PRIORITAS

Jika harus memilih antara banyak dekorasi atau layout yang bagus:

**Pilih layout.**

Jika harus memilih antara banyak animasi atau typography yang kuat:

**Pilih typography.**

Jika harus memilih antara banyak glow atau hierarchy:

**Pilih hierarchy.**

Target utama:

> **"Saat halaman Chronicles dibuka, user harus merasa sedang masuk ke arsip dunia sebuah fighting game, bukan membuka halaman About sebuah website."**
