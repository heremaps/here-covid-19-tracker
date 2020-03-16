/*
 * Copyright (C) 2020 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 */

import React from "react"
import {
  Text,
  PseudoBox,
  Box,
  Stack,
  Icon,
  Heading,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
  Flex,
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/core"
import groupBy from "lodash/groupBy"

import { formatThousand } from "../../utils/format"
import { useMapFocus, useTabStore, useDataDate, useDataTypeStore } from "../../utils/store"
import SumStat from "../SumStat"

const DataTypeSwitch = ({ rows }) => {
  const updateDataType = useDataTypeStore(state => state.updateDataType)
  const handleTabChange = (val) => {
    updateDataType(val)
  }
  return (
    <Tabs variantColor="orange" mt="1.25rem" onChange={handleTabChange}>
      <TabList>
        <Tab width={1/3} justifyContent="flex-start" pl="1.25rem" color="gray.600" _selected={{ borderColor: "#ec610e", color: "#ec610e" }}>
          <Box textAlign="left">
            <SumStat points={rows} prefix="" text="Confirmed" />
          </Box>
        </Tab>
        <Tab width={1/3} justifyContent="flex-start" pl="1.25rem" color="gray.600" _selected={{ borderColor: "#ec610e", color: "#ec610e" }}>
          <Box textAlign="left">
            <SumStat points={rows} prefix="deaths_" text="Deaths" />
          </Box>
        </Tab>
        <Tab width={1/3} justifyContent="flex-start" pl="1.25rem" color="gray.600" _selected={{ borderColor: "#ec610e", color: "#ec610e" }}>
          <Box textAlign="left">
            <SumStat points={rows} prefix="recoveries_" text="Recoveries" />
          </Box>
        </Tab>
      </TabList>
    </Tabs>
  )
}

const Listing = ({ rows }) => {
  const currentDataType = useDataTypeStore(state => state.currentDataType)
  const tabIndex = currentDataType
  const currentDate = useDataDate(state => state.currentDate)
  const updateMapFocus = useMapFocus(state => state.updateMapFocus)
  const updateTab = useTabStore(state => state.updateTab)

  const handleClick = (coordinates, properties) => {
    updateTab(1)
    updateMapFocus([ coordinates[1], coordinates[0] ], properties)
  }

  const grouped = groupBy(rows.map(d =>
    d.properties.countryregion === "Mainland China" || d.properties.countryregion === "Hong Kong" || d.properties.countryregion === "Macau" || d.properties.countryregion === "Taiwan" ? { ...d, properties: { ...d.properties, countryregion: "China" } } : d),
    // d),
    o => o.properties.countryregion
  )

  const groups = Object.keys(grouped).map(d => {
    return {
      key: d,
      sum: grouped[d].reduce((acc, cur) => acc + parseInt(cur.properties[currentDate] || 0), 0),
      sum2: grouped[d].reduce((acc, cur) => acc + parseInt(cur.properties["deaths_" + currentDate] || 0), 0),
      sum3: grouped[d].reduce((acc, cur) => acc + parseInt(cur.properties["recoveries_" + currentDate] || 0), 0),
      items: grouped[d].filter(d => d.properties[currentDate]).sort((a, b) => b.properties[currentDate] - a.properties[currentDate]),
    }
  }).filter(d => d.sum)
    .sort((a, b) => {
      return tabIndex === 0
        ? b.sum - a.sum
        : tabIndex === 1
          ? b.sum2 - a.sum2
          : b.sum3 - a.sum3
    })

  return (
    <div>

      <DataTypeSwitch rows={rows} />

      <Accordion defaultIndex={[0]} allowMultiple mt="0">

        {
          groups.map((group, i) => {
            return (
              <AccordionItem key={group.key} borderColor={!i ? "transparent" : "gray.200"}>
                <AccordionHeader>
                  <Flex justifyContent="space-between" alignItems="center" flex="1 1 auto" py="0.5rem">
                    <Heading pl="1.25rem" color="gray.500" fontSize="1rem" textTransform="uppercase">
                      {group.key}
                    </Heading>
                    <Box pr="1.25rem" color="gray.500" fontWeight={700}>
                      { tabIndex === 0 ? formatThousand(group.sum) : null }
                      { tabIndex === 1 ? formatThousand(group.sum2) : null }
                      { tabIndex === 2 ? formatThousand(group.sum3) : null }
                    </Box>
                  </Flex>
                  <AccordionIcon mr="1.375rem" />
                </AccordionHeader>
                <AccordionPanel pt="0">
                  {
                    group.items.map(({ properties, geometry }, i) => {

                      const {
                        provincestate,
                        countryregion,
                        ...restProps
                      } = properties

                      return (
                        <PseudoBox
                          tabIndex={0}
                          key={provincestate + i}
                          bg="transparent"
                          borderRadius="lg"
                          py="0.75rem"
                          px="1.25rem"
                          border="0.0625rem solid"
                          borderColor="gray.200"
                          mt="0.5rem"
                          mb="0.75rem"
                          onClick={() => handleClick(geometry.coordinates, properties)}
                          cursor="pointer"
                          _hover={{
                            bg: "gray.100",
                          }}
                          _focus={{
                            bg: "gray.100",
                          }}
                          _active={{
                            bg: "gray.200",
                          }}
                        >
                          <Stack isInline alignItems="top" justifyContent="space-between">
                            <Stack spacing="0.125rem">
                              <Text lineHeight={1.25} color="gray.500" fontSize="xs" fontWeight={600} textTransform="uppercase">
                                {countryregion}
                              </Text>
                              <Text fontSize="lg" lineHeight={1.25} fontWeight={700}>
                                {provincestate || countryregion}
                              </Text>
                            </Stack>
                            <Stack isInline alignItems="center" spacing="1.5rem">
                              <Stack spacing="0.125rem" textAlign="right">
                                <Text lineHeight={1.25} color="gray.500" fontSize="xs" fontWeight={600} textTransform="uppercase">
                                  { tabIndex === 0 ? "Confirmed" : null }
                                  { tabIndex === 1 ? "Deaths" : null }
                                  { tabIndex === 2 ? "Recoveries" : null }
                                </Text>
                                <Text fontSize="lg" fontWeight={700} color="gray.500">
                                  { tabIndex === 0 ? formatThousand(restProps[currentDate] || 0) : null }
                                  { tabIndex === 1 ? formatThousand(restProps["deaths_" + currentDate] || 0) : null }
                                  { tabIndex === 2 ? formatThousand(restProps["recoveries_" + currentDate] || 0) : null }
                                </Text>
                              </Stack>
                              <Icon name="pin" size="1.5rem" color="gray.600"/>
                            </Stack>
                          </Stack>
                        </PseudoBox>
                      )
                    })
                  }
                </AccordionPanel>
              </AccordionItem>
            )
          })
        }
      </Accordion>
    </div>
  )
}

export default Listing
