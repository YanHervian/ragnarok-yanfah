import os

guide1 = r"guide\panduan membuat karakter\Panduan_Membuat_Karakter_Lengkap.md"
with open(guide1, "r", encoding="utf-8") as f:
    text1 = f.read()

# 1. Update the [nama].js template
if "scaleOverrides:" not in text1:
    vfx_block_old = "const vfx = {\n    /**\n     * KONFIGURASI EFEK VISUAL"
    vfx_block_new = """const vfx = {
    // scaleOverrides digunakan untuk mengatur ukuran animasi (sprite) di dalam game
    // tanpa mengubah gambar asli. 1.0 = normal, 1.5 = 50% lebih besar, dll.
    scaleOverrides: {
      // jump: 1.2,
      // run: 1.05
    },
    /**
     * KONFIGURASI EFEK VISUAL"""
    text1 = text1.replace(vfx_block_old, vfx_block_new)

# 2. Add explanation to the VFX section
if "`scaleOverrides`" not in text1:
    vfx_explanation_old = "| `slamY` | number | Geser atas-bawah slam dari garis tanah. Negatif = lebih tinggi dari tanah |"
    vfx_explanation_new = vfx_explanation_old + """

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
Angka `1.0` adalah ukuran normal (sesuai `metrics.scale` di `manifest.js`)."""
    text1 = text1.replace(vfx_explanation_old, vfx_explanation_new)

with open(guide1, "w", encoding="utf-8") as f:
    f.write(text1)

print("Panduan Updated!")
