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
    
    # KUNCI AGAR TIDAK BURIK: Ganti LANCZOS menjadi NEAREST agar tepian piksel tetap tajam dan tidak bercampur magenta!
    resized_premult = premult_img.resize((new_w, new_h), Image.Resampling.NEAREST)
    
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

src_dir = r'assets\ramuru\run\raw-original'
dst_dir = r'assets\ramuru\run\raw'
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
