import React from "react"
import PropTypes from "prop-types"

import { Header, Footer } from "../../components"
import StyledMainLayout from "./Layout.style"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <StyledMainLayout component="main">{children}</StyledMainLayout>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
