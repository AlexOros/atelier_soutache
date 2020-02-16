import React from "react"
import PropTypes from "prop-types"

import { withTrans } from "../../i18n/withTrans"
import { Header } from "../../components"
// import Footer from "../components/Footer"

const Layout = ({ children }) => {
  return (
    <>
      {/* <Sidebar></Sidebar> */}
      <Header />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default withTrans(Layout)
