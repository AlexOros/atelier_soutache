import React, { useEffect, useContext, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"

import Pagination from "@material-ui/lab/Pagination"
import usePagination from "../../hooks/usePagination"
import { ProductsContext } from "../../context"
import { Product } from "../../components"
import StyledProducts from "./Products.style"

const query = graphql`
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
`

const Products = () => {
  const { products, handleSetProducts, handleAddProductToCart } = useContext(
    ProductsContext
  )
  const {
    allStrapiProduct: { nodes },
  } = useStaticQuery(query)

  const { page, maxPages, handleChangePage } = usePagination({
    items: products,
    itemsPerPage: 2,
  })

  useEffect(() => {
    handleSetProducts(nodes)
  }, [handleSetProducts, nodes])

  return (
    <div>
      <div>
        <Pagination
          onChange={handleChangePage}
          size="large"
          count={maxPages}
          color="secondary"
        />
      </div>
      <StyledProducts>
        {page.map(product => (
          <Product
            key={product.id}
            product={product}
            handleAddProductToCart={handleAddProductToCart}
          />
        ))}
      </StyledProducts>
    </div>
  )
}

export default Products
