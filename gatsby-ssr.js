import React from "react"
import { I18nextProvider } from "react-i18next"
import { MuiThemeProvider, responsiveFontSizes } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "styled-components"

import { ApolloProvider } from "@apollo/react-hooks"

import { client } from "./src/api/apollo"
import { ProductsProvider } from "./src/context"
import theme from "./src/theme"
import GlobalStyle from "./src/theme/global-style"

import { Layout } from "./src/components"
import i18next from "./src/api/i18n"

const responsiveTheme = responsiveFontSizes(theme)

export const wrapRootElement = ({ element }) => {
  return (
    <ApolloProvider client={client}>
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
      </I18nextProvider>
    </ApolloProvider>
  )
}
