/*
 * Copyright (C) 2020 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 */

import React from "react"
import { Box, Icon, Tabs, TabList, Tab } from "@chakra-ui/core"

import { useTabStore } from "../../utils/store"

const NavigationTabs = () => {
  const updateTab = useTabStore(state => state.updateTab)
  const currentTab = useTabStore(state => state.currentTab)

  const handleTabChange = index => {
    updateTab(index)
  }

  return (
    <Box
      display={["block", null, "none"]}
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      bg="white"
      zIndex={999999}
      boxShadow="0 -0.25rem 0.75rem rgba(0,0,0,0.1)"
    >
      <Tabs variantColor="orange" onChange={handleTabChange} defaultIndex={1} index={currentTab}>
        <TabList display="flex" justifyContent="space-between">
          <Tab width={1/3} height="3rem" fontWeight={600} _focus={{ boxShadow: "none" }}>
            <Icon name="list" mr="0.25rem"/>
            { "Cases" }
          </Tab>
          <Tab width={1/3} height="3rem" fontWeight={600} _focus={{ boxShadow: "none" }}>
            <Icon name="globe" mr="0.25rem"/>
            { "Map" }
          </Tab>
          <Tab width={1/3} height="3rem" fontWeight={600} _focus={{ boxShadow: "none" }}>
            <Icon name="info" mr="0.25rem"/>
            { "About" }
          </Tab>
        </TabList>
      </Tabs>
    </Box>
  )
}

export default NavigationTabs
