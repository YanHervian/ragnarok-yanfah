from PIL import Image
import pathlib, json

run_dir = pathlib.Path(r'c:\Users\ACER\Downloads\aether-clash-main\assets\dhyla\run')
json_path = run_dir / 'manifest.json'

# Read restored manifest (448x512 cells, 1792x7680 total)
data = json.loads(json_path.read_text(encoding='utf-8'))
rows = data['frame_layout']['rows']
state_keys = list(rows.keys())

# Load restored clean sheet from sprite-gen
sheet = Image.open(str(run_dir / 'sprite-sheet-alpha.png'))
print("Restored sheet size:", sheet.size)

# Target: match Yanfah 448x288 style
# We'll use 280x192 cells (similar to Yanfah after rescaling)
# Character will be scaled proportionally to fit WITHIN 240x168 (85% of cell)
src_cw = 448
src_ch = 512
src_cols = 4
src_rows = len(state_keys)

new_cw = 280
new_ch = 192

# Character target height = 80% of new cell height
char_target_h = int(new_ch * 0.80)

new_sheet_w = new_cw * src_cols
new_sheet_h = new_ch * src_rows
new_sheet = Image.new('RGBA', (new_sheet_w, new_sheet_h), (0, 0, 0, 0))

new_rows = {}

for row_idx, state in enumerate(state_keys):
    frames_in_state = rows[state]
    new_frames = []
    for col_idx, frame in enumerate(frames_in_state):
        # Crop original frame from clean sheet
        orig_x = col_idx * src_cw
        orig_y = row_idx * src_ch
        cell = sheet.crop((orig_x, orig_y, orig_x + src_cw, orig_y + src_ch))
        
        # Find bounding box of non-transparent pixels
        bbox = cell.getbbox()
        if bbox:
            char_region = cell.crop(bbox)
            # Scale to fit char_target_h maintaining aspect ratio
            bw, bh = char_region.size
            scale = char_target_h / bh
            char_w = int(bw * scale)
            char_h = char_target_h
            char_scaled = char_region.resize((char_w, char_h), Image.Resampling.LANCZOS)
        else:
            # Empty frame fallback
            char_scaled = Image.new('RGBA', (1, 1), (0, 0, 0, 0))
            char_w, char_h = 1, 1
        
        # Create padded cell
        new_cell = Image.new('RGBA', (new_cw, new_ch), (0, 0, 0, 0))
        # Center X, align feet to bottom (safe_margin_y = 5)
        paste_x = max(0, (new_cw - char_w) // 2)
        paste_y = new_ch - char_h - 5
        if paste_y < 0:
            paste_y = 0
        new_cell.paste(char_scaled, (paste_x, paste_y), char_scaled)
        
        # Paste into new sheet
        dst_x = col_idx * new_cw
        dst_y = row_idx * new_ch
        new_sheet.paste(new_cell, (dst_x, dst_y))
        
        new_frames.append({'x': dst_x, 'y': dst_y, 'w': new_cw, 'h': new_ch})
    
    new_rows[state] = new_frames

# Save
new_sheet.save(str(run_dir / 'sprite-sheet-alpha.webp'), format='WEBP', lossless=True)
print("Saved new sheet:", new_sheet.size)

# Update manifest with new coords
data['cell']['width'] = new_cw
data['cell']['height'] = new_ch
data['cell']['safe_margin_x'] = 6
data['cell']['safe_margin_y'] = 5

data['frame_layout']['sheetWidth'] = new_sheet_w
data['frame_layout']['sheetHeight'] = new_sheet_h
data['frame_layout']['cellWidth'] = new_cw
data['frame_layout']['cellHeight'] = new_ch
data['frame_layout']['rows'] = new_rows

json_path.write_text(json.dumps(data, indent=2), encoding='utf-8')

# Write manifest.js files
for p in [pathlib.Path(r'c:\Users\ACER\Downloads\aether-clash-main\assets\dhyla\manifest.js'),
          run_dir / 'manifest.js']:
    js = 'window.DHYLA_MANIFEST = ' + json.dumps(data, indent=2) + ';\n'
    js += '\nwindow.DHYLA_METRICS = window.DHYLA_MANIFEST;\n'
    p.write_text(js, encoding='utf-8')

print("Cell:", new_cw, "x", new_ch)
print("Done! Frame sample:", new_rows['idle'][0])
