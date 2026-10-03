window.YANFAH_MANIFEST = {
  "characterId": "yanfah",
  "engine": "component-row",
  "game_input": "sprite-sheet-alpha.png",
  "degraded_static_fallback": false,
  "curation_applied": false,
  "frame_variant": "pixel",
  "sprite_sheet_alpha": "sprite-sheet-alpha.png",
  "sprite_sheet_alpha_report": "sprite-sheet-alpha.report.json",
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
        "fps": 60,
        "durations_ms": [
          16,
          16,
          16,
          16
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
        "row": 9,
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
        "scale": 1.3,
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
        "scale": 1.3,
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
        "scale": 1.3,
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
          "y": 2592,
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
  },
  "playback": {
    "jump": {
      "airFrame": 0,
      "torsoPivot": {
        "x": -20,
        "y": -90
      }
    },
    "doublejump": {
      "frame": 0,
      "duration": 0.28,
      "pivot": {
        "x": -15,
        "y": -60
      }
    }
  }
};

window.YANFAH_METRICS = {
  "characterId": "yanfah",
  "engine": "component-row",
  "game_input": "sprite-sheet-alpha.png",
  "degraded_static_fallback": false,
  "curation_applied": false,
  "frame_variant": "pixel",
  "sprite_sheet_alpha": "sprite-sheet-alpha.png",
  "sprite_sheet_alpha_report": "sprite-sheet-alpha.report.json",
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
        "fps": 60,
        "durations_ms": [
          16,
          16,
          16,
          16
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
        "scale": 1.3,
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
        "scale": 1.3,
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
        "scale": 1.3,
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
  },
  "playback": {
    "jump": {
      "airFrame": 0,
      "torsoPivot": {
        "x": -20,
        "y": -90
      }
    },
    "doublejump": {
      "frame": 0,
      "duration": 0.28,
      "pivot": {
        "x": -15,
        "y": -60
      }
    }
  }
};