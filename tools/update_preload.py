import pathlib
import re

p = pathlib.Path(r'c:\Users\ACER\Downloads\aether-clash-main\game.js')
text = p.read_text(encoding='utf-8')

old_str = ", ...(YF?[loadImage('yanfah','assets/yanfah/run/sprite-sheet-alpha.webp?v=26',true),...['glitchhit','cyberslam','datacode','hexshield','systemcrash'].map(name=>loadImage('fx-yanfah-'+name,'assets/yanfah/ui/fx-'+name+'.webp',true))]:[]),"
new_str = old_str + " ...(DH?[loadImage('dhyla','assets/dhyla/run/sprite-sheet-alpha.webp',true)]:[]),"

text = text.replace(old_str, new_str)
p.write_text(text, encoding='utf-8')
print("Updated game.js")
