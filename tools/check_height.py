from PIL import Image
import pathlib

def get_char_height(path, cell_x, cell_y, cell_w, cell_h):
    img = Image.open(path).convert('RGBA')
    cell = img.crop((cell_x, cell_y, cell_x + cell_w, cell_y + cell_h))
    bbox = cell.getbbox()
    if bbox:
        return bbox[3] - bbox[1]
    return 0

yanfah = r'c:\Users\ACER\Downloads\aether-clash-main\assets\yanfah\run\sprite-sheet-alpha.webp'
dhyla = r'c:\Users\ACER\Downloads\aether-clash-main\assets\dhyla\run\sprite-sheet-alpha.webp'
print("Yanfah char height in idle:", get_char_height(yanfah, 0, 0, 448, 288))
print("Dhyla char height in idle:", get_char_height(dhyla, 0, 0, 448, 288))
