import pathlib, json

p = pathlib.Path(r'c:\Users\ACER\Downloads\aether-clash-main\assets\dhyla\run\manifest.json')
data = json.loads(p.read_text(encoding='utf-8'))

# Fix cell to match actual scaled frame size (0.625 of original 448x512)
data['cell']['width'] = 280
data['cell']['height'] = 320
# safe_margin_y also needs to be scaled
data['cell']['safe_margin_x'] = 6
data['cell']['safe_margin_y'] = 5

p.write_text(json.dumps(data, indent=2), encoding='utf-8')

# Rebuild manifest.js
p_mjs = pathlib.Path(r'c:\Users\ACER\Downloads\aether-clash-main\assets\dhyla\manifest.js')
js = 'window.DHYLA_MANIFEST = ' + json.dumps(data, indent=2) + ';\n'
js += '\nwindow.DHYLA_METRICS = window.DHYLA_MANIFEST;\n'
p_mjs.write_text(js, encoding='utf-8')

# Also update run/manifest.js
p_run_mjs = pathlib.Path(r'c:\Users\ACER\Downloads\aether-clash-main\assets\dhyla\run\manifest.js')
p_run_mjs.write_text(js, encoding='utf-8')

print('Fixed cell:', data['cell'])
print('idle frame[0]:', data['frame_layout']['rows']['idle'][0])
