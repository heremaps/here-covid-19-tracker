
import { theme } from "@chakra-ui/core"

import customIcons from "./icons"
import colors from "./colors"

export default {
  ...theme,
  colors,
  icons: {
    ...theme.icons,
    ...customIcons,
  },
  fonts: {
    body: "FiraGO, 'IBM Plex Sans', system-ui, sans-serif",
    heading: "FiraGO, 'IBM Plex Sans', system-ui, sans-serif",
    mono: "FiraGO, 'IBM Plex Mono', Menlo, monospace",
  },
  lineHeights: {
    normal: "1.6",
    none: "1",
    shorter: "1.25",
    short: "1.375",
    base: "1.6",
    tall: "1.625",
    taller: "2",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.25rem",
    xl: "1.5rem",
    "2xl": "2rem",
    "3xl": "2.75rem",
    "4xl": "3.5rem",
    "5xl": "4.25rem",
    "6xl": "5rem",
  },
  breakpoints: ["30em", "50em", "62em", "80em"],
}
