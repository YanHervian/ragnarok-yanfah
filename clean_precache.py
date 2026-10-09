import json
import re
import os

filepath = r'c:\Users\ACER\Downloads\aether-clash-main\precache.js'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the JSON part for RAGNAROK_PRECACHE
match = re.search(r'self\.RAGNAROK_PRECACHE\s*=\s*(\{.*?\});\n', content, re.DOTALL)
if match:
    precache_json = match.group(1)
    data = json.loads(precache_json)
    
    # Filter files
    bad_patterns = ['.agents', '.venv', 'scratch', '.git']
    new_files = []
    total_size = 0
    
    for f in data['files']:
        path = f[0]
        if not any(bad in path for bad in bad_patterns):
            new_files.append(f)
            total_size += f[1]
            
    data['files'] = new_files
    data['total'] = total_size
    # change version to force cache update
    import hashlib
    data['version'] = hashlib.md5(str(total_size).encode()).hexdigest()[:12]
    
    new_json = json.dumps(data, separators=(',', ':'))
    new_content = content.replace(precache_json, new_json)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Cleaned precache.js. Kept {len(new_files)} files.")
else:
    print("Could not find RAGNAROK_PRECACHE JSON block.")
