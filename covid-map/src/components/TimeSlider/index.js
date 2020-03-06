/*
 * Copyright (C) 2020 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 */

import React, { useState, useEffect, useMemo } from "react"
import dayjs from "dayjs"
import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Icon,
  Text,
  Flex,
  Badge,
  Heading,
} from "@chakra-ui/core"
import groupBy from "lodash/groupBy"
import { useDebounce } from "use-debounce"

import { useDataDate } from "../../utils/store"
import TimeSeries from "../TimeSeries"
import BlinkingDot from "../BlinkingDot"

const TimeSlider = ({ points }) => {
  const updateDate = useDataDate(state => state.updateDate)

  const uniqDays = useMemo(() => {
    const headers = points[0].properties.headers.split(";;")
    const allDates = headers
      .filter(d => {
        return d.includes("/" && ":" && "pm") || d.includes("/" && ":" && "am")
      })
      .sort((a, b) => {
        const date1 = new Date(a).getTime() 
        const date2 = new Date(b).getTime()
        return date1 - date2
      })

    const uniqDates = groupBy(allDates, o => {
      return dayjs(o).format("DD-MM-YYYY")
    })

    const uniqDays = Object.keys(uniqDates).map(d => {
      return uniqDates[d][uniqDates[d].length - 1]
    })

    return uniqDays
  }, [points])

  const [currentDate, setCurrentDate] = useState(uniqDays.length - 1)

  const [debouncedCurrentDate] = useDebounce(currentDate, 150)

  useEffect(() => {
    updateDate(uniqDays[debouncedCurrentDate])
  }, [debouncedCurrentDate, uniqDays, updateDate])

  return (
    <Box mt="2rem">

      <Heading fontSize="md" as="h3" mb="0.5rem">
        { "Timeline" }
      </Heading>

      <Flex mb="-0.75rem" zIndex={10} position="relative">
        <Badge display="inline-flex" alignItems="center" bg="#FBDFCF" color="#ec610e" fontSize="sm">
          <BlinkingDot />
            {
              currentDate === uniqDays.length - 1
                ? dayjs(points[0].properties["@ns:com:here:xyz"].updatedAt).format("DD MMM YYYY h:mm a")
                : dayjs(uniqDays[currentDate]).format("DD MMM YYYY") 
            }
        </Badge>
      </Flex>

      <TimeSeries points={points} dates={uniqDays} currentDate={currentDate} />

      <Box mr="2px">
        <Slider
          defaultValue={uniqDays.length - 1}
          min={0}
          max={uniqDays.length - 1}
          value={currentDate}
          onChange={val => setCurrentDate(val)}
        >
          <SliderTrack />
          <SliderFilledTrack bg="#ec610e" />
          <SliderThumb size="1.5rem" ml="-0.25rem">
            <Icon name="arrows" color="#ec610e" />
          </SliderThumb>
        </Slider>
      </Box>

      <Flex justifyContent="space-between">
        <Text fontSize="sm" color="gray.600" mt="-0.5rem">
          { dayjs(uniqDays[0]).format("DD MMM YYYY") }
        </Text>
        <Text fontSize="sm" color="gray.600" mt="-0.5rem">
          { dayjs(uniqDays[uniqDays.length - 1]).format("DD MMM YYYY") }
        </Text>
      </Flex>
    </Box>
  )
}

export default TimeSlider
