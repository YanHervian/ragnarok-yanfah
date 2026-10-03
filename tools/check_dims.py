from PIL import Image
import pathlib

def get_max_dims(run_dir_path):
    run_dir = pathlib.Path(run_dir_path)
    raw_dir = run_dir / 'raw'
    max_w = 0
    max_h = 0
    if not raw_dir.exists(): return 0, 0
    for p in raw_dir.glob('*.png'):
        try:
            img = Image.open(str(p))
            # Just rough dimensions of the raw image divided by 4 frames
            w, h = img.size
            if w/4 > max_w: max_w = w/4
            if h > max_h: max_h = h
        except:
            pass
    return max_w, max_h

print("Yanfah max raw frame dim:", get_max_dims(r'c:\Users\ACER\Downloads\aether-clash-main\assets\yanfah\run'))
print("Dhyla max raw frame dim:", get_max_dims(r'c:\Users\ACER\Downloads\aether-clash-main\assets\dhyla\run'))
