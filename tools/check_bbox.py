from PIL import Image
import pathlib

def get_actual_bbox(run_dir_path):
    run_dir = pathlib.Path(run_dir_path)
    raw_dir = run_dir / 'raw'
    max_w = 0
    max_h = 0
    if not raw_dir.exists(): return 0, 0
    for p in raw_dir.glob('*.png'):
        try:
            img = Image.open(str(p))
            # Remove magenta chroma key
            img = img.convert("RGBA")
            data = img.getdata()
            new_data = []
            for item in data:
                # If magenta, make transparent
                if item[0] > 200 and item[1] < 50 and item[2] > 200:
                    new_data.append((255, 255, 255, 0))
                else:
                    new_data.append(item)
            img.putdata(new_data)
            bbox = img.getbbox()
            if bbox:
                w = (bbox[2] - bbox[0]) / 4
                h = bbox[3] - bbox[1]
                if w > max_w: max_w = w
                if h > max_h: max_h = h
        except Exception as e:
            pass
    return max_w, max_h

print("Yanfah max actual bbox:", get_actual_bbox(r'c:\Users\ACER\Downloads\aether-clash-main\assets\yanfah\run'))
print("Dhyla max actual bbox:", get_actual_bbox(r'c:\Users\ACER\Downloads\aether-clash-main\assets\dhyla\run'))
