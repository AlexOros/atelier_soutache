import React, { useContext, useState } from "react"
import Pagination from "@material-ui/lab/Pagination"
import { config, animated, useTrail } from "react-spring"

import { Box, useTheme, useMediaQuery } from "@material-ui/core"
import usePagination from "../../hooks/usePagination"
import { ProductsContext } from "../../context"
import { Product } from "../../components"
import { StyledProducts, StyledPaginationComponent } from "./Products.style"
import useEffectAfterMount from "../../hooks/useEffectAfterMount"

const Products = ({ amount = 6, currentPage, handleSetCurrentPage }) => {
  const { currency, handleAddProductToCart, products } = useContext(
    ProductsContext
  )
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

  const { paginatedItems, maxPages, changePage } = usePagination({
    items: products,
    itemsPerPage: amount,
    currentPage,
  })

  const handleChangePage = (event, nextPage) => {
    changePage(event, nextPage)
    handleSetCurrentPage(nextPage)
    setReset(() => true)

    if (window && isSmallScreen)
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      })
  }

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

      {handleSetCurrentPage && typeof handleAddProductToCart === "function" && (
        <StyledPaginationComponent my={3}>
          <Pagination
            color={isSmallScreen ? "secondary" : "standard"}
            onChange={(event, nextPage) => handleChangePage(event, nextPage)}
            page={currentPage}
            count={maxPages}
          />
        </StyledPaginationComponent>
      )}
    </Box>
  )
}

export default Products
