# Panduan Lengkap: Membuat Sprite Sheet AI yang Benar (Standar Yanfah)

Panduan ini mendokumentasikan proses, masalah, dan solusi yang kita lalui saat mengintegrasikan karakter AI baru (seperti **Dhyla**) agar 100% kompatibel dengan standar ukuran karakter bawaan (seperti **Yanfah**). 

Tujuannya agar jika kamu membuat karakter baru lagi di masa depan, kamu tidak perlu mengulangi *error* yang sama (karakter terpotong, kebesaran, atau kekecilan).

---

## ⚠️ 1. Akar Masalah (Mengapa Sprite Bisa Rusak/Terpotong?)

Saat kamu men-generate karakter dengan AI dan menaruhnya di folder `raw-original`, ukuran **resolusi kanvasnya** mungkin sama persis dengan Yanfah (contoh: 2135x736). 

Namun, **ukuran proporsi karakter yang digambar AI di dalam kanvas itu berbeda**:
*   **Yanfah**: Digambar cukup kecil di tengah kanvas (tinggi karakter asli hanya sekitar **175 pixel**).
*   **Karakter AI (Dhyla)**: Digambar sangat besar dari atas sampai bawah (tinggi karakter bisa mencapai **735 pixel**).

Sistem `extract_sprite_row_frames.py` kita **tidak mengecilkan** karakter secara otomatis. Sistem mencoba mengambil karakter raksasa tersebut dan memasukkannya ke dalam kotak sel (grid) standar berukuran `448x288`. Karena 735 jauh lebih besar dari 288, maka bagian atas (topi/kepala) dan bawah kaki **terpotong paksa**.

## ❌ 2. Solusi yang Salah (Jangan Lakukan Ini)
Pada awalnya, kita mencoba memperbesar batas `cellHeight` di `sprite-request.json` menjadi `512` agar tidak terpotong, lalu mengecilkan *hasil akhir atlas-nya* dengan skrip (`rescale_dhyla.py`). 

**Kenapa ini salah?**
Ini membuat ukuran grid sel di `manifest.js` menjadi aneh (contoh: `179x204`) dan ukuran total *sprite sheet* tidak sama dengan standar game (`1792x4320`). Hasilnya, karakter terlihat kecil, padding (ruang kosong) menjadi sempit, dan sulit disesuaikan.

## ✅ 3. Solusi Terbaik: Mengecilkan Gambar di "raw-original"

Cara yang 100% benar adalah: **Buat karakter di dalam kanvas asli menjadi sekecil Yanfah (sekitar 25% dari ukurannya)** *sebelum* diekstrak oleh sistem pembuat sprite.

Langkah-langkah kerjanya:

### A. Siapkan Folder
1. Taruh semua hasil *generate* AI yang masih besar di folder `assets/[nama_karakter]/run/raw-original/`.
2. Biarkan folder `assets/[nama_karakter]/run/raw/` kosong (kita akan mengisinya otomatis).

### B. Jalankan Skrip Pre-Processing (Pengecilan Skala)
Gunakan skrip Python di bawah ini untuk menghapus background magenta AI yang kotor, mengecilkan ukuran karakternya saja, lalu menaruhnya kembali di tengah kanvas magenta `#FF00FF` yang bersih.

*Catatan Skala:*
*   **Normal (0.25)**: Untuk posisi berdiri/diam (`idle`, `walk`), diturunkan jadi 25%.
*   **Aksi (0.28)**: Untuk gerakan ekstrim seperti `run` (lari merunduk) atau `attack/skill/ultimate`, kita butuh karakter sedikit lebih besar dari *idle* agar di dalam game tidak terlihat kekecilan.
*   **Lompat (0.12)**: Khusus `jump` dan `doublejump` yang ukuran kanvasnya aslinya sangat menjulang (contoh: 1339px), harus dikecilkan lebih ekstrem agar saat masuk ke kotak `288px` ia tidak menyundul atap.

```python
# Simpan sebagai resize_ai_character.py dan jalankan
import os, numpy as np
from PIL import Image

def process_image(img, scale_factor):
    img_data = np.array(img).astype(np.float32)
    bg = img_data[0,0] # Ambil warna background asli
    
    # Deteksi karakter (pisahkan dari background)
    dist = np.abs(img_data[:,:,0] - bg[0]) + np.abs(img_data[:,:,1] - bg[1]) + np.abs(img_data[:,:,2] - bg[2])
    mask = np.clip((dist - 15) / 30, 0, 1)
    
    premult = np.zeros_like(img_data)
    for i in range(3):
        premult[:,:,i] = img_data[:,:,i] * mask
    premult = np.dstack([premult, mask * 255])
    
    premult_img = Image.fromarray(np.clip(premult, 0, 255).astype(np.uint8), 'RGBA')
    
    # Kecilkan ukuran karakter
    new_w = int(img.width * scale_factor)
    new_h = int(img.height * scale_factor)
    resized_premult = premult_img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    resized_data = np.array(resized_premult).astype(np.float32)
    out_rgb = np.zeros((new_h, new_w, 3), dtype=np.uint8)
    out_mask = resized_data[:,:,3]
    for i in range(3):
        safe_mask = np.where(out_mask > 0, out_mask / 255.0, 1.0)
        out_rgb[:,:,i] = np.clip(resized_data[:,:,i] / safe_mask, 0, 255)
        
    out_rgba = Image.fromarray(np.dstack([out_rgb, out_mask.astype(np.uint8)]), 'RGBA')
    
    # Tempel di atas background magenta murni
    res = Image.new('RGB', img.size, (255, 0, 255))
    paste_x = (img.size[0] - new_w) // 2
    paste_y = (img.size[1] - new_h) // 2
    res.paste(out_rgba, (paste_x, paste_y), out_rgba)
    return res

src_dir = r'C:\Path\To\assets\[nama_karakter]\run\raw-original'
dst_dir = r'C:\Path\To\assets\[nama_karakter]\run\raw'
os.makedirs(dst_dir, exist_ok=True)

# Tentukan skala dinamis berdasarkan gerakan
for f in os.listdir(src_dir):
    if f.endswith('.png'):
        img = Image.open(os.path.join(src_dir, f)).convert('RGB')
        
        scale = 0.25  # Default
        if any(act in f for act in ['run', 'attack', 'skill', 'ultimate']):
            scale = 0.28  # Sedikit diperbesar dari default
        elif any(act in f for act in ['jump', 'doublejump']):
            scale = 0.12 # Sangat kecil karena kanvasnya tinggi
            
        print(f'Mengecilkan {f} dengan skala {scale}')
        res = process_image(img, scale)
        res.save(os.path.join(dst_dir, f))
```

### C. Ekstrak dengan Konfigurasi Bawaan Yanfah
Setelah gambar masuk ke folder `raw/` dengan ukuran proporsional yang benar:
1. Copy file `sprite-request.json` milik Yanfah ke folder karaktermu tanpa merubah sebaris pun (tetap pertahankan cell `448x288`).
2. Jalankan pipeline sprite-generator:
   ```bash
   python scripts/extract_sprite_row_frames.py --run-dir assets/[nama_karakter]/run --chroma-adjacent-pixel-threshold 150
   python scripts/compose_sprite_atlas.py --run-dir assets/[nama_karakter]/run
   ```

### D. Konversi ke WEBP dan Setting Manifest (Tahap Akhir)
1. Buka file hasil `sprite-sheet-alpha.png` dan _Save As_ menjadi `sprite-sheet-alpha.webp` (lossless).
2. Salin isi `manifest.json` yang dihasilkan ke dalam `manifest.js` dengan format JavaScript.
3. **SANGAT PENTING**: Ubah extension di dalam kode menjadi `.webp` dan pastikan ada skala render `metrics: { scale: 0.55 }` agar besarnya pas saat dimainkan di dalam web!

Contoh isi `manifest.js`:
```javascript
window.NAMAKARAKTER_MANIFEST = {
  // ... isi dari manifest.json ...
  "game_input": "sprite-sheet-alpha.webp",
  "metrics": {
    "scale": 0.55
  }
};
window.NAMAKARAKTER_METRICS = window.NAMAKARAKTER_MANIFEST;
```

---
**Kesimpulan:** Masalah utama dari pembuatan karakter AI adalah mereka **digambar terlalu besar di dalam kanvas**. Mengecilkannya (pre-scale) terlebih dahulu dengan script python di atas adalah rahasia untuk membuat ukuran mereka sejajar sempurna dengan grid 448x288 standar Aether Clash!
