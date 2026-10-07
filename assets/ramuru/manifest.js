window.RAMURU_MANIFEST = {
  "characterId": "yanfah",
  "engine": "component-row",
  "game_input": "sprite-sheet-alpha.webp",
  "degraded_static_fallback": false,
  "curation_applied": false,
  "frame_variant": "hd",
  "sprite_sheet_alpha": "sprite-sheet-alpha.png",
  "base_image": "base-source.webp",
  "cell": {
    "shape": "rect",
    "width": 448,
    "height": 288,
    "safe_margin_x": 10,
    "safe_margin_y": 8
  },
  "chroma_key": {
    "name": "magenta",
    "hex": "#FF00FF",
    "rgb": [
      255,
      0,
      255
    ],
    "selection": "manual"
  },
  "animation": {
    "cellWidth": 448,
    "cellHeight": 288,
    "columns": 4,
    "rows": {
      "idle": {
        "row": 0,
        "frames": 4,
        "fps": 5,
        "durations_ms": [
          200,
          200,
          200,
          200
        ],
        "loop": true,
        "frame_variant": "hd"
      },
      "walk": {
        "row": 1,
        "frames": 4,
        "fps": 9,
        "durations_ms": [
          111,
          111,
          111,
          111
        ],
        "loop": true,
        "frame_variant": "hd"
      },
      "run": {
        "row": 2,
        "frames": 4,
        "fps": 11,
        "durations_ms": [
          91,
          91,
          91,
          91
        ],
        "loop": true,
        "frame_variant": "hd"
      },
      "jump": {
        "row": 3,
        "frames": 1,
        "fps": 10,
        "durations_ms": [
          100
        ],
        "loop": false,
        "frame_variant": "hd"
      },
      "doublejump": {
        "row": 4,
        "frames": 1,
        "fps": 12,
        "durations_ms": [
          83
        ],
        "loop": false,
        "frame_variant": "hd"
      },
      "crouch": {
        "row": 5,
        "frames": 4,
        "fps": 8,
        "durations_ms": [
          125,
          125,
          125,
          125
        ],
        "loop": false,
        "frame_variant": "hd"
      },
      "attack1": {
        "row": 6,
        "frames": 4,
        "fps": 12,
        "durations_ms": [
          83,
          83,
          83,
          83
        ],
        "loop": false,
        "frame_variant": "hd"
      },
      "attack2": {
        "row": 7,
        "frames": 4,
        "fps": 12,
        "durations_ms": [
          83,
          83,
          83,
          83
        ],
        "loop": false,
        "frame_variant": "hd"
      },
      "attack3": {
        "row": 8,
        "frames": 4,
        "fps": 10,
        "durations_ms": [
          100,
          100,
          100,
          100
        ],
        "loop": false,
        "frame_variant": "hd"
      },
      "skill1": {
        "row": 9,
        "frames": 4,
        "fps": 10,
        "durations_ms": [
          100,
          100,
          100,
          100
        ],
        "loop": false,
        "frame_variant": "hd"
      },
      "skill2": {
        "row": 10,
        "frames": 4,
        "fps": 10,
        "durations_ms": [
          100,
          100,
          100,
          100
        ],
        "loop": false,
        "frame_variant": "hd"
      },
      "ultimate": {
        "row": 11,
        "frames": 4,
        "fps": 8,
        "durations_ms": [
          125,
          125,
          125,
          125
        ],
        "loop": false,
        "frame_variant": "hd"
      },
      "hurt": {
        "row": 12,
        "frames": 4,
        "fps": 10,
        "durations_ms": [
          100,
          100,
          100,
          100
        ],
        "loop": false,
        "frame_variant": "hd"
      },
      "down": {
        "row": 13,
        "frames": 4,
        "fps": 8,
        "durations_ms": [
          125,
          125,
          125,
          125
        ],
        "loop": false,
        "frame_variant": "hd"
      },
      "recover": {
        "row": 14,
        "frames": 4,
        "fps": 10,
        "durations_ms": [
          100,
          100,
          100,
          100
        ],
        "loop": false,
        "frame_variant": "hd"
      }
    }
  },
  "frame_layout": {
    "sheetWidth": 1792,
    "sheetHeight": 4320,
    "cellWidth": 448,
    "cellHeight": 288,
    "rows": {
      "idle": [
        {
          "x": 0,
          "y": 0,
          "w": 448,
          "h": 288
        },
        {
          "x": 448,
          "y": 0,
          "w": 448,
          "h": 288
        },
        {
          "x": 896,
          "y": 0,
          "w": 448,
          "h": 288
        },
        {
          "x": 1344,
          "y": 0,
          "w": 448,
          "h": 288
        }
      ],
      "walk": [
        {
          "x": 0,
          "y": 288,
          "w": 448,
          "h": 288
        },
        {
          "x": 448,
          "y": 288,
          "w": 448,
          "h": 288
        },
        {
          "x": 896,
          "y": 288,
          "w": 448,
          "h": 288
        },
        {
          "x": 1344,
          "y": 288,
          "w": 448,
          "h": 288
        }
      ],
      "run": [
        {
          "x": 0,
          "y": 576,
          "w": 448,
          "h": 288
        },
        {
          "x": 448,
          "y": 576,
          "w": 448,
          "h": 288
        },
        {
          "x": 896,
          "y": 576,
          "w": 448,
          "h": 288
        },
        {
          "x": 1344,
          "y": 576,
          "w": 448,
          "h": 288
        }
      ],
      "jump": [
        {
          "x": 0,
          "y": 864,
          "w": 448,
          "h": 288
        }
      ],
      "doublejump": [
        {
          "x": 0,
          "y": 1152,
          "w": 448,
          "h": 288
        }
      ],
      "crouch": [
        {
          "x": 0,
          "y": 1440,
          "w": 448,
          "h": 288
        },
        {
          "x": 448,
          "y": 1440,
          "w": 448,
          "h": 288
        },
        {
          "x": 896,
          "y": 1440,
          "w": 448,
          "h": 288
        },
        {
          "x": 1344,
          "y": 1440,
          "w": 448,
          "h": 288
        }
      ],
      "attack1": [
        {
          "x": 0,
          "y": 1728,
          "w": 448,
          "h": 288
        },
        {
          "x": 448,
          "y": 1728,
          "w": 448,
          "h": 288
        },
        {
          "x": 896,
          "y": 1728,
          "w": 448,
          "h": 288
        },
        {
          "x": 1344,
          "y": 1728,
          "w": 448,
          "h": 288
        }
      ],
      "attack2": [
        {
          "x": 0,
          "y": 2016,
          "w": 448,
          "h": 288
        },
        {
          "x": 448,
          "y": 2016,
          "w": 448,
          "h": 288
        },
        {
          "x": 896,
          "y": 2016,
          "w": 448,
          "h": 288
        },
        {
          "x": 1344,
          "y": 2016,
          "w": 448,
          "h": 288
        }
      ],
      "attack3": [
        {
          "x": 0,
          "y": 2304,
          "w": 448,
          "h": 288
        },
        {
          "x": 448,
          "y": 2304,
          "w": 448,
          "h": 288
        },
        {
          "x": 896,
          "y": 2304,
          "w": 448,
          "h": 288
        },
        {
          "x": 1344,
          "y": 2304,
          "w": 448,
          "h": 288
        }
      ],
      "skill1": [
        {
          "x": 0,
          "y": 2592,
          "w": 448,
          "h": 288
        },
        {
          "x": 448,
          "y": 2592,
          "w": 448,
          "h": 288
        },
        {
          "x": 896,
          "y": 2592,
          "w": 448,
          "h": 288
        },
        {
          "x": 1344,
          "y": 2592,
          "w": 448,
          "h": 288
        }
      ],
      "skill2": [
        {
          "x": 0,
          "y": 2880,
          "w": 448,
          "h": 288
        },
        {
          "x": 448,
          "y": 2880,
          "w": 448,
          "h": 288
        },
        {
          "x": 896,
          "y": 2880,
          "w": 448,
          "h": 288
        },
        {
          "x": 1344,
          "y": 2880,
          "w": 448,
          "h": 288
        }
      ],
      "ultimate": [
        {
          "x": 0,
          "y": 3168,
          "w": 448,
          "h": 288
        },
        {
          "x": 448,
          "y": 3168,
          "w": 448,
          "h": 288
        },
        {
          "x": 896,
          "y": 3168,
          "w": 448,
          "h": 288
        },
        {
          "x": 1344,
          "y": 3168,
          "w": 448,
          "h": 288
        }
      ],
      "hurt": [
        {
          "x": 0,
          "y": 3456,
          "w": 448,
          "h": 288
        },
        {
          "x": 448,
          "y": 3456,
          "w": 448,
          "h": 288
        },
        {
          "x": 896,
          "y": 3456,
          "w": 448,
          "h": 288
        },
        {
          "x": 1344,
          "y": 3456,
          "w": 448,
          "h": 288
        }
      ],
      "down": [
        {
          "x": 0,
          "y": 3744,
          "w": 448,
          "h": 288
        },
        {
          "x": 448,
          "y": 3744,
          "w": 448,
          "h": 288
        },
        {
          "x": 896,
          "y": 3744,
          "w": 448,
          "h": 288
        },
        {
          "x": 1344,
          "y": 3744,
          "w": 448,
          "h": 288
        }
      ],
      "recover": [
        {
          "x": 0,
          "y": 4032,
          "w": 448,
          "h": 288
        },
        {
          "x": 448,
          "y": 4032,
          "w": 448,
          "h": 288
        },
        {
          "x": 896,
          "y": 4032,
          "w": 448,
          "h": 288
        },
        {
          "x": 1344,
          "y": 4032,
          "w": 448,
          "h": 288
        }
      ]
    }
  },
  "metrics": {
    "scale": 0.55
  }
};
window.RAMURU_METRICS = window.RAMURU_MANIFEST;