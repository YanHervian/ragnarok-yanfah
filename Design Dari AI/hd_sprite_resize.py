#!/usr/bin/env python3
"""
hd_sprite_resize.py - kecilkan baris sprite AI (background magenta) jadi frame HD
tanpa fringe magenta dan tanpa tepi bergerigi.

Urutan (jangan diubah):
  1. key magenta di resolusi PENUH -> alpha lembut + despill
  2. pisahkan frame (berdasarkan kolom kosong)
  3. kecilkan dalam bentuk premultiplied alpha (LANCZOS)
  4. un-premultiply, pertegas alpha sedikit
  5. letakkan di sel: kaki sejajar (foot-centroid), dasar sama (bottom)

Contoh:
  python hd_sprite_resize.py idle.png --frames 4 --cell 448x288 --margin 10x8 --out out/idle
  # skala sama untuk SEMUA state (disarankan): hitung dulu, lalu pakai --scale
  python hd_sprite_resize.py attack.png --frames 4 --scale 0.38 --out out/attack
"""
import argparse
import os

import numpy as np
from PIL import Image

MAGENTA = np.array([255, 0, 255], np.float32)


def key_despill(img, lo=60.0, hi=170.0):
    """Alpha lembut dari jarak ke magenta + buang sisa magenta di warna tepi."""
    rgb = np.asarray(img.convert("RGB")).astype(np.float32)
    dist = np.linalg.norm(rgb - MAGENTA, axis=2)
    alpha = np.clip((dist - lo) / (hi - lo), 0.0, 1.0)
    # despill: kelebihan R dan B terhadap G = jejak magenta
    spill = np.clip(np.minimum(rgb[..., 0], rgb[..., 2]) - rgb[..., 1], 0, None)
    # hanya di zona tepi (alpha belum penuh) supaya warna asli di dalam tidak berubah
    edge = (alpha < 0.999)[..., None]
    rgb = rgb - np.where(edge, np.dstack([spill, np.zeros_like(spill), spill]), 0)
    return np.clip(rgb, 0, 255), alpha


def split_frames(alpha, n, min_gap=6, thresh=0.05):
    """Pisahkan frame lewat kolom kosong. Gagal keras kalau jumlahnya tidak cocok."""
    cols = (alpha > thresh).any(axis=0)
    spans, start, gap = [], None, 0
    for x, on in enumerate(cols):
        if on:
            if start is None:
                start = x
            gap = 0
            end = x
        elif start is not None:
            gap += 1
            if gap >= min_gap:
                spans.append((start, end + 1))
                start = None
    if start is not None:
        spans.append((start, end + 1))
    if len(spans) != n:
        raise SystemExit(
            f"Ditemukan {len(spans)} frame, diminta {n}. Frame bertumpuk? "
            "Turunkan --min-gap atau pakai ekstraktor komponen bawaan engine."
        )
    return spans


def trim(rgb, alpha, x0, x1):
    a = alpha[:, x0:x1]
    ys = np.where((a > 0.02).any(axis=1))[0]
    y0, y1 = ys[0], ys[-1] + 1
    return rgb[y0:y1, x0:x1], a[y0:y1]


def resize_premult(rgb, alpha, scale):
    h, w = alpha.shape
    nw, nh = max(1, round(w * scale)), max(1, round(h * scale))
    pre = [rgb[..., i] * alpha for i in range(3)] + [alpha * 255.0]
    out = [
        np.asarray(
            Image.fromarray(c.astype(np.float32), "F").resize((nw, nh), Image.Resampling.LANCZOS)
        )
        for c in pre
    ]
    a = np.clip(out[3] / 255.0, 0, 1)
    rgb_s = np.clip(np.dstack(out[:3]) / np.maximum(a[..., None], 1e-3), 0, 255)
    a = np.clip((a - 0.15) / 0.70, 0, 1)  # pertegas tepi: buang halo tipis
    return np.dstack([rgb_s, a * 255]).astype(np.uint8)


def foot_centroid_x(rgba):
    a = rgba[..., 3].astype(np.float32)
    h = a.shape[0]
    band = a[int(h * 0.8):]
    if band.sum() < 1:
        band = a
    xs = np.arange(a.shape[1], dtype=np.float32)
    return float((band.sum(axis=0) * xs).sum() / max(band.sum(), 1e-3))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("raw")
    ap.add_argument("--frames", type=int, required=True)
    ap.add_argument("--cell", default="448x288")
    ap.add_argument("--margin", default="10x8")
    ap.add_argument("--scale", type=float, default=None, help="skala tetap (sama untuk semua state)")
    ap.add_argument("--min-gap", type=int, default=6)
    ap.add_argument("--lo", type=float, default=60.0)
    ap.add_argument("--hi", type=float, default=170.0)
    ap.add_argument("--out", required=True, help="prefix output, mis. out/idle")
    args = ap.parse_args()

    cw, ch = map(int, args.cell.lower().split("x"))
    mx, my = map(int, args.margin.lower().split("x"))

    rgb, alpha = key_despill(Image.open(args.raw), args.lo, args.hi)
    crops = [trim(rgb, alpha, a, b) for a, b in split_frames(alpha, args.frames, args.min_gap)]

    inner_w, inner_h = cw - 2 * mx, ch - 2 * my
    max_w = max(c[1].shape[1] for c in crops)
    max_h = max(c[1].shape[0] for c in crops)
    fit = min(inner_w / max_w, inner_h / max_h)
    scale = args.scale if args.scale else fit
    if scale > fit + 1e-6:
        print(f"PERINGATAN: --scale {scale:.3f} melebihi batas muat {fit:.3f}; frame terbesar akan terpotong.")
    print(f"skala dipakai: {scale:.4f} (batas muat sel: {fit:.4f})")

    os.makedirs(os.path.dirname(args.out) or ".", exist_ok=True)
    for i, (c_rgb, c_alpha) in enumerate(crops):
        small = resize_premult(c_rgb, c_alpha, scale)
        sh, sw = small.shape[:2]
        cell = np.zeros((ch, cw, 4), np.uint8)
        fx = foot_centroid_x(small)
        ox = int(round(cw / 2 - fx))
        oy = ch - my - sh  # kaki sejajar di dasar
        # klip ke dalam sel
        sx0, sy0 = max(0, -ox), max(0, -oy)
        dx0, dy0 = max(0, ox), max(0, oy)
        w = min(sw - sx0, cw - dx0)
        h = min(sh - sy0, ch - dy0)
        if w > 0 and h > 0:
            cell[dy0:dy0 + h, dx0:dx0 + w] = small[sy0:sy0 + h, sx0:sx0 + w]
        Image.fromarray(cell, "RGBA").save(f"{args.out}-{i:02d}.png")
    print(f"selesai: {len(crops)} frame -> {args.out}-NN.png")


if __name__ == "__main__":
    main()
