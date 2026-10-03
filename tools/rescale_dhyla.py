import pathlib, json
from PIL import Image

run_dir = pathlib.Path(r'c:\Users\ACER\Downloads\aether-clash-main\assets\dhyla\run')
png_path = run_dir / 'sprite-sheet-alpha.png'
webp_path = run_dir / 'sprite-sheet-alpha.webp'
json_path = run_dir / 'manifest.json'

# Load original manifest with ORIGINAL dimensions (before any scaling)
# Original was 448x512 per cell, we need to go to ~280x180 range to match other chars
# Target: roughly match Yanfah height proportionally
# Yanfah cell = 448x288, we want Dhyla to be similar height onscreen
# Currently Dhyla cell = 280x320 (0.625 of 448x512)
# Let's rescale to 0.4 of original = 179x205

scale = 0.4

img = Image.open(png_path)
orig_w, orig_h = img.width, img.height
# Original size was 1792x7680 (448x512 x 4cols x 15rows)
# After 0.625 scale: 1120x4800
# We need to go from current 1120x4800 back to original and re-apply 0.4 scale
orig_size = (1792, 7680)
new_size = (int(orig_size[0] * scale), int(orig_size[1] * scale))

img_orig = Image.open(png_path).resize((orig_size[0], orig_size[1]), Image.Resampling.BICUBIC)
img_resized = img_orig.resize(new_size, Image.Resampling.BICUBIC)
img_resized.save(webp_path, format='WEBP', lossless=True)
print(f'Resized to {new_size}')

# Update manifest
data = json.loads(json_path.read_text(encoding='utf-8'))

cw = int(448 * scale)
ch = int(512 * scale)
data['cell']['width'] = cw
data['cell']['height'] = ch
data['cell']['safe_margin_x'] = max(2, int(10 * scale))
data['cell']['safe_margin_y'] = max(2, int(8 * scale))

layout = data['frame_layout']
layout['sheetWidth'] = new_size[0]
layout['sheetHeight'] = new_size[1]
layout['cellWidth'] = cw
layout['cellHeight'] = ch

for action, frames in layout.get('rows', {}).items():
    for i, f in enumerate(frames):
        col = i % 4
        row_idx = list(layout['rows'].keys()).index(action)
        f['x'] = col * cw
        f['y'] = row_idx * ch
        f['w'] = cw
        f['h'] = ch

json_path.write_text(json.dumps(data, indent=2), encoding='utf-8')

# Rebuild manifest.js
p_mjs = pathlib.Path(r'c:\Users\ACER\Downloads\aether-clash-main\assets\dhyla\manifest.js')
js = 'window.DHYLA_MANIFEST = ' + json.dumps(data, indent=2) + ';\n'
js += '\nwindow.DHYLA_METRICS = window.DHYLA_MANIFEST;\n'
p_mjs.write_text(js, encoding='utf-8')

p_run_mjs = run_dir / 'manifest.js'
p_run_mjs.write_text(js, encoding='utf-8')

print(f'Cell: {cw}x{ch}')
print('Done')
