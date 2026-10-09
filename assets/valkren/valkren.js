/* VALKREN moves: Heavy Anime Mecha */
(() => {
  'use strict';
  const getBal = () => window.GAME_BALANCE?.valkren;
  const atkSpd = () => getBal()?.movement?.attackSpeed ?? 1.0;

  const balance = {
    get cooldowns() {
      return {
        skill1: getBal()?.skill1?.cooldown ?? 12,
        skill2: getBal()?.skill2?.cooldown ?? 22,
        ultimate: getBal()?.ultimate?.cooldown ?? 40
      };
    },
    castTime: .8, basicRefund: .05
  };
  const names = ['SABETAN BERAT', 'TEMBAKAN PLASMA', 'HANTAMAN BUMI', 'SISTEM OVERDRIVE'];

  const combo = [
    { get damage() { return getBal()?.combo[0] ?? 10; }, knockback: 100, reach: 180, get duration() { return .45 * atkSpd(); }, hitAt: .6 },
    { get damage() { return getBal()?.combo[1] ?? 12; }, knockback: 120, reach: 160, get duration() { return .50 * atkSpd(); }, hitAt: .6 },
    { get damage() { return getBal()?.combo[2] ?? 25; }, knockback: 300, reach: 210, get duration() { return .70 * atkSpd(); }, hitAt: .65 }
  ];

  function move(name, index = 1) {
    if (name === 'attack') return { name: `attack${index}`, type: 'attack', index, ...combo[index - 1] };
    if (name === 'skill1') return { name, type: name, damage: getBal()?.skill1?.damage ?? 20, duration: .60, knockback: 80, projectile: true, speed: 1200, hitAt: .6 };
    if (name === 'skill2') return { name, type: name, damage: getBal()?.skill2?.damage ?? 35, duration: .80, knockback: 350, reach: 450, area: true, hitAt: .75 };
    return { name: 'ultimate', type: 'valkren-ult', duration: balance.castTime, damage: 0, hitAt: .5 };
  }

  function start(a, name, index = 1) {
    if (a.action || a.state === 'hurt' || a.state === 'down' || a.state === 'recover') return false;
    if (name !== 'attack' && a.cooldowns[name] > 0) return false;
    if (name !== 'attack') a.cooldowns[name] = balance.cooldowns[name];
    a.action = { ...move(name, index), t: 0, fired: false, queued: 0 }; a.state = a.action.name; a.stateTime = 0;

    if (name === 'skill1' && window.Valkren.audio.skill1) {
      try {
        const el = new Audio(window.Valkren.audio.skill1);
        const masterMult = typeof window.AUDIO_CONFIG?.master === 'number' ? window.AUDIO_CONFIG.master : 1.0;
        const skillMult = typeof window.AUDIO_CONFIG?.skills?.valkren?.skill1 === 'number' ? window.AUDIO_CONFIG.skills.valkren.skill1 : 1.0;
        const sfxVolumeConfig = Number(localStorage.getItem('aether.sfxVolume') || 90) / 100;
        el.volume = Math.max(0, Math.min(1, sfxVolumeConfig * masterMult * skillMult));
        el.play().catch(() => { });
      } catch (e) { }
    }
    if (name === 'skill2' && window.Valkren.audio.skill2) {
      try {
        const el = new Audio(window.Valkren.audio.skill2);
        const masterMult = typeof window.AUDIO_CONFIG?.master === 'number' ? window.AUDIO_CONFIG.master : 1.0;
        const skillMult = typeof window.AUDIO_CONFIG?.skills?.valkren?.skill2 === 'number' ? window.AUDIO_CONFIG.skills.valkren.skill2 : 1.0;
        const sfxVolumeConfig = Number(localStorage.getItem('aether.sfxVolume') || 90) / 100;
        el.volume = Math.max(0, Math.min(1, sfxVolumeConfig * masterMult * skillMult));
        el.play().catch(() => { });
      } catch (e) { }
    }

    return true;
  }

  const vfx = {
    attacks: [
      { x: 190, y: -155, size: 100, asset: 'valkren-meleeswipe', flipX: 1 },
      { x: 150, y: -350, size: 100, asset: 'valkren-meleeswipe', flipX: 1, rotation: -45 },
      { x: 110, y: -0, size: 100, asset: 'valkren-meleeswipe', flipX: 1, rotation: 90 }
    ],
    hasJumpSmoke: true
  };

  const ultimate = {
    start(actor, context) {
      return { t: 0, owner: actor === context.hero ? 'player' : 'enemy', facing: actor.facing, casterX: actor.x, phase: 'cutin', hit: false, auraSpawned: false, envFx: null };
    },
    update(dt, s, context) {
      if (!s) return null;
      const isVoicePlaying = context.isVoicePlaying('valkren', s.owner);
      if (s.t < 0.78 || s.effectsSpawned) {
        if (s.t >= 0.77 && s.t < 0.78 && isVoicePlaying) {
          // Pause s.t so cutin remains alive and doesn't default to Arco
        } else {
          s.t += dt;
        }
      } else {
        s.t += dt;
      }

      const a = s.owner === 'enemy' ? context.dummy : context.hero;
      const target = s.owner === 'enemy' ? context.hero : context.dummy;

      s.phase = s.t < .78 ? 'cutin' : 'active';

      // Saat voice masih bunyi = cutin masih di layar (voiceFreezing aktif di game.js)
      // Baru ketika voice SELESAI → cutin hilang → spawn kedua efek berbarengan
      const voiceGone = !context.isVoicePlaying('valkren', s.owner);
      if (voiceGone && !s.effectsSpawned && s.t > 1.0) {
        s.effectsSpawned = true;
        s.effectsT = 0;

        // Aura di sekitar karakter
        s.auraFx = { type: 'valkren-fx', asset: 'valkren-ultaura', x: a.x, y: a.y - 100, facing: a.facing, life: 1.5, maxLife: 1.5, size: 350, bindTo: a, offsetX: 0, offsetY: -100, behind: true };
        context.effects.push(s.auraFx);

        // Domain merah memenuhi layar
        const midX = (a.x + target.x) / 2;
        s.envFx = { type: 'valkren-fx', asset: 'valkren-ultenv', x: midX, y: 360, facing: 1, life: 1.5, maxLife: 1.5, size: 1280, behind: true };
        context.effects.push(s.envFx);

        // Damage
        target.vy = -100; target.vx = a.facing * 300; target.y = context.groundY - 10; target.grounded = false;
        if (target.hurtTime !== undefined) target.hurtTime = 0;
        context.spawnParticles(target.x, target.y - 60, '#ff0000', 60, 500);
        const dmg = getBal()?.ultimate?.damage ?? 60;
        if (s.owner === 'enemy') context.receiveHit(dmg, { freeze: false, knockdown: true, ultContext: true });
        else context.hitDummy(dmg, 400, '#ff0000', a.x, target.y - 80, true, false, 1, 0, true);
        if (!target.isBlocking) context.sound('heavy');
      }

      // Getaran layar: hanya saat efek aktif, memudar halus di 0.5 detik terakhir
      if (s.effectsSpawned) {
        s.effectsT += dt;
        if (s.effectsT < 1.5) {
          const fadeOut = s.effectsT > 1.0 ? (1.5 - s.effectsT) / 0.5 : 1.0;
          context.addTrauma(0.05 * fadeOut);
        }
        // Selesai setelah efek habis (+buffer sedikit)
        if (s.effectsT >= 1.8) return null;
      }

      // Safety timeout kalau voice tidak terpanggil
      if (s.t > 9.0) return null;

      return s;
    }
  };

  function refund(a) { for (const name of Object.keys(balance.cooldowns)) a.cooldowns[name] = Math.max(0, a.cooldowns[name] - balance.cooldowns[name] * balance.basicRefund); }

  window.Valkren = {
    audio: {
      skill1: 'assets/valkren/audio/valkren-skill1.mp3',
      skill2: 'assets/valkren/audio/valkren-skill2.mp3',
      ultimate: 'assets/valkren/audio/valkren-ultimate.mp3',
      hit: null
    }, balance, names, combo, vfx, ultimate, move, start, refund
  };
})();
