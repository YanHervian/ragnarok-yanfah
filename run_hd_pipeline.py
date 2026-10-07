import os
import subprocess
import json
import shutil
from PIL import Image

base_dir = r"assets\ramuru\run"
raw_dir = os.path.join(base_dir, "raw-original")
frames_dir = os.path.join(base_dir, "frames")
hd_script = r"Design Dari AI\hd_sprite_resize.py"

# Hapus frames lama
if os.path.exists(frames_dir):
    shutil.rmtree(frames_dir)

# Kita pakai scale = 0.28 untuk SEMUA 
# (Karena jump memiliki batas muat sel 0.298, jika pakai di atas itu akan terpotong)
scale = 0.28

def get_frame_count(name):
    if name in ['jump', 'doublejump']:
        return 1
    return 4

for f in os.listdir(raw_dir):
    if f.endswith(".png"):
        pose = f.replace(".png", "")
        frames = get_frame_count(pose)
        
        # Buat output dir
        out_dir = os.path.join(frames_dir, pose)
        os.makedirs(out_dir, exist_ok=True)
        out_prefix = os.path.join(out_dir, f"00_{pose}")
        
        raw_path = os.path.join(raw_dir, f)
        
        cmd = [
            "python", hd_script,
            raw_path,
            "--frames", str(frames),
            "--scale", str(scale),
            "--out", out_prefix
        ]
        print(f"Memproses {pose} dengan {frames} frames...")
        subprocess.run(cmd, check=True)

# Setelah semua frame diekstrak, kita compose atlas
print("Membangun atlas...")
subprocess.run(["python", r".agents\skills\sprite-gen\scripts\compose_sprite_atlas.py", "--run-dir", base_dir], check=True)

# Konversi ke webp dan update manifest.js
print("Konversi ke WebP dan update manifest...")
atlas_png = os.path.join(base_dir, "sprite-sheet-alpha.png")
atlas_webp = os.path.join(base_dir, "sprite-sheet-alpha.webp")
Image.open(atlas_png).save(atlas_webp, "webp", lossless=True)

with open(os.path.join(base_dir, "manifest.json")) as f:
    manifest = json.load(f)

manifest['game_input'] = 'sprite-sheet-alpha.webp'
manifest['metrics'] = {'scale': 0.55}
manifest['frame_variant'] = 'hd'

js_content = f"window.RAMURU_MANIFEST = {json.dumps(manifest, indent=2)};\nwindow.RAMURU_METRICS = window.RAMURU_MANIFEST;"
with open(os.path.join(base_dir, "manifest.js"), "w") as f:
    f.write(js_content)
with open(r"assets\ramuru\manifest.js", "w") as f:
    f.write(js_content)

print("PIPELINE HD SELESAI!")
