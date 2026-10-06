const fs = require('fs');
const path = require('path');

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      if (!['.git', 'node_modules', '.gemini', '.agents', 'tools', 'docs'].includes(file)) {
        walk(path.join(dir, file), fileList);
      }
    } else {
      if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.md')) {
        fileList.push(path.join(dir, file));
      }
    }
  }
  return fileList;
}

const files = walk(__dirname);
let changedCount = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace exact phrases first
  content = content.replace(/RAGNAROK TRINITY/g, 'RAGNAROK TRINITY');
  content = content.replace(/Ragnarok Trinity/g, 'Ragnarok Trinity');
  content = content.replace(/ragnarok-trinity/g, 'ragnarok-trinity');
  
  // Replace variables / cache names
  content = content.replace(/RAGNAROK_PRELOAD/g, 'RAGNAROK_PRELOAD');
  content = content.replace(/RAGNAROK_PRECACHE/g, 'RAGNAROK_PRECACHE');
  content = content.replace(/RAGNAROK_DLC/g, 'RAGNAROK_DLC');
  content = content.replace(/ragnarok-assets/g, 'ragnarok-assets');
  content = content.replace(/__ragnarok-index/g, '__ragnarok-index');
  content = content.replace(/ragnarok-fullscreen/g, 'ragnarok-fullscreen');
  content = content.replace(/ragnarokFullscreen/g, 'ragnarokFullscreen');
  
  // What about just "Aether" -> "Ragnarok Trinity" ?
  // If we just blindly replace "Aether" we will ruin "Aether Arm", "Aether Bolt" 
  // Let's replace "AETHER" alone if it's a standalone word (unlikely, usually it's "RAGNAROK TRINITY")
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    changedCount++;
    console.log('Updated:', file);
  }
}

console.log('Total files updated:', changedCount);
