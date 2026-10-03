import pathlib

p = pathlib.Path(r'c:\Users\ACER\Downloads\aether-clash-main\game.js')
text = p.read_text(encoding="utf-8")

# Add cache busting to dhyla preload
old = "...(window.Dhyla&&window.DHYLA_MANIFEST?[loadImage('dhyla','assets/dhyla/run/sprite-sheet-alpha.webp',true)]:[])"
new = "...(window.Dhyla&&window.DHYLA_MANIFEST?[loadImage('dhyla','assets/dhyla/run/sprite-sheet-alpha.webp?v=2',true)]:[])"

text = text.replace(old, new)
p.write_text(text, encoding="utf-8")
print("Added cache buster to preload")
