# Sprite Consistency Prompt Guide

> Dokumen ini berisi **prompt tambahan universal** yang harus ditempel di bagian
> **atas setiap request** strip animasi ke ChatGPT / image AI, **terpisah** dari
> prompt deskripsi karakter atau gerakan.
>
> Tujuannya: mencegah AI menghasilkan frame yang ukuran karakternya tidak konsisten
> di dalam satu baris (satu strip 4 frame).

---

## Masalah yang Ingin Dicegah

| Masalah | Dampak |
|---|---|
| Karakter frame 1 lebih besar dari frame 2 | Saat dianimasikan terlihat "berkedut" / pop |
| Kaki karakter di posisi Y berbeda tiap frame | Karakter terlihat "melayang" atau "tenggelam" |
| AI zoom-in di frame aksi dramatis | Karakter tiba-tiba membesar saat menyerang |
| Efek partikel/cahaya ikut terhitung dalam bounding box | Pipeline potong salah ukur, karakter kelihatan kecil |

---

## Prompt Tambahan Universal

Tempel blok ini **sebelum** deskripsi animasi / karakter:

```
STRICT SPRITE CONSISTENCY RULES — apply to EVERY frame in this strip:

1. SCALE LOCK
   The character's body size must be IDENTICAL across all frames.
   If the character body is 70% of the image height in frame 1,
   it must also be exactly 70% in frames 2, 3, and 4.
   Do NOT resize or zoom the character between frames.

2. FOOT ANCHOR
   The character's feet (ground contact point) must be at the SAME
   Y-position in every frame — anchored at the bottom 8–12% of
   the image height. The body always extends UPWARD from this fixed point.

3. HEAD HEIGHT CONSISTENCY
   The top of the character's head should reach approximately the same
   Y-level across all frames. Extended arms, weapons, or effects may go
   higher, but the HEAD position must remain consistent.

4. NO AUTO-ZOOM
   Do not zoom in or out between frames regardless of the action intensity.
   Treat every frame as a fixed-distance camera shot.

5. CANVAS FILL
   The character occupies the same horizontal proportion of the canvas
   in each frame. Do not shrink or enlarge the character to "fit the action."

6. EFFECTS ARE ADDITIVE
   Energy blasts, trails, glows, or particles extend BEYOND the character,
   they do NOT replace the character body or shrink it.
   The character body must always be clearly visible at full scale.

7. BACKGROUND
   Solid flat magenta (#FF00FF) — no gradients, no shadows cast onto
   the background, no anti-aliasing bleed into the background color.
```

---

## Variasi per Jenis Animasi

### Strip Aksi Dramatis (skill, ultimate, attack finisher)

Tambahkan setelah blok utama:

```
For dramatic action frames (energy blasts, spin attacks, finishers):
- Character body scale does NOT change even during peak action.
- Effects and particles extend outward from the body but the body
  itself remains at full, consistent scale.
- Do not "pull back the camera" to show the full effect area.
```

### Strip Membungkuk Bertahap (crouch, slide, land)

```
For crouching/sliding animations:
- The character's body NATURALLY gets shorter as they crouch lower.
- Use SHOULDER WIDTH as the constant size reference (not body height).
- Feet remain anchored to the same ground level across all frames.
- Each frame should progressively lower the center of mass toward
  the ground, with frame 4 being the lowest pose.
```

### Strip Bangkit dari Lantai (recover, get-up)

```
For recovery/get-up animations:
- Frame 1: character is closest to the ground (smallest vertical extent).
- Frames progress from ground level upward to standing.
- The character's scale (not pose) must remain constant — only the
  pose changes, the body size does not.
```

### Frame Tunggal (jump, doublejump, landing)

```
Single frame only.
Character body must match the scale used in all other strips for
this character — same apparent body height, same foot anchor position.
```

---

## Template Lengkap (Copy-Paste Siap Pakai)

```
STRICT SPRITE CONSISTENCY RULES — apply to EVERY frame in this strip:

1. SCALE LOCK: Character body size identical across all frames (no zoom/resize).
2. FOOT ANCHOR: Feet at the same Y-position every frame, bottom 8–12% of image.
3. HEAD HEIGHT: Head reaches same Y-level in every frame.
4. NO AUTO-ZOOM: Fixed camera distance throughout.
5. CANVAS FILL: Same horizontal proportion every frame.
6. EFFECTS ADDITIVE: Effects extend beyond body; body always visible at full scale.
7. BACKGROUND: Solid #FF00FF, no gradients, no shadow bleed.

---

[TEMPEL PROMPT ANIMASI SPESIFIK DI SINI]

Character: [nama & deskripsi karakter]
Animation: [nama animasi]
Frames: 4 horizontal frames, left to right
  Frame 1: [pose awal]
  Frame 2: [pose tengah]
  Frame 3: [pose aksi]
  Frame 4: [pose akhir / recovery]

Canvas size: 1792 × 512 px (each frame = 448 × 512 px)
Background: solid magenta #FF00FF
Style: dynamic 2D game sprite, high contrast, clean outlines
```

---

## Catatan Teknis Pipeline

- **Ukuran canvas per frame:** `448 × 512 px` (rasio ~1:1.14 per frame, 16:9 total strip)
- **Ukuran atlas akhir per cell:** `448 × 288 px` setelah di-compose
- **Chroma key:** magenta `#FF00FF` — jangan gunakan warna ini di bagian karakter
- **Batas aman karakter:** karakter harus berada dalam area `428 × 492 px`
  (masing-masing 10 px margin dari tepi)
- **Target tinggi karakter berdiri:** sekitar `65–70%` tinggi frame
  (≈340 px dari 512 px canvas height)

---

## Kenapa Ini Penting

Saat pipeline `sprite-gen extract` memotong karakter dari strip:
1. Ia mendeteksi piksel non-magenta sebagai "karakter"
2. Ia mengukur bounding box per frame
3. Jika satu frame punya karakter lebih kecil, `compose-atlas` akan menempatkannya
   lebih kecil di atlas → karakter terlihat berubah ukuran saat dianimasikan di game

Dengan menjaga konsistensi dari sumber gambarnya, masalah ini **tidak perlu di-fix
secara manual** setelah generate.

---

*Dibuat berdasarkan pengalaman generate karakter Yanfah — 2026-10-01*
