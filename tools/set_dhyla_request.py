import json, pathlib

run_dir = pathlib.Path(r'c:\Users\ACER\Downloads\aether-clash-main\assets\dhyla\run')
req_path = run_dir / 'sprite-request.json'

data = json.loads(req_path.read_text(encoding='utf-8'))
data['cell']['width'] = 448
data['cell']['height'] = 288
req_path.write_text(json.dumps(data, indent=2), encoding='utf-8')
print("Set sprite-request.json to 448x288")
