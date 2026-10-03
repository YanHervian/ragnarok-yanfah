import pathlib, json
from PIL import Image

run_dir = pathlib.Path(r'c:\Users\ACER\Downloads\aether-clash-main\assets\dhyla\run')
json_path = run_dir / 'manifest.json'
data = json.loads(json_path.read_text(encoding='utf-8'))

rows = data["frame_layout"]["rows"]
for state, frames in rows.items():
    if frames:
        y0 = frames[0]["y"]
        cnt = len(frames)
        print(state + ": y=" + str(y0) + " count=" + str(cnt))
