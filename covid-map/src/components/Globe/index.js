/*
 * Copyright (C) 2020 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 */

import React from "react"
import {
  ComposableMap,
  Graticule,
  Geographies,
  Geography,
} from "react-simple-maps"

import useStore from "../../utils/store"
import colors from "../Layout/colors"

const Globe = () => {
  const center = useStore(state => state.center)
  return (
    <ComposableMap
      width={400}
      height={400}
      projection="geoOrthographic"
      projectionConfig={{
        rotate: center,
        scale: 200,
      }}
    >
      <Graticule stroke={colors.gray[200]} />
      <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json">
        {({geographies}) =>
          <>
            {
              geographies.map(geo =>
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={colors.gray[500]}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              )
            }
          </>
        }
      </Geographies>
    </ComposableMap>
  )
}

export default Globe
