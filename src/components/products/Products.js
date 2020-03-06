import React, { useEffect, useContext } from "react"
import { graphql, useStaticQuery } from "gatsby"
import Pagination from "@material-ui/lab/Pagination"

import { Box } from "@material-ui/core"
import usePagination from "../../hooks/usePagination"
import { ProductsContext } from "../../context"
import { Product } from "../../components"
import { StyledProducts, StyledPaginationComponent } from "./Products.style"

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

  useEffect(() => {
    handleSetProducts(nodes)
  }, [handleSetProducts, nodes])

  const { paginatedItems, maxPages, handleChangePage } = usePagination({
    items: products,
    itemsPerPage: 3,
  })

  return (
    <Box>
      <StyledProducts>
        {paginatedItems.map(product => (
          <Product
            key={product.id}
            product={product}
            handleAddProductToCart={handleAddProductToCart}
          />
        ))}
      </StyledProducts>

      <StyledPaginationComponent my={3}>
        <Pagination onChange={handleChangePage} size="large" count={maxPages} />
      </StyledPaginationComponent>
    </Box>
  )
}

export default Products
