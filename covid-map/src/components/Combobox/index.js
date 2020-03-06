/*
 * Copyright (C) 2020 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 */

import React, { useState } from "react"
import { useCombobox } from "downshift"
import {
  Box,
  List,
  ListItem,
  Input,
  Icon,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/core"

import { useMapFocus } from "../../utils/store"
import colors from "../Layout/colors"

const baseUrl = "https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json"
const apiKey = process.env.GATSBY_API_KEY

const geoCodeBaseUrl = "https://geocoder.ls.hereapi.com/6.2/geocode.json"

const Combobox = ({ items = [] }) => {

  const updateMapFocus = useMapFocus(state => state.updateMapFocus)

  const [inputItems, setInputItems] = useState(items)

  const {
    isOpen,
    // selectedItem,
    // getToggleButtonProps,
    // getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    inputValue,
    setInputValue,
  } = useCombobox({
    items: inputItems,
    onSelectedItemChange: ({selectedItem}) => {
      if (selectedItem && selectedItem.simpleLabel) {
        fetch(`${geoCodeBaseUrl}?apiKey=${apiKey}&locationId=${selectedItem.locationId}`)
          .then(d => d.json())
          .then(d => {
            const coordinates = d.Response.View[0].Result[0].Location.DisplayPosition
            updateMapFocus([coordinates.Latitude, coordinates.Longitude], null, 7)
          })
        setInputValue(selectedItem.simpleLabel.replace(/<[^>]*>/g, ""))
      } else {
        setInputValue("")
      }
    },
    onInputValueChange: ({ inputValue }) => {
      fetch(`${baseUrl}?apiKey=${apiKey}&language=en&maxresults=10&matchLevel=city&query=${inputValue.split(" ").join("+")}&beginHighlight=<strong>&endHighlight=</strong>`)
        .then(d => d.json())
        .then(d => {
          if (d.suggestions) {
            setInputItems(d.suggestions.filter(d => d.matchLevel === "city").map(d => {
              return {
                ...d,
                simpleLabel: d.address.city
                  ? `${d.address.city}${d.address.state ? ", " + d.address.state : ""}, ${d.address.country}`
                  : d.address.country
                }
            }))
          } else {
            setInputItems([])
          }
        })
    },
  })

  return (
    <>
      <Box position="relative">
        <Box {...getComboboxProps()}>
          <InputGroup boxShadow="lg" size="lg">
            <Input
              {...getInputProps({ placeholder: "Search the map", className: "main-combobox" })}
              style={{ WebkitAppearance: "none" }}
              borderColor="transparent"
              borderRadius="md"
              _hover={{ borderColor: "transparent" }}
              _focus={{ borderColor: "rgba(236,97,14, 1)", boxShadow: `0 0 0 0.0625rem rgba(236,97,14, 1), 0 0 0 0.25rem rgba(236,97,14, 0.25)` }}
              _placeholder={{ color: "gray.500" }}
            />
            <InputRightElement>
              {
                inputValue ? (
                  <IconButton
                    icon="close"
                    isRound
                    size="sm"
                    aria-label={"toggle menu"}
                    onClick={() => setInputValue("")}
                  />
                ) : (
                  <Icon name="search" color="gray.500" />
                )
              }
            </InputRightElement>
          </InputGroup>
        </Box>
        {
          isOpen && inputItems.length ?
          <Box
            position="absolute"
            top="100%"
            left={0}
            right={0}
            mt="0.5rem"
            bg="white"
            borderRadius="md"
            shadow="md"
            maxHeight="14rem"
            overflow="scroll"
            py="0.75rem"
          >
            <List {...getMenuProps()}>
              {!inputItems.length
                ? (
                  <ListItem py="0.5rem" px="1rem" color="gray.500" alignItems="center" display="flex">
                    <Icon name="not-allowed" mr="0.25rem" />{ "Address not found" }
                  </ListItem>
                )
                : null}
              {inputItems.map((item, index) => {
                const val = item.simpleLabel
                return (
                  <ListItem
                    isTruncated
                    key={`${val}${index}`}
                    style={{
                      backgroundColor: highlightedIndex === index ? colors.orange[50] : "transparent",
                    }}
                    py="0.5rem"
                    px="1rem"
                    {...getItemProps({ item: val, index })}
                    dangerouslySetInnerHTML={{ __html: val }}
                  />
                )
              })
              }
            </List>
          </Box> : null
        }
      </Box>
    </>
  )
}

export default Combobox
