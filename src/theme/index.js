import { createMuiTheme } from "@material-ui/core/styles"
import grey from "@material-ui/core/colors/grey"

import { slideUp } from "./keyframes/slide"
import { titleBase } from "./mixins"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1191C8",
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
