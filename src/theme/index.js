import { createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
  palette: {
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
})

console.log("𝕃𝕆𝔾 ⟹: theme", theme)
export default theme
