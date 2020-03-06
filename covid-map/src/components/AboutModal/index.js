/*
 * Copyright (C) 2020 HERE Europe B.V.
 * Licensed under MIT, see full license in LICENSE
 * SPDX-License-Identifier: MIT
 */

import React, { useRef } from "react"
import {
  Box,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  SlideIn,
} from "@chakra-ui/core"

import AboutContent from "../AboutContent"

const AboutModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <Box flex="none" display={["none", null, "block"]} ml="0.75rem">
      <IconButton
        size="lg"
        icon="info"
        isRound
        variant="outline"
        bg="white"
        shadow="lg"
        border="0.125rem solid"
        borderColor="transparent"
        _focus={{
          borderColor: "rgba(236,97,14, 1)",
          color: "rgba(236,97,14, 1)"
        }}
        onClick={onOpen}
        ref={btnRef}
      />

      <SlideIn in={isOpen}>
        {styles => (
          <Modal 
            finalFocusRef={btnRef}
            onClose={onClose}
            scrollBehavior="inside"
            isOpen={true}
            size={["calc(100% - 2rem)", null, "2xl"]}
          >
            <ModalOverlay opacity={styles.opacity} zIndex={99999999} />
            <ModalContent borderRadius="lg" {...styles} zIndex={99999999}>
              <ModalCloseButton />
              <ModalBody py="3rem" px="2.5rem">
                <AboutContent />
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </SlideIn>

    </Box>
  )
}

export default AboutModal
