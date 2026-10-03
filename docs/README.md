# Docs Sprite Karakter

Kumpulan panduan untuk membuat sprite karakter 2D dari gambar AI (mis. GPT Image lewat Higgsfield)
dan memasukkannya ke game **tanpa** frame yang tiba-tiba lebih besar, badan goyang, atau buram sebelah.

Folder ini bersifat umum: salin utuh ke proyek lain, ganti contoh angka/nama sesuai karakter kamu.

## Urutan baca

| Kapan | Baca |
|---|---|
| Mau membuat karakter / gerakan baru | [sprite-pipeline.md](sprite-pipeline.md) → [sprite-prompts.md](sprite-prompts.md) |
| Sprite sudah jadi, sebelum dipakai di game | [sprite-qa.md](sprite-qa.md) |
| Ada yang aneh (frame besar, goyang, buram, background tersisa, karakter "membesar" saat kembali ke idle) | [sprite-known-issues.md](sprite-known-issues.md) |
| Memasang atlas ke engine / canvas | [sprite-runtime.md](sprite-runtime.md) |
| Membuat latar stage game fighting (satu layar, kamera diam) | [stage-background.md](stage-background.md) |
| Reaksi saat kena hit: sprite hurt/down + efek di game | [hit-reactions.md](hit-reactions.md) |

Tool pengukur & perbaikan ada di [tools/](tools/) (Python; jalankan dengan venv sprite-gen):

| Tool | Fungsi |
|---|---|
| `measure_atlas.py` | Ukur semua frame di atlas final, tandai yang melenceng |
| `measure_head_scale.py` | Skala **setiap** gerakan (termasuk serangan/skill) vs idle lewat ukuran kepala, di gambar asli |
| `register_frames.py` | Geser bulat (`--dx-only`) supaya badan tidak goyang pada pose tegak |
| `rebuild_raw.py` | Perkecil strip asli dengan koreksi skala per pose (satu kali resample); pose yang menempel juga bisa |
| `write_dx.py` | Tulis geser horizontal bulat ke `curation.json` |

## Aturan emas (hafalkan ini)

1. **Karakter dulu, sprite kemudian.** Buat dan setujui satu gambar karakter (base), simpan di kartu karakter,
   baru generate gerakan. Semua gerakan — termasuk yang ditambah belakangan — memakai *base yang sama* sebagai referensi.
2. **Skala diukur, bukan ditebak — untuk SEMUA gerakan.** AI menggambar tiap strip (bahkan tiap pose) dengan
   ukuran berbeda; strip serangan/skill sering lebih kecil walau pixel-nya sama besar. Ukur lewat kepala, samakan.
3. **Koreksi skala hanya sekali, di gambar asli.** Perkecil tiap pose langsung dari hasil generate dengan faktor
   yang sudah dikoreksi — satu kali resample. Jangan mengoreksi skala di tahap setelahnya (bikin frame buram sebelah).
4. **Setelah itu hanya boleh geser dengan angka bulat.** Geser 1 px = tanpa blur. Geser 0.5 px / scale 0.95 = blur.
5. **Sel harus cukup besar** sehingga tidak ada frame yang dikecilkan paksa agar muat.
6. **Sejajarkan badan, bukan kaki** untuk gerakan jalan/lari. Kaki memang bergerak; badan harus diam.
7. **Periksa dengan angka, di file atlas final** — bukan dengan mata, bukan di frame mentah.
8. **Di game: anchor di kaki, tanpa smoothing, posisi dibulatkan.**

## Istilah

| Istilah | Arti |
|---|---|
| Base | Satu gambar karakter full-body yang disetujui; sumber identitas |
| Strip / row | Satu gambar horizontal berisi N pose satu gerakan (idle, walk, …) |
| Raw | Strip hasil generate, sebelum dibersihkan |
| Pitch | Ukuran "pixel palsu" pada gambar AI (mis. 1 blok pixel art = 3 px asli) |
| Cell | Kotak ukuran tetap untuk tiap frame di atlas (mis. 224×208) |
| Anchor | Titik di sel tempat kaki berpijak; titik yang ditaruh di posisi karakter di game |
| Curation | File `curation.json` berisi koreksi per frame (pilih/urut/geser) tanpa mengubah file sumber |
| Atlas | Satu PNG berisi semua frame + `manifest.json` berisi koordinatnya |
