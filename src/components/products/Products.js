import React, { useEffect, useContext } from "react"
import { graphql, useStaticQuery } from "gatsby"

import { ProductsContext } from "../../context"
import { Product } from "../../components"
import StyledProducts from "./Products.style"

const Products = () => {
  const { products, handleSetProducts, handleAddProductToCart } = useContext(
    ProductsContext
  )
  const {
    allStrapiProduct: { nodes },
  } = useStaticQuery(graphql`
    query ProductsQuery {
      allStrapiProduct {
        nodes {
          title
          price
          old_price
          stock
          image {
            childImageSharp {
              fluid(maxWidth: 900, quality: 100) {
                ...GatsbyImageSharpFluid
              }
              fixed(width: 200, height: 200) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  `)

  useEffect(() => {
    handleSetProducts(nodes)
  }, [handleSetProducts, nodes])

  return (
    <StyledProducts>
      {products.map(product => (
        <Product
          key={product.id}
          product={product}
          handleAddProductToCart={handleAddProductToCart}
        />
      ))}
    </StyledProducts>
  )
}

export default Products
