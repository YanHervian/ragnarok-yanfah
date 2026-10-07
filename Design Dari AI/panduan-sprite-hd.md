# Panduan: Sprite HD (non-pixel) dengan sprite-gen, tanpa burik

Untuk karakter berambut biru, jaket putih, dan katana. Ditulis berdasarkan gambar yang kamu kirim dan dokumentasi resmi sprite-gen (`docs/pixel-unfake.md`, `docs/chroma-alpha.md`, `SKILL.md`).

> Catatan kejujuran: perintahmu memakai flag `--chroma-adjacent-pixel-threshold`. Flag itu tidak muncul di dokumentasi sprite-gen yang saya baca, jadi mungkin itu kustom di engine-mu. Saya tidak bisa memastikan efeknya. Flag yang terdokumentasi ada di bagian 5.

---

## 1. Diagnosis singkat

| Gejala | Penyebab | Bukti |
|---|---|---|
| Tepi pink/ungu, kotor | Gambar dikecilkan **saat magenta masih menempel** (LANCZOS mencampur piksel karakter dan magenta) | Semburat ungu di tepi rambut/jaket pada gambar mentah |
| Tepi bergerigi, garis putus | `NEAREST` hanya mengambil 1 dari 16 piksel pada skala 0.25 | Katana, tali, helai rambut putus-putus |
| Detail hilang (jaket, sepatu, wajah) | Skala 0.25 terlalu kecil: karakter hanya ±160 px di sel setinggi 288 | Gambar mentah ±650 px per karakter |
| Terlihat "campur aduk" | Gaya ilustrasi halus dipaksa jadi gaya pixel | Mode pixel tidak cocok untuk gambar painting |

Kesimpulan: ini masalah **urutan proses dan skala**, bukan salah satu algoritma resize.

---

## 2. Pilih satu gaya: HD (tanpa pixel)

Di sprite-gen, mode pixel adalah **opt-in**. Di `docs/pixel-unfake.md`: objek `fit` bersifat opt-in, dan kalau tidak ada artinya perilaku legacy (resample `lanczos`). Jadi untuk HD:

- **Jangan** pakai `--fit-pixel-unfake`, `--fit-logical-height`, `--fit-palette-size`, atau `fit.pixel_unfake` di request.
- **Jangan** pakai `resample: kcentroid` atau `nearest`.
- Pakai `lanczos`, dengan `align_x: foot-centroid` dan `align_y: bottom`.

```json
"fit": { "resample": "lanczos", "align_x": "foot-centroid", "align_y": "bottom" }
```

Atau lewat CLI `prepare_sprite_run.py`:

```
--fit-resample lanczos --fit-align-x foot-centroid --fit-align-y bottom
```

Dokumentasi juga menegaskan bahwa **gambar dasar adalah sumber gaya**. Jangan tulis ulang gaya lewat teks prompt. Kalau mau gaya lain, buat ulang gambar dasarnya. Cek juga file prompt di `<run>/`: kalau ada kalimat seperti "TRUE NxN pixel grid", hapus untuk gaya HD (ini saran saya, belum bisa saya verifikasi di engine-mu).

---

## 3. Alur lengkap (urutan tidak boleh dibalik)

```
gambar mentah (magenta, resolusi penuh)
   |  1. key magenta -> alpha lembut + despill   (resolusi PENUH)
   |  2. pisah frame
   |  3. kecilkan, premultiplied alpha, LANCZOS
   |  4. un-premultiply, pertegas alpha sedikit
   |  5. taruh di sel: kaki sejajar, dasar sama
   v
frame HD transparan -> atlas -> manifest
```

**Aturan emas:** jangan kecilkan gambar yang masih berlatar magenta. Jangan juga pre-resize dengan skrip sendiri lalu menyuapkan hasilnya ke ekstraktor. Beri ekstraktor gambar mentah penuh, biar ia yang memasukkan ke sel.

### Skrip siap pakai

File `hd_sprite_resize.py` (terlampir bersama panduan ini). Sudah saya uji pada `idle.png`-mu (1975x796, 4 frame): tidak ada piksel magenta tersisa dan tepinya halus di latar putih maupun gelap.

```
python hd_sprite_resize.py idle.png --frames 4 --cell 448x288 --margin 10x8 --out out/idle
```

Untuk state lain, **pakai skala yang sama** supaya ukuran karakter konsisten:

```
python hd_sprite_resize.py attack.png --frames 4 --scale 0.38 --out out/attack
```

Skrip akan memberi peringatan kalau skala melebihi batas muat sel.

---

## 4. Skala: berapa yang tepat

- `idle.png`-mu: karakter ±650 px. Sel 448x288 dengan margin 10x8 punya tinggi dalam 272 px, jadi **skala maksimal idle = 0.415** (hasil hitungan skrip).
- State dengan katana terangkat atau pose melebar butuh ruang lebih. Ambil **satu skala** yang muat untuk pose terbesar, kira-kira **0.35-0.40**, lalu pakai untuk semua state.
- Dengan 0.38, tinggi karakter sekitar 247 px, sekitar 2,3 kali lebih banyak piksel (luas) dibanding skala 0.25.
- Mau lebih tajam lagi? Perbesar sel (mis. 640x400) lalu tampilkan di game dengan skala turun. Ini lebih bagus daripada memadatkan karakter ke sel kecil.

---

## 5. Pengaturan chroma di sprite-gen (terdokumentasi)

- **Warna kunci:** untuk karakter berwarna putih, biru muda, dan cyan, **magenta aman** (jaraknya jauh dari warna karakter). Dokumentasi menyarankan hindari kunci cyan/biru untuk subjek biru. Kalau ragu, pakai `--chroma-key auto`.
- **Mode matte:** default `rgb` sudah memakai unmix lembut (alpha parsial + warna tepi dibersihkan). `--chroma-mode ycbcr` hanya untuk sumber yang rusak (latar bergradasi atau noise JPEG), bukan peningkatan umum.
- **`--decontam auto`:** mengembalikan warna tepi dari palet karakter sendiri, jadi semburat ungu di tepi rambut hilang. Default-nya `off` di semua entry point. Dokumentasi mengukur kontaminasi tepi turun dari ±22% menjadi ±0,03% pada set uji (kunci hijau). Pada magenta, dokumentasi menyebut baru diuji dengan tes sintetis, jadi **periksa hasilnya**.
- **Parameter yang bisa disetel:** `--key-threshold` (default 96), `--fringe-key-threshold`, `--fringe-unmix-reach` (default 4), `--spill-max-fraction` (default 0.005). Nilai efektif dicatat di `sprite-request.json`.

Contoh:

```
python scripts/extract_sprite_row_frames.py --run-dir assets/ramuru/run --decontam auto
```

Kalau `--chroma-adjacent-pixel-threshold 150` memang flag kustom milikmu dan tepi jaket putih atau rambut ikut terkikis, coba turunkan ke 60-80 sebagai percobaan.

---

## 6. Tampilkan di game dengan benar

Gaya HD akan rusak lagi kalau game menampilkan sprite dengan filter pixel:

- Pakai **filter linear** (smooth), bukan nearest.
- Phaser: `pixelArt: false`, `antialias: true`.
- Godot: Texture Filter = Linear (nyalakan mipmaps kalau sprite ditampilkan lebih kecil dari ukuran atlas).
- Unity: Filter Mode = Bilinear, Compression None atau High Quality, aktifkan Generate Mip Maps.
- Hindari posisi sub-piksel yang membuat gambar bergetar; atur `roundPixels` sesuai kebutuhan.

---

## 7. Alternatif: jalur video (gerakan lebih halus)

sprite-gen punya jalur video: satu gambar diubah menjadi loop transparan per state (GIF/WebP/strip) lewat Grok Imagine. Syaratnya `ffmpeg`, `img2webp`, dan login `grok` atau `XAI_API_KEY` milikmu sendiri.

```
sprite-gen video-set --base side=still.png --states idle,walk,run,jump,attack --out-dir set/
```

Gerakan lebih mengalir, tapi karakter kurang terkunci identitasnya dibanding jalur atlas.

---

## 8. Checklist sebelum menyimpan hasil

1. Tidak ada `fit.pixel_unfake` di `sprite-request.json`.
2. Gambar mentah **tidak** di-resize sebelum diekstrak.
3. Satu skala untuk semua state, tidak ada frame terpotong.
4. Tempel satu frame di latar putih **dan** latar gelap. Pastikan tidak ada halo pink/ungu.
5. Katana, tali, helai rambut tetap menyambung.
6. Wajah dan warna sama di semua frame. Kalau tidak, ulang baris itu lewat curation.
7. Game memakai filter linear.

---

## 9. Kalau masih burik

Kirim: (a) satu frame hasil ekstrak (crop 448x288, bukan screenshot atlas), (b) isi `sprite-request.json`, (c) skala yang kamu pakai. Dari situ bisa dipastikan apakah masalahnya di keying, skala, atau tampilan di game.
