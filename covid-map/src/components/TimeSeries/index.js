/*
 * Copyright (C) 2020 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 */

import React from "react"
import { Box } from "@chakra-ui/core"
import { Area } from "@vx/shape"
import { scaleLinear } from "@vx/scale"
import { keyframes } from "@emotion/core"

import { useDataTypeStore } from "../../utils/store"

const blink = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const TimeSeries = ({ points, dates, currentDate }) => {
  const currentDataType = useDataTypeStore(state => state.currentDataType)

  const width = 440
  const height = 55

  const prefix = currentDataType === 0
    ? ""
    : currentDataType === 1
      ? "deaths_"
      : "recoveries_"

  const timeSeries2 = dates.map((date, i) => {
    const confirmedSum = points.reduce((acc, cur) => {
      return acc + parseFloat(cur.properties[date] || 0)
    }, 0)
    const sum = points.reduce((acc, cur) => {
      return acc + parseFloat(cur.properties[prefix + date] || 0)
    }, 0)
    return {
      date: new Date(date),
      dateIndex: i, 
      value: sum,
      confirmedSum,
    }
  })

  const timeSeries = [timeSeries2]

  const xScale = scaleLinear({
    domain: [0, dates.length - 1],
    range: [1, width - 1],
  })

  const yScale = scaleLinear({
    domain: [0, timeSeries[0][timeSeries[0].length - 1].confirmedSum],
    range: [height, 2],
  })

  const x = d => d.dateIndex
  const y = d => d.value

  return (
    <Box mb="-0.5rem">
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height: "auto" }}>
        {
          timeSeries.map((oneSeries, i) => {
            return (
              <g key={`series-${i}`}>
                <Area
                  data={oneSeries}
                  x1={d => xScale(x(d))}
                  y1={d => yScale(y(d))}
                  x0={d => xScale(x(d))}
                  y0={height}
                  fill="#FBDFCF"
                />
                <Area
                  data={oneSeries}
                  x={d => xScale(x(d))}
                  y={d => yScale(y(d))}
                  stroke="#F5B086"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            )
          })
        }

        <rect
          x={xScale(currentDate)}
          y={0}
          width={width + 10}
          height={height}
          fill="rgba(255,255,255,0.8)"
        />

        <Box
          as="rect"
          x={xScale(timeSeries2.length - 2)}
          y={0}
          width={width / timeSeries2.length}
          height={height}
          fill="rgba(255,255,255,0.4)"
        />

        <line
          x1={xScale(currentDate)}
          x2={xScale(currentDate)}
          y1={0}
          y2={height}
          stroke="#FFF"
          strokeWidth={5}
        />
        <Box
          as="line"
          x1={xScale(currentDate)}
          x2={xScale(currentDate)}
          y1={1}
          y2={height}
          stroke="#ec610e"
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray={[3,3]}
          animation={`${blink} 1s linear infinite alternate`}
        />
      </svg>
    </Box>
  )
}

export default TimeSeries
