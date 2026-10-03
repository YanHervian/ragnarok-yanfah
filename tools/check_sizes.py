import pathlib, json

def check(name, run_dir):
    try:
        p = pathlib.Path(run_dir) / 'manifest.json'
        data = json.loads(p.read_text(encoding='utf-8'))
        cell = data.get('cell', {})
        print(name + ' cell size: ' + str(cell.get('width')) + ' x ' + str(cell.get('height')))
    except Exception as e:
        print(name + ' error ' + str(e))

check('Yanfah', r'c:\Users\ACER\Downloads\aether-clash-main\assets\yanfah\run')
check('Dhyla', r'c:\Users\ACER\Downloads\aether-clash-main\assets\dhyla\run')
check('Cora', r'c:\Users\ACER\Downloads\aether-clash-main\assets\cora\run')
