/* RAMURU moves */
(() => {
  'use strict';
  const balance = {
    cooldowns: { skill1: 10, skill2: 20, ultimate: 30 },
    castTime: .5,
    passDamage: 16,
    basicRefund: .05
  };
  const names = ['SERANGAN 1', 'SERANGAN 2', 'SERANGAN 3', 'SKILL I', 'SKILL II', 'ULTIMATE'];
  const combo = [
    { damage: 8, knockback: 80, reach: 95, duration: .38, hitAt: .5 },
    { damage: 10, knockback: 100, reach: 85, duration: .44, hitAt: .5 },
    { damage: 15, knockback: 200, reach: 120, duration: .55, hitAt: .55 }
  ];
  function move(name, index = 1) {
    if (name === 'attack') return { name: `attack${index}`, type: 'attack', index, ...combo[index - 1] };
    if (name === 'skill1') return { name, type: name, damage: 18, duration: .50, knockback: 80, projectile: true, speed: 900, hitAt: .5 };
    if (name === 'skill2') return { name, type: name, damage: 25, duration: .60, knockback: 280, reach: 180, area: true, hitAt: .7 };
    return { name: 'ultimate', type: 'ramuru-ult', duration: balance.castTime, damage: 0, hitAt: .4 };
  }
  function start(a, name, index = 1) {
    if (a.action || a.state === 'hurt' || a.state === 'down' || a.state === 'recover') return false;
    if (name !== 'attack' && a.cooldowns[name] > 0) return false;
    if (name !== 'attack') a.cooldowns[name] = balance.cooldowns[name];
    a.action = { ...move(name, index), t: 0, fired: false, queued: 0 };
    a.state = a.action.name; a.stateTime = 0;

    if ((name === 'skill1' || name === 'skill2') && window.Ramuru.audio[name]) {
      try {
        const el = new Audio(window.Ramuru.audio[name]);
        const masterMult = typeof window.AUDIO_CONFIG?.master === 'number' ? window.AUDIO_CONFIG.master : 1.0;
        const skillMult = typeof window.AUDIO_CONFIG?.skills?.ramuru?.[name] === 'number' ? window.AUDIO_CONFIG.skills.ramuru[name] : 1.0;
        const sfxVolumeConfig = Number(localStorage.getItem('aether.sfxVolume') || 90) / 100;
        el.volume = Math.max(0, Math.min(1, sfxVolumeConfig * masterMult * skillMult));
        el.play().catch(() => { });
      } catch (e) { }
    }

    return true;
  }
  const vfx = {
    // scaleOverrides digunakan untuk mengatur ukuran animasi di dalam game
    // tanpa perlu mengubah ukuran gambar atau membuat ulang sprite sheet.
    // 1.0 = ukuran normal, 1.5 = 50% lebih besar, 0.8 = 20% lebih kecil.
    // Jika tidak ditulis di sini, ukurannya akan mengikuti ukuran normal (1.0).
    scaleOverrides: {
      idle: 1.05,
      walk: 1.08,
      run: 1.19,
      crouch: 1.2,
      jump: 1.05,
      doublejump: 0.9,
      attack1: 1.3,
      attack2: 1.3,
      attack3: 1.45,
      skill1: 1.3,
      skill2: 1.3,
      ultimate: 1.3,
      hurt: 1.0,
      down: 1.0,
      recover: 1.0
    },
    attacks: [
      { x: 95, y: -130, size: 80, asset: 'ramuru-slash', flipX: -1 },
      { x: 95, y: -155, size: 80, asset: 'ramuru-slash', flipX: -1, rotation: -45 },
      { slamAsset: 'ramuru-slam', slamSize: 170, slamX: 5, slamY: -40 }
    ],
    guard: { asset: 'ramuru-guard', size: 150, x: 50, y: -70 },
    hasJumpSmoke: true,
  };
  const ultimate = {
    start(actor, context) {
      return {
        t: 0,
        owner: actor === context.hero ? 'player' : 'enemy',
        facing: actor.facing,
        casterX: actor.x,
        phase: 'cutin',
        hit: false
      };
    },
    update(dt, s, context) {
      if (!s) return null;
      s.t += dt;
      if (s.phase === 'cutin' && s.t >= 1.2) {
        s.phase = 'active';
        if (s.owner === 'player') context.hitDummy(35, 400, '#ff5555', s.casterX, context.dummy.y - 60, true, true);
        else context.receiveHit(35, { knockdown: true });
      }
      if (s.t >= 3.0) { context.stopVoice('ramuru', s.owner); return null; }
      return s;
    }
  };
  function refund(a) {
    for (const n of Object.keys(balance.cooldowns))
      a.cooldowns[n] = Math.max(0, a.cooldowns[n] - balance.cooldowns[n] * balance.basicRefund);
  }
  window.Ramuru = {
    audio: {
      skill1: null,
      skill2: null,
      ultimate: 'assets/ramuru/audio/ramuru-ultimate.mp3',
      hit: null
    },
    balance, names, combo, vfx, ultimate, move, start, refund
  };
})();
