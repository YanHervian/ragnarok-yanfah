from PIL import Image
import os

# Get original size of idle
raw_orig_path = 'assets/ramuru/run/raw-original/idle.png'
if os.path.exists(raw_orig_path):
    orig = Image.open(raw_orig_path)
    orig_w, orig_h = orig.size
    scale = 0.25
    new_w = int(orig_w * scale)
    new_h = int(orig_h * scale)
    print(f"INFO UNTUK AI: Original size = {orig_w}x{orig_h}. Scale = {scale}. new_w = {new_w}, new_h = {new_h}")
else:
    print("Idle raw original not found.")

# Crop the first 448x288 cell from atlas
atlas_path = 'assets/ramuru/run/sprite-sheet-alpha.png'
if os.path.exists(atlas_path):
    atlas = Image.open(atlas_path)
    # Cell is 448x288
    cell = atlas.crop((0, 0, 448, 288))
    out_path = 'assets/ramuru/run/frame_untuk_ai.png'
    cell.save(out_path)
    print(f"File frame_untuk_ai.png berhasil dibuat di: {os.path.abspath(out_path)}")
else:
    print("Atlas not found.")
