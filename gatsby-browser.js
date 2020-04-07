import React from "react"
import { I18nextProvider } from "react-i18next"
import { MuiThemeProvider, responsiveFontSizes } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "styled-components"
import { Helmet } from "react-helmet"

import { ProductsProvider } from "./src/context"
import theme from "./src/theme"
import GlobalStyle from "./src/theme/global-style"

import { Layout } from "./src/components"
import i18next from "./src/config/i18n"

const responsiveTheme = responsiveFontSizes(theme)

const CLIENT_ID =
  "AYTJuDuNNIUA9GFu9y8pHe25JAUqIQEPT6Rk2jzVmVK4Flf64YDaEAyacNCu3bQd0OGOLN4Zrr_8AKZw"

export const wrapRootElement = ({ element }) => {
  return (
    <I18nextProvider i18n={i18next}>
      <MuiThemeProvider theme={responsiveTheme}>
        <ThemeProvider theme={responsiveTheme}>
          <CssBaseline />
          <GlobalStyle />
          <ProductsProvider>
            <Layout>{element}</Layout>
          </ProductsProvider>
        </ThemeProvider>
      </MuiThemeProvider>
      <Helmet>
        <script
          src={`https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}&currency=EUR&locale=en_RO`}
        ></script>
      </Helmet>
    </I18nextProvider>
  )
}
