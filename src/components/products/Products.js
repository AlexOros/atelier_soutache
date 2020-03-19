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
    allStrapiProduct(filter: { show_product: { eq: true } }) {
      nodes {
        title
        price
        old_price
        stock
        slug
        image {
          childImageSharp {
            fluid(maxWidth: 900, quality: 80) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
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

const Products = ({ showPagination, amount = 6 }) => {
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
    itemsPerPage: amount,
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

      {showPagination && (
        <StyledPaginationComponent my={3}>
          <Pagination
            onChange={handleChangePage}
            size="large"
            count={maxPages}
          />
        </StyledPaginationComponent>
      )}
    </Box>
  )
}

export default Products
