import React, { useState, useContext, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { Box, IconButton, useMediaQuery } from "@material-ui/core"
import MenuRoundedIcon from "@material-ui/icons/MenuRounded"
import { useTheme } from "@material-ui/core/styles"
import MenuOpenRoundedIcon from "@material-ui/icons/MenuOpenRounded"

import { isMobile } from "../../utils"
import { ProductsContext } from "../../context"
import {
  NavLink,
  CartIcon,
  LanguageSelector,
  Drawer,
  Cart,
} from "../../components"
import StyledHeader from "./Header.style"
import useWindowTopDistance from "../../hooks/useWindowTopDistance"

const Header = () => {
  const { t } = useTranslation()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isNavbarOpen, setIsNavbarOpen] = useState(false)
  const {
    productsInCart,
    cart,
    handleRemoveProductFromCart,
    handleEmptyCart,
  } = useContext(ProductsContext)
  const { top } = useWindowTopDistance()
  const theme = useTheme()
  const showMobileHeader = useMediaQuery(theme.breakpoints.down("sm"))

  const handleClickCart = useCallback(() => {
    let ms = 0
    if (isNavbarOpen) {
      ms = 500
      setIsNavbarOpen(() => false)
    }
    setTimeout(() => setIsCartOpen(oldState => !oldState), ms)
  }, [isNavbarOpen])

  const handleClickNavbar = useCallback(() => {
    let ms = 0
    if (isCartOpen) {
      ms = 500
      setIsCartOpen(() => false)
    }
    setTimeout(() => setIsNavbarOpen(oldState => !oldState), ms)
  }, [isCartOpen])

  const handleCloseNavbar = useCallback(() => {
    isMobile() && setTimeout(() => setIsNavbarOpen(false), 500)
  }, [])

  const getPageLinks = useCallback(
    className => {
      return (
        <Box className={className}>
          <Box>
            <NavLink onClick={handleCloseNavbar} to="/">
              {t("home:title")}
            </NavLink>
          </Box>
          <Box>
            <NavLink onClick={handleCloseNavbar} to="/about">
              {t("about:title")}
            </NavLink>
          </Box>
          <Box>
            <NavLink onClick={handleCloseNavbar} to="/shop">
              Shop
            </NavLink>
          </Box>
        </Box>
      )
    },
    [handleCloseNavbar, t]
  )

  return (
    <StyledHeader isFixed={top >= 80}>
      <Box className="header">
        <Box>
          {!showMobileHeader ? (
            <h5>Logo here</h5>
          ) : (
            <IconButton
              onClick={() => handleClickNavbar()}
              color="primary"
              aria-label="menu"
            >
              <MenuRoundedIcon />
            </IconButton>
          )}
        </Box>

        {!showMobileHeader ? (
          getPageLinks("nav-links-desktop")
        ) : (
          <Box textAlign="center">
            <h5>Logo here</h5>
          </Box>
        )}

        <Box className="shop">
          {!showMobileHeader && <LanguageSelector />}
          <CartIcon
            productsInCart={productsInCart}
            handleClick={handleClickCart}
          />
        </Box>
        <Drawer
          closeIcon={<MenuOpenRoundedIcon />}
          isDrawerOpen={isNavbarOpen}
          handleCloseDrawer={() => setIsNavbarOpen(false)}
        >
          {getPageLinks("nav-links-mobile")}
        </Drawer>

        <Drawer
          side="right"
          isDrawerOpen={isCartOpen}
          handleCloseDrawer={() => setIsCartOpen(false)}
        >
          <Cart
            handleRemoveProductFromCart={handleRemoveProductFromCart}
            handleEmptyCart={handleEmptyCart}
            cart={cart}
            productsInCart={productsInCart}
          />
        </Drawer>
      </Box>
    </StyledHeader>
  )
}

export default Header
