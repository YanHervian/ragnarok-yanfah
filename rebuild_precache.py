import os
import json
import hashlib

def get_hash(filepath):
    h = hashlib.sha256()
    with open(filepath, 'rb') as f:
        while chunk := f.read(8192):
            h.update(chunk)
    return h.hexdigest()[:12]

def rebuild():
    root = r'c:\Users\ACER\Downloads\aether-clash-main'
    
    # Files to include (core + essential assets)
    valid_extensions = {'.js', '.css', '.html', '.svg', '.png', '.webp', '.mp3', '.ttf', '.json'}
    ignore_dirs = {'.git', '.agents', '.venv', 'node_modules', 'scratch', 'tools', 'tmp', 'docs', 'guide', 'Design Dari AI'}
    ignore_files = {'precache.js', 'precache_new.js', 'files.json'}
    
    files_list = []
    total_bytes = 0
    
    for dirpath, dirnames, filenames in os.walk(root):
        # Exclude directories
        dirnames[:] = [d for d in dirnames if d not in ignore_dirs and not d.startswith('.')]
        
        for file in filenames:
            if file in ignore_files or file.startswith('.'):
                continue
                
            ext = os.path.splitext(file)[1].lower()
            if ext not in valid_extensions:
                continue
                
            filepath = os.path.join(dirpath, file)
            rel_path = os.path.relpath(filepath, root).replace('\\', '/')
            
            try:
                size = os.path.getsize(filepath)
                file_hash = get_hash(filepath)
                files_list.append([rel_path, size, file_hash])
                total_bytes += size
            except:
                pass

    files_list.sort(key=lambda x: x[0])
    
    version = get_hash(os.path.join(root, 'index.html')) if os.path.exists(os.path.join(root, 'index.html')) else 'unknown'
    
    precache_data = {
        "version": version,
        "total": total_bytes,
        "files": files_list
    }
    
    js_content = f"/* Generated: core files */\nself.RAGNAROK_PRECACHE = {json.dumps(precache_data, separators=(',', ':'))};\n"
    
    # Also we don't want to break the DLC logic if there is any, but DLC is in files.json... wait, DLCs are usually defined in RAGNAROK_DLC.
    # In the original precache.js, there was a RAGNAROK_DLC object. Let's preserve it!
    try:
        with open(os.path.join(root, 'precache.js'), 'r', encoding='utf-8') as f:
            content = f.read()
            if 'self.RAGNAROK_DLC = ' in content:
                dlc_part = content.split('self.RAGNAROK_DLC = ')[1]
                js_content += f"self.RAGNAROK_DLC = {dlc_part}"
    except:
        pass
        
    with open(os.path.join(root, 'precache.js'), 'w', encoding='utf-8', newline='\n') as f:
        f.write(js_content)
        
    print(f"Rebuilt precache.js with {len(files_list)} files. Total: {total_bytes} bytes.")

if __name__ == '__main__':
    rebuild()
