/* RAMURU moves */
(() => {
  'use strict';
  const getBal = () => window.GAME_BALANCE?.ramuru;
  const atkSpd = () => getBal()?.movement?.attackSpeed ?? 1.0;

  const balance = {
    get cooldowns() {
      return {
        skill1: getBal()?.skill1?.cooldown ?? 10,
        skill2: getBal()?.skill2?.cooldown ?? 20,
        ultimate: getBal()?.ultimate?.cooldown ?? 30
      };
    },
    castTime: .5,
    passDamage: 16,
    basicRefund: .05
  };
  const names = ['BILAH AIR', 'ARUS KILAT', 'JERAT SLIME', 'TEBASAN TSUNAMI'];
  const combo = [
    { get damage() { return getBal()?.combo[0] ?? 8; }, knockback: 80, reach: 95, get duration() { return .38 * atkSpd(); }, hitAt: .5 },
    { get damage() { return getBal()?.combo[1] ?? 10; }, knockback: 100, reach: 85, get duration() { return .44 * atkSpd(); }, hitAt: .5 },
    { get damage() { return getBal()?.combo[2] ?? 15; }, knockback: 200, reach: 120, get duration() { return .55 * atkSpd(); }, hitAt: .55 }
  ];
  function move(name, index = 1) {
    if (name === 'attack') return { name: `attack${index}`, type: 'attack', index, ...combo[index - 1] };
    if (name === 'skill1') return {
      name, type: name, get damage() { return getBal()?.skill1?.damage ?? 18; }, duration: 0.82, knockback: 80, dash: 850, dashFrame: 1, reach: 190, hitAt: .60,
      frameTimes: [0.2, 0.6, 0.1, 0.1]
    };
    if (name === 'skill2') return { name, type: name, get damage() { return getBal()?.skill2?.damage ?? 25; }, duration: .60, knockback: 280, reach: 600, area: true, hitAt: .9 };
    return { name: 'ultimate', type: 'ramuru-ult', duration: balance.castTime, damage: 0, hitAt: .4 };
  }
  function start(a, name, index = 1) {
    if (a.action || a.state === 'hurt' || a.state === 'down' || a.state === 'recover') return false;
    if (name !== 'attack' && a.cooldowns[name] > 0) return false;
    if (name !== 'attack') a.cooldowns[name] = balance.cooldowns[name];
    a.action = { ...move(name, index), t: 0, fired: false, queued: 0 };
    a.state = a.action.name; a.stateTime = 0;

    if (name === 'skill1' && window.__game) {
      const cfg = window.Ramuru?.vfx?.skills?.skill1 || { asset: 'ramuru-dash', size: 350, x: 0, y: 0, dustAsset: 'ramuru-dust', dustSize: 250, dustX: -30, dustY: -10, life: 0.5 };

      // 1. SETTING KAPAN EFEK TAMPIL (DELAY KEMUNCULAN)
      // 0 = langsung muncul. 200 = muncul setelah 0.2 detik. 400 = 0.4 detik.
      setTimeout(() => {

        // 2. SETTING KAPAN EFEK MATI (DURASI HIDUP)
        // Angka 0.5 di bawah ini artinya efek akan bertahan selama 0.5 detik sebelum hilang.
        window.__game.effects.push({ type: 'ramuru-fx', asset: cfg.asset, x: a.x, y: a.y - 80, life: 0.8, maxLife: 0.8, size: cfg.size, facing: a.facing, bindTo: a, offsetX: cfg.x, offsetY: cfg.y - 80 });

        if (cfg.dustAsset) window.__game.effects.push({ type: 'ramuru-fx', asset: cfg.dustAsset, x: a.x + a.facing * (cfg.dustX || 0), y: window.__game.config.groundY + (cfg.dustY || 0), life: 0.25, maxLife: 0.25, facing: a.facing, size: cfg.dustSize });

      }, 0); // <-- UBAH ANGKA 0 INI UNTUK MENGATUR KAPAN TAMPILNYA (contoh ubah ke 200)
    }

    if (name === 'skill2' && window.__game) {
      const cfg = window.Ramuru?.vfx?.skills?.skill2 || {};
      if (cfg.castAsset) {
        window.__game.effects.push({ type: 'ramuru-fx', asset: cfg.castAsset, x: a.x, y: a.y - 70, life: 0.5, maxLife: 0.5, size: cfg.castSize || 200, facing: a.facing, bindTo: a, offsetX: 0, offsetY: -70 });
      }
    }

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
      hurt: 1.25,
      down: 1.5,
      recover: 1.25
    },
    hit: { asset: 'ramuru-hit', size: 150, x: 5, y: 0 },
    attacks: [
      { x: 90, y: -120, size: 80, asset: 'ramuru-slash1', flipX: -1 },
      { x: 95, y: -20, size: 80, asset: 'ramuru-slash2', flipX: -1, rotation: -45 },
      { slamAsset: 'ramuru-slam', slamSize: 90, slamX: 95, slamY: -83 }
    ],
    guard: { asset: 'ramuru-guard', size: 150, x: 20, y: -70 },
    hasJumpSmoke: false,
    jumpDust: { asset: 'ramuru-dust', size: 150, x: 0, y: 0 },
    skills: {
      skill1: { asset: 'ramuru-dash', size: 350, x: 0, y: 0, dustAsset: 'ramuru-dust', dustSize: 250, dustX: -30, dustY: -10, life: 0.25 },
      skill2: { asset: 'ramuru-bind', size: 250, x: 60, y: -60, warningAsset: 'ramuru-warning', warningSize: 280, warningX: 10, warningY: -20, castAsset: 'ramuru-cast', castSize: 220 },
      ultimate: {
        auraAsset: 'ramuru-ultaura', auraSize: 250, auraX: 120, auraY: -100,
        envAsset: 'ramuru-ultenv', envSize: 550, envOffsetX: 30, envY: 410
      }
    }
  };
  const ultimate = {
    start(actor, context) {
      return { t: 0, owner: actor === context.hero ? 'player' : 'enemy', facing: actor.facing, casterX: actor.x, phase: 'cutin', hit: false, auraSpawned: false, envFx: null };
    },
    update(dt, s, context) {
      if (!s) return null;
      const isVoicePlaying = context.isVoicePlaying('ramuru', s.owner);
      if (s.t < 0.78 || s.effectsSpawned) {
        if (s.t >= 0.77 && s.t < 0.78 && isVoicePlaying) {
          // Pause s.t so cutin remains alive
        } else {
          s.t += dt;
        }
      } else {
        s.t += dt;
      }

      const a = s.owner === 'enemy' ? context.dummy : context.hero;
      const target = s.owner === 'enemy' ? context.hero : context.dummy;

      s.phase = s.t < .78 ? 'cutin' : 'active';

      const voiceGone = !context.isVoicePlaying('ramuru', s.owner);
      if (voiceGone && !s.effectsSpawned && s.t > 1.0) {
        s.effectsSpawned = true;
        s.effectsT = 0;

        const cfg = window.Ramuru.vfx.skills.ultimate || {};

        s.auraFx = { type: 'ramuru-fx', asset: cfg.auraAsset || 'ramuru-ultaura', x: a.x + (cfg.auraX || 0) * a.facing, y: a.y + (cfg.auraY || -100), facing: a.facing, life: 1.5, maxLife: 1.5, size: cfg.auraSize || 350, bindTo: a, offsetX: cfg.auraX || 0, offsetY: cfg.auraY || -100, behind: true };
        context.effects.push(s.auraFx);

        s.envFx = { type: 'ramuru-fx', asset: cfg.envAsset || 'ramuru-ultenv', x: target.x + (cfg.envOffsetX || 0) * a.facing, y: cfg.envY || 360, facing: 1, life: 1.5, maxLife: 1.5, size: cfg.envSize || 1280, behind: true };
        context.effects.push(s.envFx);

        target.vy = -100; target.vx = a.facing * 300; target.y = context.groundY - 10; target.grounded = false;
        if (target.hurtTime !== undefined) target.hurtTime = 0;
        context.spawnParticles(target.x, target.y - 60, '#00bfff', 60, 500);
        target.invuln = 0;
        const damage = getBal()?.ultimate?.damage ?? 35;
        if (s.owner === 'enemy') context.receiveHit(damage, { freeze: false, knockdown: true, ultContext: true });
        else context.hitDummy(damage, 400, '#00bfff', a.x, target.y - 80, true, false, 1, 0, true);
        if (!target.isBlocking) context.sound('heavy');
      }

      if (s.effectsSpawned) {
        s.effectsT += dt;
        if (s.effectsT < 1.5) {
          const fadeOut = s.effectsT > 1.0 ? (1.5 - s.effectsT) / 0.5 : 1.0;
          context.addTrauma(0.05 * fadeOut);
        }
        if (s.effectsT >= 1.8) return null;
      }

      if (s.t > 9.0) return null;
      return s;
    }
  };
  function refund(a) {
    for (const n of Object.keys(balance.cooldowns))
      a.cooldowns[n] = Math.max(0, a.cooldowns[n] - balance.cooldowns[n] * balance.basicRefund);
  }
  window.Ramuru = {
    audio: {
      skill1: 'assets/ramuru/audio/ramuru-skill1.mp3',
      skill2: 'assets/ramuru/audio/ramuru-skill2.mp3',
      ultimate: 'assets/ramuru/audio/ramuru-ultimate.mp3',
      hit: null
    },
    balance, names, combo, vfx, ultimate, move, start, refund
  };
})();
