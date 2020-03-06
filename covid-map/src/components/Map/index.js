/*
 * Copyright (C) 2020 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 */

import React, { useRef, useEffect, useState } from "react"
import { Box, Text, Stack, Flex, IconButton, Icon } from "@chakra-ui/core"
import { extent } from "d3-array"
import { keyframes } from "@emotion/core"

import scene from "../../utils/scene"
import useStore, { useMapFocus, useDataDate, useDataTypeStore } from "../../utils/store"
import { formatThousand } from "../../utils/format"

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359.999deg);
  }
`

const Map = ({ points }) => {

  const currentDataType = useDataTypeStore(state => state.currentDataType)

  const updateCenter = useStore(state => state.updateCenter)
  const mapFocus = useMapFocus(state => state.mapFocus)
  const mapZoom = useMapFocus(state => state.mapZoom)
  const updateMapFocus = useMapFocus(state => state.updateMapFocus)
  const currentDate = useDataDate(state => state.currentDate)
  const [loadedMap, setLoadedMap] = useState(false)

  const mapRef = useRef()
  const Leaflet = useRef()
  const sceneRef = useRef()
  const leafletMap = useRef()

  useEffect(() => {
    if (typeof window === undefined || !points.length) return
    const L = require("leaflet")
    const Tangram = require("tangram")
    Leaflet.current = L

    if (leafletMap.current) {
      leafletMap.current.remove()
      leafletMap.current = null
      sceneRef.current = null
    }

    const popup = L.popup({ autoPan: false })

    const map = L.map(mapRef.current, {
      zoomControl: false,
      minZoom: 3,
      maxZoom: 8,
      scrollWheelZoom: true,
    })

    const layer = Tangram.leafletLayer({
      scene,
      attribution: "Loading map",
      webGLContextOptions: {
        antialias: false,
      },
      events: {
        click: selection => {
          if (!selection.feature || (!selection.feature && !selection.feature.properties)) {
            return
          }
          const { lat, long } = selection.feature.properties
          updateMapFocus([lat, long], selection.feature.properties)
        },
        hover: selection => {
          if (!selection.feature || (!selection.feature && !selection.feature.properties)) {
            mapRef.current.style.cursor = "default"
            map.closePopup()
            return
          }

          mapRef.current.style.cursor = "pointer"

          const coords = selection.leaflet_event.latlng
          const sceneDate = sceneRef.current.config.global.currentDate
          const sceneDataType = sceneRef.current.config.global.currentDataType
          const { prefix } = sceneRef.current.config.global

          const num = formatThousand(selection.feature.properties[prefix + sceneDate])

          const isChina = ["Mainland China", "Macau", "Hong Kong", "Taiwan"].includes(selection.feature.properties.countryregion)

          const label = sceneDataType === 0
            ? "Confirmed cases" : sceneDataType === 1 ? "Deaths" : "Recoveries"

          const value = num
            ? `
              <div>
                <div class="tt-address">
                  <p class="tt-zip-code-value">
                    ${selection.feature.properties.provincestate || selection.feature.properties.countryregion}
                  </p>
                  ${
                    selection.feature.properties.provincestate ? `
                      <p class="tt-zip-code-title">
                        ${isChina ? "China" : selection.feature.properties.countryregion}
                      </p>` : ""
                  }
                </div>
                <p class="tt-median-rent-title">${label}</p>
                <p class="tt-median-rent-value">
                  <span>${num}</span>
                </p>
              </div>
            `
            : ""

          popup
            .setLatLng([coords.lat, coords.lng])
            .setContent(`${value}`)
            .openOn(map)

        }
      },
    })

    map.on("move", () => {
      const { lat, lng } = map.getCenter()
      updateCenter([-lng, -lat])
    })

    layer.addTo(map)
    sceneRef.current = layer.scene    
    map.setView([30, 110], 4)
    leafletMap.current = map

    const geojsonData = {
      type: "FeatureCollection",
      features: points,
    }

    const ext = extent(points, d => {
      const headers = d.properties.headers.split(";;")
      const lastDate = headers[headers.length - 1]
      return parseInt(d.properties[lastDate])
    })

    layer.scene.subscribe({
      load: () => {
        layer.scene.config.global.max = ext[1]
        layer.scene.updateConfig()
        layer.scene.setDataSource("dynamic_data", {
          type: "GeoJSON",
          data: geojsonData,
        })
        setLoadedMap(true)
      },
    })

  }, [points])

  const cf = sceneRef.current && sceneRef.current.config

  useEffect(() => {
    if (!mapFocus) return
    leafletMap.current.flyTo(mapFocus, mapZoom || 5, { easeLinearity: 0.01, duration: 1.5 })
  }, [mapFocus, mapZoom])

  useEffect(() => {
    if (!currentDate || !sceneRef.current || !sceneRef.current.config) return
    if (currentDate === sceneRef.current.config.global.currentDate) return
    sceneRef.current.config.global.currentDate = currentDate
    sceneRef.current.updateConfig()
  }, [currentDate, cf])

  useEffect(() => {
    if (!sceneRef.current || !sceneRef.current.config) return
    sceneRef.current.config.global.currentDataType = currentDataType || 0
    sceneRef.current.config.global.prefix = currentDataType === 0
      ? ""
      : currentDataType === 1
        ? "deaths_"
        : "recoveries_"
    sceneRef.current.updateConfig()
  }, [currentDataType, cf])

  const handleZoomIn = () => {
    leafletMap.current.zoomIn()
  }

  const handleZoomOut = () => {
    leafletMap.current.zoomOut()
  }

  return (
    <>
      <Box
        ref={mapRef}
        top="0"
        left={[0, null, "25rem", "30rem"]}
        right="0"
        bottom="0"
        style={{ position: "fixed", transition: "opacity 500ms", opacity: loadedMap ? 1 : 0 }}
      />

      {
        !loadedMap ? (
          <Box
            position="fixed"
            top="50%"
            left={["50%", null, "calc((100% + 25rem) / 2)", "calc((100% + 30rem) / 2)"]}
            zIndex={9999}
            transform="translateX(-50%)"
          >
            <Icon
              name="spinner"
              size="2.5rem"
              color="gray.500"
              animation={`${rotate} 1s linear infinite`}
              mx="auto"
              display="block"
            />
            <Text textAlign="center" color="gray.500" mx="auto" fontSize="sm" mt="0.75rem">
              { "Loading map" }
            </Text>
          </Box>
        ) : null
      }
      
      <Box
        position="fixed"
        bottom={["6rem", "8rem", "5rem"]}
        left={["auto", null, "26.5rem", "32.5rem"]}
        right={["2.75rem", "3.75rem", "auto"]}
        zIndex={2}
        pointerEvents={["none", null, "all"]}
      >

        <Stack spacing="0.5rem" alignItems="center" mb={["6.5rem", null, "1.25rem"]}>
          <Text color="gray.600" width="2.5rem" textAlign="center" fontWeight={700} fontSize="xs" lineHeight="shorter">
            { "more cases" }
          </Text>
          <Box width="2.5rem" height="2.5rem" border="0.125rem solid" borderColor="gray.500" borderRadius="100%" />
          <Box width="1.25rem" height="1.25rem" border="0.125rem solid" borderColor="gray.500" borderRadius="100%" />
          <Box width="0.625rem" height="0.625rem" border="0.125rem solid" borderColor="gray.500" borderRadius="100%" />
          <Text color="gray.600" width="2.5rem" textAlign="center" fontWeight={700} fontSize="xs" lineHeight="shorter">
            { "fewer cases" }
          </Text>
        </Stack>

        <Stack display={["none", null, "block"]} spacing="1.25rem">
          <Flex justifyContent="center">
            <Flex alignItems="center" direction="column" shadow="lg" borderRadius="md">
              <IconButton 
                onClick={handleZoomIn}
                icon="add" bg="white"
                borderRadius="0.25rem 0.25rem 0 0"
                border="0.0625rem solid"
                borderColor="transparent"
                  _hover={{ borderColor: "transparent" }}
                  _focus={{ borderColor: "rgba(236,97,14, 1)", boxShadow: `0 0 0 0.0625rem rgba(236,97,14, 1), 0 0 0 0.25rem rgba(236,97,14, 0.25)` }}
                  _placeholder={{ color: "gray.500" }}
              />
              <Box height="1px" width="100%" bg="gray.100" />
              <IconButton 
                onClick={handleZoomOut}
                icon="minus"
                bg="white"
                borderRadius="0 0 0.25rem 0.25rem"
                border="0.0625rem solid"
                borderColor="transparent"
                  _hover={{ borderColor: "transparent" }}
                  _focus={{ borderColor: "rgba(236,97,14, 1)", boxShadow: `0 0 0 0.0625rem rgba(236,97,14, 1), 0 0 0 0.25rem rgba(236,97,14, 0.25)` }}
                  _placeholder={{ color: "gray.500" }}
              />
            </Flex>
          </Flex>
        </Stack>
      </Box>
    </>
  )
}

export default Map
