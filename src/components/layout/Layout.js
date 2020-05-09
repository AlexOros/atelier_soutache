import React, { useState, useEffect, useContext } from "react"
import sal from "sal.js"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import "../../../node_modules/sal.js/dist/sal.css"
import { ProductsContext } from "../../context"

import { Header, Footer } from "../../components"
import useEffectAfterMount from "../../hooks/useEffectAfterMount"
import StyledMainLayout from "./Layout.style"

const GET_PRODUCTS_STOCK = gql`
  {
    products {
      stock
      uid
    }
  }
`

const Layout = ({ children, props }) => {
  const { handleSetProducts } = useContext(ProductsContext)
  const { data } = useQuery(GET_PRODUCTS_STOCK)
  const [reRender, setReRender] = useState(false)

  useEffect(() => {
    if (data) {
      const { products } = data
      handleSetProducts(products)
    }
  }, [data, handleSetProducts])

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
