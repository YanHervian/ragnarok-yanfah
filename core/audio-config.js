// =============================================================================
// AETHER CLASH - AUDIO CONFIGURATION (PENGATURAN VOLUME AUDIO)
// =============================================================================
// Di file ini kamu bisa bebas mengatur volume untuk setiap sound effect (SFX)
// maupun musik latar dan suara karakter.
//
// PANDUAN PENGATURAN VOLUME:
//  1.0  = 100% (volume normal default)
//  0.5  = 50%  (lebih pelan setengahnya)
//  1.3  = 130% (lebih nyaring 30%)
//  1.5  = 150% (lebih nyaring 50%)
//  2.0  = 200% (dua kali lipat lebih nyaring!)
//
// Kamu bisa memasukkan angka lebih dari 1.0 (misalnya 1.5, 2.0, 2.5, dst.)
// Sistem Web Audio game ini sudah dilengkapi Dynamic Compressor bawaan
// sehingga suara yang diperkeras di atas 100% tidak akan pecah/distorsi (anti-clipping).
// =============================================================================

window.AUDIO_CONFIG = {
  // Volume spesifik per file SFX (assets/audio/sfx/*.mp3)

  // Jalur file SFX universal (dipindahkan dari game.js agar tersentralisasi)
  sfxPaths: {
    hit_light: 'assets/audio/sfx/hit_light.mp3',
    hit_heavy: 'assets/audio/sfx/hit_heavy.mp3',
    block: 'assets/audio/sfx/block.mp3',
    whoosh: 'assets/audio/sfx/whoosh.mp3',
    jump: 'assets/audio/sfx/jump.mp3',
    double_jump: 'assets/audio/sfx/double_jump.mp3',
    land: 'assets/audio/sfx/land.mp3',
    ko_slam: 'assets/audio/sfx/ko_slam.mp3'
  },
  sfx: {
    hit_light: 0.8,     // Serangan ringan biasa (hit_light.mp3)
    hit_heavy: 1.0,    // Serangan berat / smash / knockdown (hit_heavy.mp3)
    block: 100.0,        // Suara menangkis / DEFEND (block.mp3) - dibuat tegas & jelas
    whoosh: 100.0,        // Suara tebasan angin saat meleset / whiff (whoosh.mp3)
    jump: 0.9,          // Suara lompatan biasa (jump.mp3)
    double_jump: 0.9,   // Suara double jump di udara (double_jump.mp3)
    land: 100.0,         // Suara mendarat di tanah (land.mp3)
    ko_slam: 100.0     // Suara bantingan keras saat musuh/pemain K.O. (ko_slam.mp3)
  },

  // Volume Spesifik Skill Karakter (Multiplier tambahan per karakter)
  skills: {
    dhyla: {
      skill1: 1.1, // Tembakan jamur
      skill2: 2.0  // Rambatan jamur akar
    },
    yanfah: {
      skill1: 1.0, // Proyektil data (Copy Paste)
      skill2: 1.0  // Shield digital (Ping 999)
    },
    // Tambahkan karakter lain di sini nanti, contoh:
    valkren: {
      skill1: 1.0, // Tembakan Plasma
      skill2: 1.0  // Hantaman Bumi (Orbital Strike)
    }
  },

  // Volume Kategori Global
  master: 1.0,          // Pengali volume keseluruhan SFX (1.0 = normal)
  voice: 1.0,           // Pengali volume suara ultimate karakter (cut-in voice)
  music: 1.0            // Pengali volume musik latar arena & menu (BGM)
};
