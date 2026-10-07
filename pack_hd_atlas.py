import os
import json
from PIL import Image

base_dir = r"assets\ramuru\run"
frames_dir = os.path.join(base_dir, "frames")
req_path = os.path.join(base_dir, "sprite-request.json")

with open(req_path) as f:
    req = json.load(f)

cell_w = req['cell']['width']
cell_h = req['cell']['height']
states = list(req['states'].keys())

# Cari kolom max (maksimal frame)
max_cols = max([req['states'][s]['frames'] for s in states])
atlas_w = max_cols * cell_w
atlas_h = len(states) * cell_h

atlas = Image.new("RGBA", (atlas_w, atlas_h), (0, 0, 0, 0))

animation = {
    "cellWidth": cell_w,
    "cellHeight": cell_h,
    "columns": max_cols,
    "rows": {}
}

frame_layout = {
    "sheetWidth": atlas_w,
    "sheetHeight": atlas_h,
    "cellWidth": cell_w,
    "cellHeight": cell_h,
    "rows": {}
}

for row_idx, state in enumerate(states):
    state_frames = req['states'][state]['frames']
    fps = req['states'][state]['fps']
    loop = req['states'][state].get('loop', False)
    
    row_layout = []
    
    for i in range(state_frames):
        # file format dari hd_sprite_resize: 00_idle-00.png
        frame_name = f"00_{state}-{i:02d}.png"
        frame_path = os.path.join(frames_dir, state, frame_name)
        
        x = i * cell_w
        y = row_idx * cell_h
        
        if os.path.exists(frame_path):
            img = Image.open(frame_path)
            atlas.paste(img, (x, y))
        else:
            print(f"Missing {frame_path}")
            
        row_layout.append({"x": x, "y": y, "w": cell_w, "h": cell_h})
        
    frame_layout["rows"][state] = row_layout
    duration = max(1, round(1000.0 / (float(fps) or 6.0)))
    
    animation["rows"][state] = {
        "row": row_idx,
        "frames": state_frames,
        "fps": fps,
        "durations_ms": [duration] * state_frames,
        "loop": loop,
        "frame_variant": "hd"
    }

atlas_png = os.path.join(base_dir, "sprite-sheet-alpha.png")
atlas_webp = os.path.join(base_dir, "sprite-sheet-alpha.webp")
atlas.save(atlas_png)
atlas.save(atlas_webp, "webp", lossless=True)

manifest = {
    "characterId": req["character"]["id"],
    "engine": "component-row",
    "game_input": "sprite-sheet-alpha.webp",
    "degraded_static_fallback": False,
    "curation_applied": False,
    "frame_variant": "hd",
    "sprite_sheet_alpha": "sprite-sheet-alpha.png",
    "base_image": req["character"].get("base_image"),
    "cell": req["cell"],
    "chroma_key": req["chroma_key"],
    "animation": animation,
    "frame_layout": frame_layout,
    "metrics": {"scale": 0.55}
}

js_content = f"window.RAMURU_MANIFEST = {json.dumps(manifest, indent=2)};\nwindow.RAMURU_METRICS = window.RAMURU_MANIFEST;"
with open(os.path.join(base_dir, "manifest.js"), "w") as f:
    f.write(js_content)
with open(r"assets\ramuru\manifest.js", "w") as f:
    f.write(js_content)

print("Atlas built!")
