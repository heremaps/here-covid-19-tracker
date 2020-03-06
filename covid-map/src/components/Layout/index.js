
import React from "react"
import { Global } from "@emotion/core"
import { ThemeProvider, CSSReset } from "@chakra-ui/core"

import theme from "./theme"
import globalStyles from "./globalStyles"

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Global styles={globalStyles} />
      {children}
    </ThemeProvider>
  )
}

export default Layout
