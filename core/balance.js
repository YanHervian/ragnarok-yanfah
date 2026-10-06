/**
 * RAGNAROK TRINITY - PUSAT PENGATURAN KESEIMBANGAN KARAKTER (CHARACTER BALANCE)
 * 
 * File ini digunakan untuk mengatur Damage (Daya Rusak) dan Cooldown tiap karakter.
 * 
 * ============================================================================
 * PANDUAN TIPE KARAKTER (ARCHETYPES):
 * ============================================================================
 * 1. Tipe Berat (Heavy) - Contoh: Valkren, Haldor, Edda
 *    - Ciri: Serangan lambat, tapi sangat mematikan.
 *    - Saran Damage: Basic Attack (10-18), Skill (30-40), Ultimate (60-80).
 * 
 * 2. Tipe Cepat (Agile) - Contoh: Nib, Fenr, Zanni
 *    - Ciri: Lincah, sering menyerang, tapi serangannya tidak terlalu sakit.
 *    - Saran Damage: Basic Attack (4-10), Skill (12-20), Ultimate (30-45).
 * 
 * 3. Tipe Seimbang (All-rounder) - Contoh: Arco, Mira, Cora
 *    - Ciri: Seimbang antara kecepatan dan kekuatan.
 *    - Saran Damage: Basic Attack (6-12), Skill (16-24), Ultimate (40-60).
 * 
 * ============================================================================
 * PANDUAN KNOCKBACK (EFEK TERPENTAL BERDASARKAN DAMAGE):
 * ============================================================================
 * Di sistem inti (core), jarak musuh terpental mundur (knockback) otomatis 
 * ditentukan oleh seberapa besar 'damage' yang mereka terima dari satu serangan:
 * 
 * - Damage < 15        : Efek hurt biasa (Mundur sangat pelan/stagger ringan).
 * - Damage 15 s/d 19   : Terpental mundur sedang (Jarak knockback = 300).
 *                        (Cocok untuk Skill 1 rata-rata).
 * - Damage 20 s/d 29   : Terpental jauh (Jarak knockback = 600).
 *                        (Cocok untuk Skill 2 atau serangan berat).
 * - Damage >= 30       : Terpental sangat jauh hingga jatuh/knockdown (Jarak knockback = 900).
 *                        (Batas wajar serangan super/finisher).
 * - Ultimate (Khusus)  : Jika terkena Ultimate, otomatis terpental maksimal (Jarak = 1100).
 * 
 * ============================================================================
 * PANDUAN PERGERAKAN (MOVEMENT & ATTACK SPEED):
 * ============================================================================
 * - walkSpeed   : Kecepatan jalan biasa (Maju/Mundur pelan). Standar: 320.
 * - runSpeed    : Kecepatan lari (Tekan maju 2x). Standar: 520.
 * - attackSpeed : Pengali durasi animasi pukulan dasar (Basic Attack).
 *                 1.0 = Standar, 0.8 = 20% lebih cepat (Agile), 
 *                 1.3 = 30% lebih lambat (Heavy).
 */

window.GAME_BALANCE = {
    // ---------------------------------------------------------
    // 1. KARAKTER SEIMBANG (ALL-ROUNDER)
    // ---------------------------------------------------------
    arco: {
        movement: { walkSpeed: 320, runSpeed: 520, attackSpeed: 1.0 },
        combo: [6, 8, 12], // Damage pukulan ke-1, ke-2, ke-3
        skill1: { damage: 16, cooldown: 10 },
        skill2: { damage: 24, cooldown: 20 },
        ultimate: { damage: 12, cooldown: 30 } // Arco ultimate multi-hit (drone), per hit 12
    },
    mira: {
        movement: { walkSpeed: 310, runSpeed: 510, attackSpeed: 1.0 },
        combo: [6, 8, 12],
        skill1: { damage: 16, cooldown: 10 },
        skill2: { damage: 24, cooldown: 20 },
        ultimate: { damage: 45, cooldown: 30 }
    },
    cora: {
        movement: { walkSpeed: 320, runSpeed: 520, attackSpeed: 1.0 },
        combo: [6, 8, 12],
        skill1: { damage: 15, cooldown: 12 },
        skill2: { damage: 22, cooldown: 18 },
        ultimate: { damage: 50, cooldown: 32 }
    },

    // (Tambahan All-rounder)
    naja: { // Zoner (Petarung Jarak Jauh) - Cooldown sedikit lama, damage skill lumayan
        movement: { walkSpeed: 300, runSpeed: 490, attackSpeed: 1.05 },
        combo: [5, 7, 11],
        skill1: { damage: 16, cooldown: 11 },
        skill2: { damage: 25, cooldown: 20 },
        ultimate: { damage: 48, cooldown: 31 }
    },
    rhea: { // Controller - Stabil dan konsisten
        movement: { walkSpeed: 320, runSpeed: 510, attackSpeed: 1.0 },
        combo: [6, 8, 12],
        skill1: { damage: 15, cooldown: 10 },
        skill2: { damage: 23, cooldown: 18 },
        ultimate: { damage: 45, cooldown: 30 }
    },
    dhyla: { // Zoner / Mage - Proyektil dan Area of Effect
        movement: { walkSpeed: 310, runSpeed: 500, attackSpeed: 1.05 },
        combo: [6, 8, 12],
        skill1: { damage: 16, cooldown: 10 },
        skill2: { damage: 24, cooldown: 20 },
        ultimate: { damage: 48, cooldown: 30 }
    },

    // ---------------------------------------------------------
    // 2. KARAKTER BERAT (HEAVY) - Lambat tapi mematikan
    // ---------------------------------------------------------
    valkren: {
        movement: { walkSpeed: 270, runSpeed: 420, attackSpeed: 1.3 },
        combo: [10, 14, 18], 
        skill1: { damage: 25, cooldown: 14 },
        skill2: { damage: 35, cooldown: 22 },
        ultimate: { damage: 70, cooldown: 35 }
    },
    haldor: {
        movement: { walkSpeed: 280, runSpeed: 440, attackSpeed: 1.25 },
        combo: [10, 12, 16],
        skill1: { damage: 22, cooldown: 12 },
        skill2: { damage: 32, cooldown: 20 },
        ultimate: { damage: 65, cooldown: 35 }
    },
    edda: {
        movement: { walkSpeed: 290, runSpeed: 450, attackSpeed: 1.2 },
        combo: [8, 12, 16],
        skill1: { damage: 20, cooldown: 12 },
        skill2: { damage: 30, cooldown: 20 },
        ultimate: { damage: 60, cooldown: 35 }
    },
    // (Tambahan Heavy)
    isolde: { // Bruiser - Pukulan sangat keras
        movement: { walkSpeed: 285, runSpeed: 460, attackSpeed: 1.25 },
        combo: [9, 13, 17],
        skill1: { damage: 24, cooldown: 13 },
        skill2: { damage: 33, cooldown: 21 },
        ultimate: { damage: 68, cooldown: 34 }
    },


    // ---------------------------------------------------------
    // 3. KARAKTER CEPAT (AGILE) - Lincah, hit banyak, damage kecil
    // ---------------------------------------------------------
    nib: {
        movement: { walkSpeed: 380, runSpeed: 640, attackSpeed: 0.75 },
        combo: [4, 6, 8],
        skill1: { damage: 12, cooldown: 8 },
        skill2: { damage: 18, cooldown: 16 },
        ultimate: { damage: 35, cooldown: 25 }
    },
    fenr: {
        movement: { walkSpeed: 360, runSpeed: 600, attackSpeed: 0.8 },
        combo: [5, 7, 10],
        skill1: { damage: 14, cooldown: 9 },
        skill2: { damage: 19, cooldown: 17 },
        ultimate: { damage: 40, cooldown: 28 }
    },
    zanni: {
        movement: { walkSpeed: 350, runSpeed: 590, attackSpeed: 0.85 },
        combo: [5, 6, 9],
        skill1: { damage: 13, cooldown: 8 },
        skill2: { damage: 20, cooldown: 15 },
        ultimate: { damage: 38, cooldown: 26 }
    },
    // (Tambahan Agile)
    yanfah: { // Hacker Tactical - Cepat dan skill spam
        movement: { walkSpeed: 365, runSpeed: 610, attackSpeed: 0.75 },
        combo: [4, 7, 9],
        skill1: { damage: 13, cooldown: 9 },
        skill2: { damage: 19, cooldown: 16 },
        ultimate: { damage: 42, cooldown: 27 }
    },
    solan: { // Agile Fighter - Kombinasi cepat
        movement: { walkSpeed: 355, runSpeed: 600, attackSpeed: 0.8 },
        combo: [5, 7, 10],
        skill1: { damage: 14, cooldown: 8 },
        skill2: { damage: 21, cooldown: 17 },
        ultimate: { damage: 38, cooldown: 28 }
    }
};
