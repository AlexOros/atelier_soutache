import React, { useState, useEffect, useContext } from "react"
import sal from "sal.js"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import "../../../node_modules/sal.js/dist/sal.css"
import { ProductsContext } from "../../context"
import { graphql, useStaticQuery } from "gatsby"
import classNames from "classnames"
import { useTranslation } from "react-i18next"
import Helmet from "react-helmet"

import { Header, Footer } from "../../components"
import useEffectAfterMount from "../../hooks/useEffectAfterMount"
import StyledMainLayout from "./Layout.style"

//-----------------------------------------------
// Gatsby Initial Query (runs on build time)
//-----------------------------------------------
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

//-----------------------------------------------
// Apollo Query (runs once on first load of website)
//-----------------------------------------------
const GET_PRODUCTS_STOCK = gql`
  {
    products(where: { show_product: true }) {
      uid
      price
      old_price
      stock
    }
  }
`

const LANGUAGE_KEY = "lang"
const LANGUAGES = { RO: "ro", EN: "en" }

const Layout = ({ children, props }) => {
  const { handleSetProducts, handleSetStaticInitialProducts } = useContext(
    ProductsContext
  )

  const { i18n } = useTranslation()

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

  /**** Handle Language persistence *****/
  useEffect(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_KEY) || LANGUAGES.RO
    const saveToLocalStorage = value => {
      localStorage.setItem(LANGUAGE_KEY, value)
    }
    i18n.on("languageChanged", saveToLocalStorage)
    i18n.changeLanguage(savedLanguage)

    return () => {
      i18n.off("languageChanged", saveToLocalStorage)
    }
  }, [i18n])

  const [reRender, setReRender] = useState(false)
  useEffectAfterMount(() => {
    setReRender(true)

    setTimeout(() => {
      setReRender(false)
    }, 400)
  }, [children])

  return (
    <StyledMainLayout>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Helmet>
      <Header />
      <main className={classNames("main", { fadeIn: reRender })}>
        {children}
      </main>
      <Footer />
    </StyledMainLayout>
  )
}

export default Layout
