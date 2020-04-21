import React, { useEffect, useContext, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import Pagination from "@material-ui/lab/Pagination"
import { config, animated, useTrail } from "react-spring"

import { Box, useTheme, useMediaQuery } from "@material-ui/core"
import usePagination from "../../hooks/usePagination"
import { ProductsContext } from "../../context"
import { Product } from "../../components"
import { StyledProducts, StyledPaginationComponent } from "./Products.style"
import useEffectAfterMount from "../../hooks/useEffectAfterMount"

const query = graphql`
  query ProductsQuery {
    allStrapiProduct(filter: { show_product: { eq: true } }) {
      nodes {
        title
        strapiId
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

const Products = ({ showPagination, amount = 6 }) => {
  const { products, handleSetProducts, handleAddProductToCart } = useContext(
    ProductsContext
  )
  const {
    allStrapiProduct: { nodes },
  } = useStaticQuery(query)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

  const { paginatedItems, maxPages, handleChangePage } = usePagination({
    items: products,
    itemsPerPage: amount,
  })

  useEffect(() => {
    handleSetProducts(nodes)
  }, [handleSetProducts, nodes])

  useEffectAfterMount(() => {
    setReset(() => false)
  }, [paginatedItems])

  const [reset, setReset] = useState(false)
  const trail = useTrail(paginatedItems.length, {
    config: { ...config.gentle, tension: 200 },
    opacity: 1,
    y: 0,
    from: { opacity: 0, y: 100 },
    reset,
  })

  return (
    <Box>
      <StyledProducts>
        {trail.map(({ y, ...rest }, index) => (
          <animated.div
            key={paginatedItems[index].id}
            style={{
              ...rest,
              transform: y.interpolate(y => `translate3d(${y}px,0,0)`),
            }}
          >
            <Product
              product={paginatedItems[index]}
              handleAddProductToCart={handleAddProductToCart}
            />
          </animated.div>
        ))}
      </StyledProducts>

      {showPagination && (
        <StyledPaginationComponent my={3}>
          <Pagination
            onChange={(event, nextPage) => {
              handleChangePage(event, nextPage)
              setReset(() => true)
            }}
            size={isSmallScreen ? "small" : "large"}
            count={maxPages}
          />
        </StyledPaginationComponent>
      )}
    </Box>
  )
}

export default Products
