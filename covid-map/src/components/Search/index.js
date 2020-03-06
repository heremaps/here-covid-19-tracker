/*
 * Copyright (C) 2020 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 */

import React from "react"
import { Box, Text, Flex, Heading } from "@chakra-ui/core"

import Combobox from "../Combobox"
import AboutModal from "../AboutModal"

const Search = () => {
  return(
    <>
      <Box
        display={["block", null, "none"]}
        position="fixed"
        top="0"
        left="0"
        right="0"
        height="0.25rem"
        bg="#00AFAA"
      />
      <Flex
        position="fixed"
        flexWrap="wrap"
        top={["1.5rem", "1.5rem", "2.5rem"]}
        right="0"
        zIndex={10}
        width="100%"
        maxWidth={["100%", null, "28rem"]}
        pr={["1.25rem", null, "2.5rem"]}
        pl={["1.25rem", null, 0]}
        alignItems="center"
      >

        <Box width="100%" display={["block", null, "none"]}>
          <Heading fontSize={["1.5rem", "2rem"]} lineHeight={1.125} mb="1.25rem">
            <Text mr="0.75rem" as="span">
              { "Tracking Coronavirus" } <br/>
              { "COVID-19" }
            </Text>
          </Heading>
        </Box>

        <Box flex="1 1 auto">
          <Combobox />
        </Box>
        <AboutModal />
      </Flex>
    </>
  )
}

export default Search