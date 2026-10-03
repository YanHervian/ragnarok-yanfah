# Template Prompt Sprite

Ganti bagian `<…>`. Tulis prompt dalam bahasa Inggris (model gambar paling patuh dengan bahasa Inggris).

## Prinsip

- **Deskripsi fisik karakter hanya ditulis lengkap di prompt base.** Di prompt strip, cukup "match reference 1
  exactly" + palet singkat. Deskripsi panjang di prompt strip bersaing dengan referensi dan mengubah identitas.
- **Prompt strip hanya tentang gerakan + aturan layout.**
- Sebut jumlah pose, arah hadap, "same scale / same ground line", dan larangan efek lepas di **setiap** strip.
- Minta tinggi karakter dalam persen tinggi gambar (mis. 60–70 %) supaya pose tidak terpotong dan ada jarak antar pose.

## Base

```
Game sprite, full-body side view of <deskripsi karakter: usia, peran>, standing in a relaxed idle pose,
facing RIGHT (side view as in a 2D side-scrolling platformer).
<Gaya: mis. Hi-bit pixel art like modern high-detail indie platformers: clean readable pixel clusters,
1px dark outline, soft hand-placed shading, NOT chunky low-res blocks, NOT blurry painting.>
Character design: <pakaian, warna utama, aksesori, senjata di tangan mana, perisai di tangan mana>.
<Proporsi: mis. about 4 heads tall>.
The whole body<, weapon, cape, hair> fully visible and uncropped, centered, occupying about 70% of the image
height, feet on an invisible ground line near the bottom.
Background: perfectly flat solid pure <magenta #FF00FF>, no gradient, no floor, no shadow, no text, no border.
Do not use any <pink, red or purple> on the character.
```

Setting: rasio 1:1, kualitas high. Generate 2–4 varian, pilih satu.

## Strip gerakan

Lampirkan: **referensi 1 = base**, **referensi 2 = layout guide (N kotak)**. Rasio: selebar yang didukung (mis. 21:9).

```
Create a single horizontal sprite strip for the 2D side-scrolling game character '<id>' in the state '<state>'.

Reference 1 = the canonical character design (identity). Reference 2 = layout guide, used ONLY for frame
count, slot spacing, centering and safe padding; never draw the guide itself.

Style contract: match reference 1 EXACTLY: same pixel density (logical pixel block size), same body
proportions, same outline weight, same palette (<palet singkat>), same shading, same detail level.
Do not restyle, do not change proportions. Same props: <senjata/aksesori + tangan>.

Animation action: <deskripsi gerakan per frame, lihat contoh di bawah>.

Rules: This row owns motion only; keep identity identical in every frame. No detached effects, no motion
lines, no smears, no afterimages, no glows, no floor shadows, no dust, no text, no labels, no frame numbers,
no grid, no scenery.

Layout: exactly <N> full-body poses, left to right, in one horizontal row, all facing RIGHT. Treat the image
as <N> equal-width invisible slots; center exactly one complete, uncropped pose in each slot, all at the
same scale and on the same ground line, each pose about <60–70>% of the image height, with clear
<magenta> gap between neighbouring poses. No pose (including <weapon/cape>) may touch or overlap a
neighbouring pose. Background: perfectly flat pure <magenta #FF00FF> across the whole image.
Do not use <magenta, pink, red or purple> on the character. Output only the sprite strip image.
```

## Contoh deskripsi gerakan

| State | Frame | Deskripsi |
|---|---|---|
| idle | 4 | subtle breathing: chest rises and falls, cape sways slightly, feet planted in the same place in every frame; frames 1 and 4 connect into a loop |
| walk | 6 | lihat blok "Walk yang kakinya benar-benar bergantian" di bawah |
| jump | 4 | 1 crouch anticipation, 2 takeoff (legs extending), 3 airborne apex (knees tucked), 4 falling (legs reaching down) |
| attack ringan | 4 | 1 wind-up (weapon pulled back), 2 swing forward, 3 full extension, 4 recover to guard; feet roughly in place |
| attack berat | 4 | 1 weapon raised high, 2 swinging down, 3 impact low in front, 4 recover |
| tusukan | 4 | 1 weapon pulled back at hip, 2 step forward, 3 full lunge straight forward, 4 back to guard |

### Walk yang kakinya benar-benar bergantian

Model sering menggambar 6 pose "kaki terbuka" yang mirip tanpa pergantian kaki. Sebut kaki mana di depan per
frame, dan lampirkan strip walk yang sudah benar (karakter lain boleh) sebagai **referensi 3 = gerakan saja**:

```
Reference 3 = a walk cycle of a different character: use it ONLY as a motion reference for how the legs
alternate (leg timing and foot contacts). Do NOT copy its character, armor, colors or weapon.

A TRUE ALTERNATING 6-frame walk cycle moving to the RIGHT. The two legs MUST swap: the far leg (his LEFT
leg, slightly darker) and the near leg (his RIGHT leg, lighter) take turns being in front:
- frame 1: CONTACT — near RIGHT leg forward with heel down, far LEFT leg behind on its toes, legs wide apart
- frame 2: DOWN — weight on the right leg, knee bent, left leg starting to lift behind
- frame 3: PASSING — left leg swinging forward and crossing next to the right leg, knees close together
- frame 4: CONTACT — far LEFT leg now forward, near RIGHT leg behind on its toes (mirror of frame 1)
- frame 5: DOWN — weight on the left leg, right leg lifting behind
- frame 6: PASSING — right leg swinging forward crossing next to the left leg, knees close together
In frames 3 and 6 the feet must be close together. In frames 1 and 4 a DIFFERENT leg is in front.
```

Generate 2 varian, cek dengan `measure_atlas.py` (baris "jarak kaki": harus lebar-rapat-lebar-rapat).

## Tips mengurangi frame beda ukuran sejak awal

- Tulis **"all at the same scale and on the same ground line"** dan **"about X% of the image height"** di setiap strip.
- Untuk idle, tulis **"feet planted in the same place in every frame"** — model cenderung "zoom" frame napas.
- Pose dengan senjata terangkat membuat model mengecilkan badan agar muat → minta persen tinggi yang
  sudah memperhitungkan senjata ("at most 70% including the raised sword").
- Tambahkan di strip aksi: **"the character's body and head must be exactly the same size as in reference 1;
  if the weapon does not fit, make the weapon overlap the slot padding — never shrink the character."**
  Tetap wajib diukur (sprite-qa.md) — kalimat ini mengurangi, bukan menghilangkan, masalahnya.
- Tetap anggap hasilnya **tidak** konsisten 100 %: selalu ukur (sprite-qa.md).
