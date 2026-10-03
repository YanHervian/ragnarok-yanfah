window.DHYLA_MANIFEST = {
  "characterId": "dhyla",
  "engine": "component-row",
  "game_input": "sprite-sheet-alpha.png",
  "degraded_static_fallback": false,
  "curation_applied": false,
  "frame_variant": "pixel",
  "sprite_sheet_alpha": "sprite-sheet-alpha.png",
  "sprite_sheet_alpha_report": "sprite-sheet-alpha.report.json",
  "base_image": "base-source.jpg",
  "cell": {
    "shape": "rect",
    "width": 179,
    "height": 204,
    "safe_margin_x": 4,
    "safe_margin_y": 3
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
        "frame_variant": "pixel"
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
        "frame_variant": "pixel"
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
        "frame_variant": "pixel"
      },
      "jump": {
        "row": 3,
        "frames": 1,
        "fps": 10,
        "durations_ms": [
          100
        ],
        "loop": false,
        "frame_variant": "pixel"
      },
      "doublejump": {
        "row": 4,
        "frames": 1,
        "fps": 12,
        "durations_ms": [
          83
        ],
        "loop": false,
        "frame_variant": "pixel"
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
        "frame_variant": "pixel"
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
        "frame_variant": "pixel"
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
        "frame_variant": "pixel"
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
        "frame_variant": "pixel"
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
        "frame_variant": "pixel"
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
        "frame_variant": "pixel"
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
        "frame_variant": "pixel"
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
        "frame_variant": "pixel"
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
        "frame_variant": "pixel"
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
        "frame_variant": "pixel"
      }
    }
  },
  "frame_layout": {
    "sheetWidth": 716,
    "sheetHeight": 3072,
    "cellWidth": 179,
    "cellHeight": 204,
    "rows": {
      "idle": [
        {
          "x": 0,
          "y": 0,
          "w": 179,
          "h": 204
        },
        {
          "x": 179,
          "y": 0,
          "w": 179,
          "h": 204
        },
        {
          "x": 358,
          "y": 0,
          "w": 179,
          "h": 204
        },
        {
          "x": 537,
          "y": 0,
          "w": 179,
          "h": 204
        }
      ],
      "walk": [
        {
          "x": 0,
          "y": 204,
          "w": 179,
          "h": 204
        },
        {
          "x": 179,
          "y": 204,
          "w": 179,
          "h": 204
        },
        {
          "x": 358,
          "y": 204,
          "w": 179,
          "h": 204
        },
        {
          "x": 537,
          "y": 204,
          "w": 179,
          "h": 204
        }
      ],
      "run": [
        {
          "x": 0,
          "y": 408,
          "w": 179,
          "h": 204
        },
        {
          "x": 179,
          "y": 408,
          "w": 179,
          "h": 204
        },
        {
          "x": 358,
          "y": 408,
          "w": 179,
          "h": 204
        },
        {
          "x": 537,
          "y": 408,
          "w": 179,
          "h": 204
        }
      ],
      "jump": [
        {
          "x": 0,
          "y": 612,
          "w": 179,
          "h": 204
        }
      ],
      "doublejump": [
        {
          "x": 0,
          "y": 816,
          "w": 179,
          "h": 204
        }
      ],
      "crouch": [
        {
          "x": 0,
          "y": 1020,
          "w": 179,
          "h": 204
        },
        {
          "x": 179,
          "y": 1020,
          "w": 179,
          "h": 204
        },
        {
          "x": 358,
          "y": 1020,
          "w": 179,
          "h": 204
        },
        {
          "x": 537,
          "y": 1020,
          "w": 179,
          "h": 204
        }
      ],
      "attack1": [
        {
          "x": 0,
          "y": 1224,
          "w": 179,
          "h": 204
        },
        {
          "x": 179,
          "y": 1224,
          "w": 179,
          "h": 204
        },
        {
          "x": 358,
          "y": 1224,
          "w": 179,
          "h": 204
        },
        {
          "x": 537,
          "y": 1224,
          "w": 179,
          "h": 204
        }
      ],
      "attack2": [
        {
          "x": 0,
          "y": 1428,
          "w": 179,
          "h": 204
        },
        {
          "x": 179,
          "y": 1428,
          "w": 179,
          "h": 204
        },
        {
          "x": 358,
          "y": 1428,
          "w": 179,
          "h": 204
        },
        {
          "x": 537,
          "y": 1428,
          "w": 179,
          "h": 204
        }
      ],
      "attack3": [
        {
          "x": 0,
          "y": 1632,
          "w": 179,
          "h": 204
        },
        {
          "x": 179,
          "y": 1632,
          "w": 179,
          "h": 204
        },
        {
          "x": 358,
          "y": 1632,
          "w": 179,
          "h": 204
        },
        {
          "x": 537,
          "y": 1632,
          "w": 179,
          "h": 204
        }
      ],
      "skill1": [
        {
          "x": 0,
          "y": 1836,
          "w": 179,
          "h": 204
        },
        {
          "x": 179,
          "y": 1836,
          "w": 179,
          "h": 204
        },
        {
          "x": 358,
          "y": 1836,
          "w": 179,
          "h": 204
        },
        {
          "x": 537,
          "y": 1836,
          "w": 179,
          "h": 204
        }
      ],
      "skill2": [
        {
          "x": 0,
          "y": 2040,
          "w": 179,
          "h": 204
        },
        {
          "x": 179,
          "y": 2040,
          "w": 179,
          "h": 204
        },
        {
          "x": 358,
          "y": 2040,
          "w": 179,
          "h": 204
        },
        {
          "x": 537,
          "y": 2040,
          "w": 179,
          "h": 204
        }
      ],
      "ultimate": [
        {
          "x": 0,
          "y": 2244,
          "w": 179,
          "h": 204
        },
        {
          "x": 179,
          "y": 2244,
          "w": 179,
          "h": 204
        },
        {
          "x": 358,
          "y": 2244,
          "w": 179,
          "h": 204
        },
        {
          "x": 537,
          "y": 2244,
          "w": 179,
          "h": 204
        }
      ],
      "hurt": [
        {
          "x": 0,
          "y": 2448,
          "w": 179,
          "h": 204
        },
        {
          "x": 179,
          "y": 2448,
          "w": 179,
          "h": 204
        },
        {
          "x": 358,
          "y": 2448,
          "w": 179,
          "h": 204
        },
        {
          "x": 537,
          "y": 2448,
          "w": 179,
          "h": 204
        }
      ],
      "down": [
        {
          "x": 0,
          "y": 2652,
          "w": 179,
          "h": 204
        },
        {
          "x": 179,
          "y": 2652,
          "w": 179,
          "h": 204
        },
        {
          "x": 358,
          "y": 2652,
          "w": 179,
          "h": 204
        },
        {
          "x": 537,
          "y": 2652,
          "w": 179,
          "h": 204
        }
      ],
      "recover": [
        {
          "x": 0,
          "y": 2856,
          "w": 179,
          "h": 204
        },
        {
          "x": 179,
          "y": 2856,
          "w": 179,
          "h": 204
        },
        {
          "x": 358,
          "y": 2856,
          "w": 179,
          "h": 204
        },
        {
          "x": 537,
          "y": 2856,
          "w": 179,
          "h": 204
        }
      ]
    }
  }
};

window.DHYLA_METRICS = window.DHYLA_MANIFEST;
