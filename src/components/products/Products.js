import React, { useEffect, useContext } from "react"
import { graphql, useStaticQuery } from "gatsby"

import { ProductsContext } from "../../context"
import { Product } from "../../components"
import StyledProducts from "./Products.style"

const Products = () => {
  const { products, setProducts, handleAddProductToCart } = useContext(
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
            }
          }
        }
      }
    }
  `)

  useEffect(() => {
    setProducts(nodes)
  }, [setProducts, nodes])

  return (
    <StyledProducts>
      {products.map(product => (
        <Product
          key={product.id}
          {...product}
          handleAddProductToCart={handleAddProductToCart}
        />
      ))}
    </StyledProducts>
  )
}

export default Products
