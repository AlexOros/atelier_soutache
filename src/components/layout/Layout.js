import React, { useState, useEffect } from "react"
import { Header, Footer } from "../../components"
import StyledMainLayout from "./Layout.style"
import useEffectAfterMount from "../../hooks/useEffectAfterMount"
import sal from "sal.js"
import "../../../node_modules/sal.js/dist/sal.css"

const Layout = ({ children, props }) => {
  const [reRender, setReRender] = useState(false)

  useEffect(() => {
    sal({ threshold: 0.1, once: true })
  }, [children])

  useEffectAfterMount(() => {
    setReRender(() => true)

    setTimeout(() => {
      setReRender(() => false)
    }, 400)
  }, [children])

  return (
    <>
      <Header />
      <StyledMainLayout>
        <main className={reRender ? "fadeIn" : null}>{children}</main>
      </StyledMainLayout>
      <Footer />
    </>
  )
}

export default Layout
