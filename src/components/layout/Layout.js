import React, { useState, useEffect, useContext } from "react"
import sal from "sal.js"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import "../../../node_modules/sal.js/dist/sal.css"
import { ProductsContext } from "../../context"
import { graphql, useStaticQuery } from "gatsby"

import { Header, Footer } from "../../components"
import useEffectAfterMount from "../../hooks/useEffectAfterMount"
import StyledMainLayout from "./Layout.style"

//----------------------------------------------
// Gatsby Initial Query (runs on build time)
//----------------------------------------------
const query = graphql`
  query ProductsQuery {
    allStrapiProduct(
      filter: { show_product: { eq: true } }
      sort: { fields: created_at, order: ASC }
    ) {
      nodes {
        title
        uid
        price
        old_price
        stock
        slug
        image {
          childImageSharp {
            fluid(maxWidth: 900, quality: 80) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
            fixed(width: 400, height: 400) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`

//----------------------------------------------
// Apollo Query (runs once on first load of website)
//----------------------------------------------
const GET_PRODUCTS_STOCK = gql`
  {
    products {
      stock
      uid
    }
  }
`

const Layout = ({ children, props }) => {
  const { handleSetProducts, handleSetStaticInitialProducts } = useContext(
    ProductsContext
  )

  const {
    allStrapiProduct: { nodes },
  } = useStaticQuery(query)
  useEffect(() => {
    handleSetStaticInitialProducts(nodes)
  }, [handleSetStaticInitialProducts, nodes])

  const { data } = useQuery(GET_PRODUCTS_STOCK)
  useEffect(() => {
    if (data) {
      const { products } = data
      handleSetProducts(products)
    }
  }, [data, handleSetProducts])

  useEffect(() => {
    sal({ threshold: 0.1, once: true })
  }, [children])

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
