import React from "react"
import PropTypes from "prop-types"

import { CartProvider } from "../../context"
import { Header } from "../../components"
import StyledMainLayout from "./Layout.style"

const Layout = ({ children }) => {
  return (
    <>
      <CartProvider>
        <Header />
      </CartProvider>
      <StyledMainLayout component="main">{children}</StyledMainLayout>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
