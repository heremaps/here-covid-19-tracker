
import { theme } from "@chakra-ui/core"
import openColor from "open-color"
// import ibmColors from "ibm-design-colors/ibm-colors.json"
// import { red } from "@ant-design/colors"
// import { blue } from "material-ui-colors"

//
// For ant and oc
//
function convertColorArray(c) {
  return c.reduce((acc, cur, i) => {
    if (!i) acc[50] = cur
    else acc[i*100] = cur
    return acc
  }, {})
}

//
// For ibm
//
// function convertIBMColors(c) {
//   return Object.keys(c).reduce((acc, cur, i) => {
//     acc[!i ? 50 : cur * 10] = c[cur]
//     return acc
//   }, {})
// }

// For OC
// convertColorArray(openColor.blue)

// For IBM
// convertIBMColors(ibmColors.blue)

// For ANT
// convertColorArray(red)

// For MUI
// Just use the color out of the box

export default {
  ...theme.colors,
  blue: convertColorArray(openColor.blue),
  gray: {
    "50": "#F5F5F5",
    "100": "#EBEBEC",
    "200": "#E1E2E3",
    "300": "#CCCDCF",
    "400": "#AFB1B5",
    "500": "#9B9DA2",
    "600": "#6A6D74",
    "700": "#383C45",
    "800": "#232833",
    "900": "#0F1621"
  },
  red: convertColorArray(openColor.red),
  orange: convertColorArray(openColor.orange),
  yellow: convertColorArray(openColor.yellow),
  pink: convertColorArray(openColor.pink),
  grape: convertColorArray(openColor.grape),
  violet: convertColorArray(openColor.indigo),
  cyan: convertColorArray(openColor.cyan),
  teal: convertColorArray(openColor.teal),
  green: convertColorArray(openColor.green),
  lime: convertColorArray(openColor.lime),
}
