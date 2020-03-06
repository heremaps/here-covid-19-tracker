/*
 * Copyright (C) 2020 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 */

import React, { useEffect } from "react"
import useSWR from "swr"
import {
  Box,
  Heading,
  Text,
  Flex,
  Link,
  Icon
 } from "@chakra-ui/core"

import fetcher from "../../utils/fetcher"
import { useTabStore } from "../../utils/store"
import Listing from "../Listing"
import Map from "../Map"
import Search from "../Search"
import Globe from "../Globe"
import NavigationTabs from "../NavigationTabs"
import CurrentCircle from "../CurrentCircle"
import hereLogo from "../../images/here-logo.svg"
import TimeSlider from "../TimeSlider"
import AboutContent from "../AboutContent"
import IntroParagraph from "../IntroParagraph"

const spaceId = process.env.GATSBY_SPACE_ID
const accessToken = process.env.GATSBY_ACCESS_TOKEN

const App = () => {
  const currentTab = useTabStore(state => state.currentTab)

  const { data, error } = useSWR(`https://xyz.api.here.com/hub/spaces/${spaceId}/bbox?west=-180&north=90&east=180&south=-90&access_token=${accessToken}`, fetcher, { focusThrottleInterval: 60000 })
  const points = data ? (data.features || []) : []

  useEffect(() => {
    const cbox = document.getElementsByClassName("main-combobox")[0]
    if (cbox) cbox.focus()
  }, [])

  return (
    <>
      <Box
        display={!currentTab ? "block" : ["none", null, "block"]}
        position="fixed"
        top="0"
        left="0"
        bottom="0"
        zIndex={999999}
        borderTop="0.25rem solid #00AFAA"
        width={["100%", null, "25rem", "30rem"]}
        boxShadow="lg"
        overflow="scroll"
        bg="white"
        pb="5rem"
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        <Box px="1.25rem" pt="1.25rem">
          <Heading fontSize={["1.5rem", "2rem", null, "2.5rem"]} lineHeight={1.125} mb="1.25rem">
            <Text mr="0.75rem" as="span">
              { "Tracking Coronavirus" } <br/>
              { "COVID-19" }
            </Text>
          </Heading>
          { points.length ? <IntroParagraph points={points} /> : null}
          { points.length ? <TimeSlider points={points} /> : null }
        </Box>
        { points.length ? <Listing rows={points} /> : null }
      </Box>

      <Flex
        position="absolute"
        bottom={["3.5rem", null, "1.25rem"]}
        left={["1rem", null, "26.25rem", "32.5rem"]}
        right={["1rem", null, "2rem"]}
        zIndex={2}
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Flex flexWrap="wrap" justifyContent="space-between" flex="1 1 auto" pr={["0.75rem", null, 0]}>
          <Text as="span" fontSize="xs" color="gray.900" fontWeight={600}>
            {"Data: "}
            <Link href="https://github.com/CSSEGISandData/COVID-19" color="#00AFAA" bg="white" py="0.125rem" px="0.25rem">{"JHU CSSE"}</Link>
            { " and " }
            <Link href="https://ncov.dxy.cn/ncovh5/view/pneumonia?scene=2&clicktime=1579582238&enterid=1579582238&from=singlemessage&isappinstalled=0" color="#00AFAA" bg="white" py="0.125rem" px="0.25rem">
              {"DXY"}
            </Link>
          </Text>
          <Text as="span" fontSize="xs" color="gray.900" fontWeight={600}>
            {"Made with Leaflet, "}
            <Link href="https://developer.here.com/documentation/vector-tiles-api/dev_guide?cid=Freemium-DeveloperPortalTutorial-PJ-0-Javascript-DevPortal-&utm_source=DeveloperPortalTutorial&utm_medium=referral&utm_campaign=Webinar_IOT_2020_Golden-Age-Location-Enabled-AI-Jan-16" color="#00AFAA" bg="white" py="0.125rem" px="0.25rem">{"HERE Vector Map Tiles API"}</Link>
            {" and "}
            <Link href="https://developer.here.com/products/xyz?cid=Freemium-DeveloperPortalTutorial-PJ-0-XYZ-DevPortal-&utm_source=DeveloperPortalTutorial&utm_medium=referral&utm_campaign=CoronaVirusMap" color="#00AFAA" bg="white" py="0.125rem" px="0.25rem">{"HERE Data Hub APIs"}</Link>
            { " | " }
            <Link href="#" color="#00AFAA" bg="white" py="0.125rem" px="0.25rem">
              {"Get the code"}
              <Icon name="github" ml="0.25rem" mt="-0.125rem" />
            </Link>
          </Text>
        </Flex>
        <Link flex="none" href="https://developer.here.com/?cid=Freemium-DeveloperPortalTutorial-PJ-0-Javascript-DevPortal-&utm_source=DeveloperPortalTutorial&utm_medium=referral&utm_campaign=Webinar_IOT_2020_Golden-Age-Location-Enabled-AI-Jan-16">
          <img src={hereLogo} alt="HERE logo" style={{ width: "2.5rem", marginLeft: "0.75rem" }} />
        </Link>
      </Flex>

      <Map points={points} />

      <Search />

      <Box
        position="fixed"
        bottom={["5.5rem", null, "4rem"]}
        right={["1rem", null, "2.5rem"]}
        zIndex={2}
        width={["6rem", "8rem", "10rem"]}
        height={["6rem", "8rem", "10rem"]}
        boxShadow="lg"
        borderRadius="100%"
        bg="white"
        border="0.125rem solid"
        borderColor="gray.50"
        pointerEvents="none"
      >
        <Globe />
      </Box>

      {
        currentTab === 2 ? (
          <Box
            display="block"
            position="fixed"
            top="0"
            left="0"
            bottom="0"
            zIndex={999999}
            borderTop="0.25rem solid #00AFAA"
            width={["100%", null, "25rem", "30rem"]}
            boxShadow="lg"
            overflow="scroll"
            bg="white"
            pb="5rem"
            style={{
              WebkitOverflowScrolling: "touch",
            }}
          >
            <Box px="1.25rem" pt="1.25rem">
              <AboutContent />
            </Box>
          </Box>
        ) : null
      }

      <NavigationTabs />

      <CurrentCircle />

    </>
  )
}

export default App
