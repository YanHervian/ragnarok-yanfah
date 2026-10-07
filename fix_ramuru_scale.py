import os
import subprocess

base_dir = r"assets\ramuru\run"
raw_dir = os.path.join(base_dir, "raw-original")
frames_dir = os.path.join(base_dir, "frames")
hd_script = r"Design Dari AI\hd_sprite_resize.py"

# Dictionary untuk scale yang baru
updates = {
    'attack3.png': 0.33,
    'skill1.png': 0.33,
    'down.png': 0.33
}

for f, scale in updates.items():
    pose = f.replace(".png", "")
    frames = 1 if pose in ['jump', 'doublejump'] else 4
    
    out_dir = os.path.join(frames_dir, pose)
    os.makedirs(out_dir, exist_ok=True)
    out_prefix = os.path.join(out_dir, f"00_{pose}")
    
    raw_path = os.path.join(raw_dir, f)
    
    if os.path.exists(raw_path):
        cmd = [
            "python", hd_script,
            raw_path,
            "--frames", str(frames),
            "--scale", str(scale),
            "--out", out_prefix
        ]
        print(f"Mengecilkan ulang {pose} dengan scale {scale}...")
        subprocess.run(cmd, check=True)
    else:
        print(f"Peringatan: File {raw_path} tidak ditemukan!")

# Panggil skrip pack_hd_atlas.py untuk menggabungkan ulang
print("Menggabungkan kembali atlas...")
subprocess.run(["python", "pack_hd_atlas.py"], check=True)
print("Selesai!")
