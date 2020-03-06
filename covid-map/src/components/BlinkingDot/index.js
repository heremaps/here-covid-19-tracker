/*
 * Copyright (C) 2020 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 */

import React from "react"
import { Box } from "@chakra-ui/core"
import { keyframes } from "@emotion/core"

const blink = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
const BlinkingDot = () => {
  return (
    <Box
      animation={`${blink} 1s linear infinite alternate`}
      width="0.5rem"
      height="0.5rem"
      bg="#ec610e"
      mr="0.25rem"
      borderRadius="100%"
    />
  )
}

export default BlinkingDot
