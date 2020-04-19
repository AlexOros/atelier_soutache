import React, { useState } from "react"

import { Header, Footer } from "../../components"
import StyledMainLayout from "./Layout.style"
import useEffectAfterMount from "../../hooks/useEffectAfterMount"

const Layout = ({ children, props }) => {
  const [reRender, setReRender] = useState(false)

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
