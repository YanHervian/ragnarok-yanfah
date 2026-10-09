const fs = require('fs');
let code = fs.readFileSync('precache.js', 'utf8');

let dlcMatch = code.match(/self\.RAGNAROK_DLC = (\{.*?\});/s);
let dlc = JSON.parse(dlcMatch[1]);

const crypto = require('crypto');
function getFileInfo(path) {
    if (!fs.existsSync(path)) return null;
    const buf = fs.readFileSync(path);
    const hash = crypto.createHash('sha256').update(buf).digest('hex').substring(0,12);
    return [path.replace(/\\/g, '/'), buf.length, hash];
}

const mapInfo = getFileInfo('assets/stages/ramuru-map.webp');
const musicInfo = getFileInfo('assets/audio/music/ramuru-music.mp3');

if (mapInfo && musicInfo) {
    dlc['map_ramuru'] = {
        total: mapInfo[1] + musicInfo[1],
        files: [mapInfo, musicInfo]
    };
    
    code = code.replace(/self\.RAGNAROK_DLC = \{.*?\};/s, 'self.RAGNAROK_DLC = ' + JSON.stringify(dlc) + ';');
    fs.writeFileSync('precache.js', code);
    console.log('precache.js updated with map_ramuru');
} else {
    console.log('Missing files for map_ramuru DLC.');
}
