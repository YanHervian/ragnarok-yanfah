from PIL import Image
import pathlib, json

run_dir = pathlib.Path(r'c:\Users\ACER\Downloads\aether-clash-main\assets\dhyla\run')
png_path = run_dir / 'sprite-sheet-alpha.png'
webp_path = run_dir / 'sprite-sheet-alpha.webp'
json_path = run_dir / 'manifest.json'

data = json.loads(json_path.read_text(encoding='utf-8'))
rows = data['frame_layout']['rows']
state_keys = list(rows.keys())

# Current cell size after 0.4x scale
src_cw = 179
src_ch = 204
cols = 4

# We want NEW cell size matching Yanfah (448x288) style
# Character will be scaled to ~60% of cell, leaving padding
# New cell: 280x192 to roughly match Yanfah proportions  
new_cw = 280
new_ch = 192

# Character scale within cell: shrink to 55% height of new cell
char_target_h = int(new_ch * 0.85)

# Load current sheet (from PNG which is higher quality than webp)
sheet = Image.open(png_path)
print(f'Source sheet: {sheet.size}')

# Build new sheet
n_states = len(state_keys)
new_sheet_w = new_cw * cols
new_sheet_h = new_ch * n_states
new_sheet = Image.new('RGBA', (new_sheet_w, new_sheet_h), (0, 0, 0, 0))

frame_map = {}

for row_idx, state in enumerate(state_keys):
    frames = rows[state]
    state_frames = []
    for col_idx, frame in enumerate(frames):
        # Extract frame from source sheet
        src_x = col_idx * src_cw
        src_y = row_idx * src_ch
        cell = sheet.crop((src_x, src_y, src_x + src_cw, src_y + src_ch))
        
        # Scale character: maintain aspect ratio to fit char_target_h
        scale_factor = char_target_h / src_ch
        char_w = int(src_cw * scale_factor)
        char_h = char_target_h
        
        cell_scaled = cell.resize((char_w, char_h), Image.Resampling.BICUBIC)
        
        # Place on new cell: center horizontally, align to bottom (with safe margin)
        new_cell = Image.new('RGBA', (new_cw, new_ch), (0, 0, 0, 0))
        paste_x = (new_cw - char_w) // 2
        paste_y = new_ch - char_h - 3  # 3px bottom margin
        new_cell.paste(cell_scaled, (paste_x, paste_y), cell_scaled)
        
        # Paste into new sheet
        dst_x = col_idx * new_cw
        dst_y = row_idx * new_ch
        new_sheet.paste(new_cell, (dst_x, dst_y))
        
        state_frames.append({'x': dst_x, 'y': dst_y, 'w': new_cw, 'h': new_ch})
    
    frame_map[state] = state_frames

# Save sheets
new_sheet.save(str(png_path), format='PNG')
new_sheet.save(str(webp_path), format='WEBP', lossless=True)
print(f'New sheet: {new_sheet.size}')

# Update manifest
data['cell']['width'] = new_cw
data['cell']['height'] = new_ch
data['cell']['safe_margin_x'] = 8
data['cell']['safe_margin_y'] = 5

data['frame_layout']['sheetWidth'] = new_sheet_w
data['frame_layout']['sheetHeight'] = new_sheet_h
data['frame_layout']['cellWidth'] = new_cw
data['frame_layout']['cellHeight'] = new_ch
data['frame_layout']['rows'] = frame_map

json_path.write_text(json.dumps(data, indent=2), encoding='utf-8')

# Rebuild manifest.js
p_mjs = pathlib.Path(r'c:\Users\ACER\Downloads\aether-clash-main\assets\dhyla\manifest.js')
js = 'window.DHYLA_MANIFEST = ' + json.dumps(data, indent=2) + ';\n'
js += '\nwindow.DHYLA_METRICS = window.DHYLA_MANIFEST;\n'
p_mjs.write_text(js, encoding='utf-8')

p_run_mjs = run_dir / 'manifest.js'
p_run_mjs.write_text(js, encoding='utf-8')

print(f'Cell: {new_cw}x{new_ch}')
print('Done!')
