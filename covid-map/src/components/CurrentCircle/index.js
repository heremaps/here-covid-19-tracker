/*
 * Copyright (C) 2020 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 */

import React from "react"
import { Box, Flex } from "@chakra-ui/core"

import { useMapFocus, useDataDate, useDataTypeStore } from "../../utils/store"
import { formatThousand } from "../../utils/format"

const CurrentCircle = () => {
  const data = useMapFocus(state => state.mapFocusData)
  const currentDate = useDataDate(state => state.currentDate)
  const currentDataType = useDataTypeStore(state => state.currentDataType)

  const prefix = currentDataType === 0
    ? ""
    : currentDataType === 1
      ? "deaths_"
      : "recoveries_"
    
  const label = currentDataType === 0
    ? "cases"
    : currentDataType === 1
      ? "deaths"
      : "recoveries"

  return data ? (
    <Flex
      display={["flex", null, "none"]}
      position="fixed"
      bottom={["6.5rem", "7.5rem"]}
      right={["8rem", "10rem", "15rem"]}
      left={["1rem", null, "auto"]}
      bg="white"
      shadow="md"
      px="1.25rem"
      py={["0.75rem", null, "1.25rem"]}
      borderRadius="md"
      width={["auto", null, "15rem"]}
      justifyContent="space-between"
      zIndex={3}
    >
      <Box fontWeight={700}>
        { data ? (data.provincestate || data.countryregion) : "No data" }
      </Box>
      <Box>{ data ? formatThousand(data[prefix + currentDate]) + ` ${label}` : "No data" }</Box>
    </Flex>
  ) : null
}

export default CurrentCircle
