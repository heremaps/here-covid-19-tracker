/*
 * Copyright (C) 2020 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 */

import React, { useState, useEffect } from "react"
import { Text } from "@chakra-ui/core"

import { formatThousand } from "../../utils/format"
import { useDataDate } from "../../utils/store"

const SumStat = ({ points, prefix = "", text }) => {
  const [sum, setSum] = useState(0)
  const currentDate = useDataDate(state => state.currentDate)

  useEffect(() => {
    if (!currentDate) return
    const sum = points.reduce((acc, cur) => {
      return acc + parseFloat(cur.properties[prefix + currentDate] || 0)
    }, 0)
    setSum(sum)
  }, [currentDate, prefix, points])

  return (
    <>
      <Text fontSize={["1.5rem", "2rem", "1.5rem", "2rem"]} lineHeight={1.25} fontWeight={700} color="inherit">
        { `${sum ? formatThousand(sum) : "—"} ` } 
      </Text>
      <Text fontSize="md" color="gray.600">
        {text}
      </Text>
    </>
  )
}

export default SumStat
