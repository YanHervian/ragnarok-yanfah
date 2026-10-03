import pathlib

p = pathlib.Path(r'c:\Users\ACER\Downloads\aether-clash-main\game.js')
text = p.read_text(encoding='utf-8')

# Replace the preload condition - use window.Dhyla directly instead of DH
old = "...(DH?[loadImage('dhyla','assets/dhyla/run/sprite-sheet-alpha.webp',true)]:[])"
new = "...(window.Dhyla&&window.DHYLA_MANIFEST?[loadImage('dhyla','assets/dhyla/run/sprite-sheet-alpha.webp',true)]:[])"
text = text.replace(old, new)

# Also fix the DH var so it double checks
old2 = "DH = window.Dhyla && window.DHYLA_MANIFEST ? window.Dhyla : null;"
new2 = "DH = window.Dhyla && window.DHYLA_MANIFEST ? window.Dhyla : null; if (!DH && window.Dhyla && window.DHYLA_MANIFEST) DH = window.Dhyla;"
text = text.replace(old2, new2)

p.write_text(text, encoding='utf-8')
print("Fixed")
