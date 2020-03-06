/*
 * Copyright (C) 2020 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 */

import React, { useEffect, useState } from "react"
import dayjs from "dayjs"
import { Badge, Text } from "@chakra-ui/core"

import BlinkingDot from "../BlinkingDot"

const UpdatedBadge = ({ update }) => {
  const [timeDifference, setTimeDifference] = useState(null)
  
  useEffect(() => {
    const days = dayjs(dayjs()).diff(dayjs(update), "day")
    const hours = dayjs(dayjs()).diff(dayjs(update), "hour")
    const minutes = dayjs(dayjs()).diff(dayjs(update), "minute")

    const getString = (minutes, hours, days) => {
      return days
        ? days + (days > 1 ? " days" : " day")
        : hours
          ? hours + (hours > 1 ? " hours" : " hour")
          : minutes
            ? minutes + (minutes > 1 ? " minutes" : " minute")
            : null
    }

    // First time
    setTimeDifference(getString(minutes, hours, days))
    
    // Keep checking (every 5 minutes)
    const int = setInterval(() => {
      const days = dayjs(dayjs()).diff(dayjs(update), "day")
      const hours = dayjs(dayjs()).diff(dayjs(update), "hour")
      const minutes = dayjs(dayjs()).diff(dayjs(update), "minute")
      setTimeDifference(getString(minutes, hours, days))
      console.log("This is happening")
    }, 5 * 60 * 1000)

    // Cancel interval on unmount
    return () => {
      clearInterval(int)
    }
  }, [update])

  return (
    <Badge bg="#FBDFCF" color="#ec610e" display="inline-flex" alignItems="center">
      <BlinkingDot />
      <Text as="span" color="orange.700" fontWeight={600} textTransform="lowercase" fontSize="sm">
        { timeDifference ? `Last updated ${timeDifference} ago` : "Last updated just now" }
      </Text>
    </Badge>
  )
}

export default UpdatedBadge
