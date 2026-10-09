const fs = require('fs');
let code = fs.readFileSync('precache.js', 'utf8');

// Parse RAGNAROK_PRECACHE
let precacheMatch = code.match(/self\.RAGNAROK_PRECACHE = (\{.*?\});/s);
let precache = JSON.parse(precacheMatch[1]);

// Parse RAGNAROK_DLC
let dlcMatch = code.match(/self\.RAGNAROK_DLC = (\{.*?\});/s);
let dlc = JSON.parse(dlcMatch[1]);

// 1. Remove midday-showdown from precache
precache.files = precache.files.filter(f => !f[0].includes('midday-showdown.mp3'));

// 2. Add music-lobby to precache (we'll just fake the hash and size if needed, but let's get actual size/hash)
const crypto = require('crypto');
function getFileInfo(path) {
    if (!fs.existsSync(path)) return null;
    const buf = fs.readFileSync(path);
    const hash = crypto.createHash('sha256').update(buf).digest('hex').substring(0,12);
    return [path.replace(/\\/g, '/'), buf.length, hash];
}

const lobbyInfo = getFileInfo('assets/audio/music/music-lobby.mp3');
if (lobbyInfo) {
    // avoid duplicates
    precache.files = precache.files.filter(f => f[0] !== lobbyInfo[0]);
    precache.files.push(lobbyInfo);
    precache.files.sort((a,b) => a[0].localeCompare(b[0]));
}

// 3. Add valkren-music to map_valkren DLC
const valkrenInfo = getFileInfo('assets/audio/music/valkren-music.mp3');
if (valkrenInfo && dlc['map_valkren']) {
    dlc['map_valkren'].files = dlc['map_valkren'].files.filter(f => f[0] !== valkrenInfo[0]);
    dlc['map_valkren'].files.push(valkrenInfo);
    
    // update total size
    let totalSize = 0;
    dlc['map_valkren'].files.forEach(f => totalSize += f[1]);
    dlc['map_valkren'].total = totalSize;
}

// Write back
code = code.replace(/self\.RAGNAROK_PRECACHE = \{.*?\};/s, 'self.RAGNAROK_PRECACHE = ' + JSON.stringify(precache) + ';');
code = code.replace(/self\.RAGNAROK_DLC = \{.*?\};/s, 'self.RAGNAROK_DLC = ' + JSON.stringify(dlc) + ';');

fs.writeFileSync('precache.js', code);
console.log('precache.js updated');
