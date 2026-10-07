import re
import os

guide1 = r"guide\panduan membuat karakter\Panduan_Membuat_Karakter_Lengkap.md"
with open(guide1, "r", encoding="utf-8") as f:
    text1 = f.read()

# 1. Update index.html instruction
if "Jangan lupa tambahkan `<option" not in text1:
    text1 = text1.replace(
        "**1. Daftarkan Script di `index.html` (Sebelum `</body>`):**\n```html",
        "**1. Daftarkan Script & Option di `index.html`:**\n- Tambahkan `<option value=\"[nama]\">[NAMA] - [Ras]</option>` di dalam `<select id=\"character-select\">` (Cari teks 'Karakter pemain').\n- Tambahkan script ini sebelum `</body>`:\n```html"
    )

# 2. Add UI Cutin logic entry
if "Entry 8 — Logika UI Cut-in" not in text1:
    addition = """
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
"""
    text1 = text1.replace("### AI: Buat Fungsi Ultimate", addition + "\n### AI: Buat Fungsi Ultimate")

with open(guide1, "w", encoding="utf-8") as f:
    f.write(text1)


guide2 = r"guide\panduan membuat karakter\Panduan_Sprite_Karakter_AI.md"
with open(guide2, "r", encoding="utf-8") as f:
    text2 = f.read()

# 3. Replace the python script in Sprite Guide
new_script = """```python
# Simpan sebagai resize_ai_character.py dan jalankan
import os, numpy as np
from PIL import Image
import cv2

def remove_magenta_bg_and_extract_alpha(img):
    img_cv = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)
    hsv = cv2.cvtColor(img_cv, cv2.COLOR_BGR2HSV)
    lower_magenta = np.array([140, 100, 100])
    upper_magenta = np.array([170, 255, 255])
    mask = cv2.inRange(hsv, lower_magenta, upper_magenta)
    mask = cv2.bitwise_not(mask)
    mask_blurred = cv2.GaussianBlur(mask, (3, 3), 0)
    b, g, r = cv2.split(img_cv)
    rgba = [b, g, r, mask_blurred]
    return Image.fromarray(cv2.cvtColor(cv2.merge(rgba, 4), cv2.COLOR_BGRA2RGBA))

def process_image_hd(img, scale_factor):
    img_transparent = remove_magenta_bg_and_extract_alpha(img)
    new_w = int(img_transparent.width * scale_factor)
    new_h = int(img_transparent.height * scale_factor)
    resized_transparent = img_transparent.resize((new_w, new_h), Image.Resampling.LANCZOS)
    res = Image.new('RGB', img.size, (255, 0, 255))
    paste_x = (img.size[0] - new_w) // 2
    paste_y = (img.size[1] - new_h) // 2
    res.paste(resized_transparent, (paste_x, paste_y), resized_transparent)
    return res

src_dir = r'C:\\Path\\To\\assets\\[nama_karakter]\\run\\raw-original'
dst_dir = r'C:\\Path\\To\\assets\\[nama_karakter]\\run\\raw'
os.makedirs(dst_dir, exist_ok=True)

for f in os.listdir(src_dir):
    if f.endswith('.png'):
        img = Image.open(os.path.join(src_dir, f)).convert('RGB')
        scale = 0.28 if any(act in f for act in ['run', 'attack', 'skill', 'ultimate']) else 0.12 if any(act in f for act in ['jump', 'doublejump']) else 0.25
        print(f'Mengecilkan HD: {f} dengan skala {scale}')
        process_image_hd(img, scale).save(os.path.join(dst_dir, f))
```"""

# Find the old script block
import re
text2 = re.sub(r'```python.*?```', lambda _: new_script, text2, flags=re.DOTALL)

with open(guide2, "w", encoding="utf-8") as f:
    f.write(text2)

print("Guides Updated!")
