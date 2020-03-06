
import colors from "../components/Layout/colors"
import theme from "../components/Layout/theme"

const scene = {
  "global": {
    "language": "en",
    currentDate: "",
    currentDataType: 0,
    prefix: "",
    "max": 1,
    language_text_source: `|
      function() {
        return (global.language && feature['name:'+global.language]) || feature.name
      }
    `
  },
  "scene": {
    "animated": true,
    "background": {
      "color": colors.gray[50],
    }
  },
  "sources": {
    "here": {
      "type": "MVT",
      "url": `https://vector.hereapi.com/v2/vectortiles/base/mc/{z}/{x}/{y}/omv?apiKey=${process.env.GATSBY_API_KEY}`
    },
    "provinces": {
      "url": `https://xyz.api.here.com/hub/spaces/${process.env.GATSBY_PROVINCES_SPACE_ID}/tile/web/{z}_{x}_{y}`,
      "url_params": {
        "access_token": process.env.GATSBY_ACCESS_TOKEN,
      },
      "type": "GeoJSON"
    },
    "province_borders": {
      "url": `https://xyz.api.here.com/hub/spaces/${process.env.GATSBY_PROVINCE_BORDERS_SPACE_ID}/tile/web/{z}_{x}_{y}`,
      "url_params": {
        "access_token": process.env.GATSBY_ACCESS_TOKEN,
      },
      "type": "GeoJSON"
    }
  },

  "styles": {
    "_custom_cases": {
      "base": "points",
      "blend": "overlay",
    },
    "_custom_cases2": {
      "base": "points",
      "blend": "overlay",
    }
  },

  "layers": {
    "highways": {
      "data": {
        "source": "here",
        "layer": "roads"
      },
      "filter": {
        "all": [
          {
            "$geometry": "line",
            "kind": "highway",
          },
          {
            "$zoom": {
              "min": 5,
              "max": 12
            }
          }
        ]
      },
      "draw": {
        "lines": {
          "order": 200,
          "color": colors.gray[200],
          "width": "1px",
        }
      }
    },
    "highway-labels": {
      "data": {
        "source": "here",
        "layer": "road_labels"
      },
      "filter": {
        "all": [
          {
            "$geometry": "line"
          },
          {
            "$zoom": {
              "min": 4,
              "max": 12
            }
          }
        ]
      },
      "draw": {
        "text": {
          text_source: "global.language_text_source",
          "font": {
            "family": theme.fonts.mono,
            "size": "12px",
            // "size": [ [3, "10px"], [8, "16px"]],
            "weight": 600,
            "fill": colors.gray[500],
            "stroke": {
              "color": [
                255,
                255,
                255,
                0.5
              ],
              "width": 4
            }
          }
        }
      }
    },

    "province-borders": {
      "data": {
        "source": "province_borders",
      },
      "filter": {
        "all": [
          {
            "$zoom": {
              "min": 3,
              "max": 12
            }
          }
        ]
      },
      "draw": {
        "lines": {
          "order": 200,
          "dash": [2, 2],
          "color": colors.gray[400],
          "dash_background_color": colors.gray[100],
          "width": "1px",
        }
      }
    },

    "country-borders": {
      "data": {
        "source": "here",
        "layer": "boundaries"
      },
      "filter": {
        "all": [
          {
            "$geometry": "line",
            "kind": "country"
          },
          {
            "$zoom": {
              "min": 3,
              "max": 12
            }
          }
        ]
      },
      "draw": {
        "lines": {
          "order": 200,
          "color": colors.gray[300],
          "width": "1.25px",
        }
      }
    },
    "disputed-regions-borders": {
      "data": {
        "source": "here",
        "layer": "boundaries"
      },
      "filter": {
        "all": [
          {
            "$geometry": "line",
            "kind": "disputed"
          },
          {
            "$zoom": {
              "min": 3,
              "max": 12
            }
          }
        ]
      },
      "draw": {
        "lines": {
          "order": 200,
          "dash": [4, 3],
          "color": colors.gray[300],
          "dash_background_color": colors.gray[50],
          "width": "1.25px",
        }
      }
    },
    "water": {
      "data": {
        "source": "here",
        "layer": "water"
      },
      "water fill": {
        "filter": [
          {
            "$geometry": "polygon"
          }
        ],
        "draw": {
          "polygons": {
            "order": 200,
            "color": "#A3CDFB",
          },
        }
      }
    },

    "provinceLabels": {
      "data": {
        "source": "provinces",
      },
      "filter": {
        "all": [
          {
            "$zoom": {
              "min": 3,
              "max": 17,
            }
          }
        ]
      },
      "draw": {
        "points": {
          "color": colors.gray[500],
          "size": "0px",
          "order": 100,
          "text": {
            text_source: `|
              function () {
                return feature.name || ""
              }
            `,
            "font": {
              "family": theme.fonts.mono,
              "size": [ [3, "10px"], [8, "16px"]],
              "transform": "uppercase",
              "weight": 400,
              "fill": colors.gray[400],
              "stroke": {
                "color": [
                  255,
                  255,
                  255,
                  0.5
                ],
                "width": 4
              }
            }
          }
        }
      }
    },

    "countryLabels": {
      "data": {
        "source": "here",
        "layer": "places"
      },
      "filter": {
        "all": [
          {
            "kind": "country"
          },
          {
            "$zoom": {
              "min": 3,
              "max": 17,
            }
          }
        ]
      },
      "draw": {
        "points": {
          "color": colors.gray[500],
          "size": "0px",
          "order": 100,
          "text": {
            text_source: "global.language_text_source",
            "font": {
              "family": theme.fonts.mono,
              // "size": "12px",
              "size": [ [3, "10px"], [8, "16px"]],
              "weight": 600,
              "fill": colors.gray[500],
              "stroke": {
                "color": [
                  255,
                  255,
                  255,
                  0.5
                ],
                "width": 4
              }
            }
          }
        }
      }
    },
    "capitalCities": {
      "data": {
        "source": "here",
        "layer": "places"
      },
      "filter": {
        "all": [
          {
            "kind": "locality",
            "kind_detail": "city",
            "country_capital": true
          },
          {
            "$zoom": {
              "min": 5,
              "max": 12
            }
          }
        ]
      },
      "draw": {
        "points": {
          "color": colors.gray[500],
          "size": [[5, "6px"], [10, "8px"]],
          "order": 1000,
          outline: {
            width: "2px",
            color: colors.gray[50],
          },
          "text": {
            text_source: "global.language_text_source",
            "font": {
              "family": theme.fonts.body,
              // "size": "12px",
              "size": [[4, "10px"], [6, "12px"], [8, "14px"]],
              "fill": [[4, colors.gray[500]], [8, colors.gray[600]]],
              "stroke": {
                "color": [
                  255,
                  255,
                  255,
                  0.5
                ],
                "width": 4
              }
            }
          }
        }
      }
    },
    "cities": {
      "data": {
        "source": "here",
        "layer": "places"
      },
      "filter": {
        "all": [
          {
            "kind": "locality",
            "kind_detail": "city",
            "country_capital": false
          },
          {
            "$zoom": {
              "min": 7,
              "max": 12
            }
          }
        ]
      },
      "draw": {
        "points": {
          "color": "#652B19",
          "size": "0px",
          "order": 1000,
          "text": {
            text_source: "global.language_text_source",
            "font": {
              "family": "sans-serif",
              "size": "12px",
              "fill": colors.gray[500],
              "stroke": {
                "color": [
                  1,
                  1,
                  1,
                  1
                ],
                "width": 3
              }
            }
          }
        }
      }
    },
    "cases": {
      "data": {
        "source": "dynamic_data",
      },
      "filter": {
        "all": [
          {
            "$zoom": {
              "min": 3,
              // "max": 12
            }
          }
        ]
      },
      "draw": {
        "_custom_cases": {
          interactive: true,
          collide: false,
          "color": "rgba(236,97,14, 0.25)",
          order: 9000,
          outline: {
            width: "2px",
            color: `|
              function() {
                if (!feature[global.prefix + global.currentDate]) return null
                return "#ec610e"
              }
            `,
          },
          size: `|
            function() {
              if (!global.currentDate || !feature[global.prefix + global.currentDate]) return 0
              const minSize = 8
              const size = (200 - minSize) / global.max * parseInt(feature[global.prefix + global.currentDate])
              const corrected = size + minSize
              return corrected
            }
          `,
        },
        "_custom_cases2": {
          interactive: true,
          collide: false,
          "color": "rgba(236,97,14, 0)",
          order: 9001,
          size: `|
            function() {
              if (!global.currentDate || !feature[global.prefix + global.currentDate]) return 0
              const minSize = 8
              const size = (200 - minSize) / global.max * parseInt(feature[global.prefix + global.currentDate])
              const corrected = size + minSize + 10
              return corrected
            }
          `,
        }
      },
    },
  }
}

export default scene
