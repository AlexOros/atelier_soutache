import { createMuiTheme } from "@material-ui/core/styles"

import { slideUp } from "./keyframes/slide"
import { titleBase } from "./mixins"

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#797979",
      main: "#606060",
      dark: "#4f4f4f",
    },

    secondary: {
      light: "#fbe0df",
      main: "#f9d2d0",
      dark: "#f7c4c1",
      contrastText: "#606060",
    },

    pink: {
      light: "#fbe0df",
      main: "#f9d2d0",
      dark: "#f7c4c1",
      contrastText: "#606060",
    },
    text: {
      primary: "#606060",
    },
  },
  typography: {
    fontFamily: '"Poppins", "sans-serif"',
  },
  spacing: factor => `${0.5 * factor}rem`,

  mixins: {
    titleBase,
  },
  keyframes: {
    slideUp,
  },
})

export default theme
