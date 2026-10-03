import json, pathlib

run_dir = pathlib.Path(r'c:\Users\ACER\Downloads\aether-clash-main\assets\dhyla\run')
req_path = run_dir / 'sprite-request.json'

data = json.loads(req_path.read_text(encoding='utf-8'))
if 'chroma' not in data:
    data['chroma'] = {}
data['chroma']['spill_max_fraction'] = 0.02
req_path.write_text(json.dumps(data, indent=2), encoding='utf-8')
print("Updated spill_max_fraction to 0.02")
