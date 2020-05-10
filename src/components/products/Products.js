import React, { useContext, useState } from "react"
import Pagination from "@material-ui/lab/Pagination"
import { config, animated, useTrail } from "react-spring"

import { Box, useTheme, useMediaQuery } from "@material-ui/core"
import usePagination from "../../hooks/usePagination"
import { ProductsContext } from "../../context"
import { Product } from "../../components"
import { StyledProducts, StyledPaginationComponent } from "./Products.style"
import useEffectAfterMount from "../../hooks/useEffectAfterMount"

const Products = ({ showPagination, amount = 6 }) => {
  const { currency, products, handleAddProductToCart } = useContext(
    ProductsContext
  )

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

  const { paginatedItems, maxPages, handleChangePage } = usePagination({
    items: products,
    itemsPerPage: amount,
  })

  useEffectAfterMount(() => {
    setReset(() => false)
  }, [paginatedItems])

  const [reset, setReset] = useState(false)
  const trail = useTrail(paginatedItems.length, {
    config: { ...config.gentle, tension: 250, mass: 0.7 },
    opacity: 1,
    y: 0,
    from: { opacity: 0, y: 50 },
    reset,
  })

  return (
    <Box>
      <StyledProducts>
        {trail.map(({ y, ...rest }, index) => (
          <animated.div
            key={paginatedItems[index].uid}
            style={{
              ...rest,
              transform: y.interpolate(y => `translate3d(${y}px,0,0)`),
            }}
          >
            <Product
              currency={currency}
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
