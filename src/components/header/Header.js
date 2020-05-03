import React, { useState, useContext, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { Box, IconButton, useMediaQuery } from "@material-ui/core"
import MenuRoundedIcon from "@material-ui/icons/MenuRounded"
import { useTheme } from "@material-ui/core/styles"
import MenuOpenRoundedIcon from "@material-ui/icons/MenuOpenRounded"
import { navigate } from "gatsby"

import { isMobile } from "../../utils"
import { ProductsContext } from "../../context"
import {
  NavLink,
  CartIcon,
  LanguageSelector,
  Drawer,
  Cart,
} from "../../components"
import useWindowTopDistance from "../../hooks/useWindowTopDistance"
import LogoLargeImage from "../../../static/logo_large.png"
import LogoSmallImage from "../../../static/logo_small.png"
import StyledHeader from "./Header.style"

const Header = () => {
  const { t } = useTranslation()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isNavbarOpen, setIsNavbarOpen] = useState(false)
  const {
    productsInCart,
    cart,
    totalSumInCart,
    handleRemoveProductFromCart,
    handleEmptyCart,
  } = useContext(ProductsContext)

  const hasScrolledMoreThen20px = useWindowTopDistance(20)
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
    setIsNavbarOpen(oldState => !oldState)
  }, [])

  const handleCloseNavbar = useCallback(() => {
    isMobile() && setIsNavbarOpen(false)
  }, [])

  const getPageLinks = useCallback(
    className => {
      return (
        <Box className={className}>
          <Box>
            <NavLink to="/" onClick={handleCloseNavbar}>
              {t("home:title")}
            </NavLink>
          </Box>
          <Box>
            <NavLink to="/about" onClick={handleCloseNavbar}>
              {t("about:title")}
            </NavLink>
          </Box>
          <Box>
            <NavLink to="/shop" onClick={handleCloseNavbar}>
              {t("shop:title")}
            </NavLink>
          </Box>
        </Box>
      )
    },
    [handleCloseNavbar, t]
  )

  return (
    <StyledHeader isFixed={hasScrolledMoreThen20px}>
      <Box className="header">
        <Box>
          {!showMobileHeader ? (
            <img
              onClick={() => navigate("/")}
              className="logo-large"
              src={LogoLargeImage}
              alt="logo"
            />
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
            <img
              onClick={() => navigate("/")}
              className="logo-small"
              src={LogoSmallImage}
              alt="logo"
            />
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
          <Box className="language-select-mobile">
            <LanguageSelector color="secondary" />
          </Box>
          {getPageLinks("nav-links-mobile")}
        </Drawer>

        <Drawer
          side="right"
          isDrawerOpen={isCartOpen}
          handleCloseDrawer={() => setIsCartOpen(false)}
        >
          <Cart
            handleCloseDrawer={() => setIsCartOpen(false)}
            handleRemoveProductFromCart={handleRemoveProductFromCart}
            handleEmptyCart={handleEmptyCart}
            cart={cart}
            productsInCart={productsInCart}
            totalSumInCart={totalSumInCart}
          />
        </Drawer>
      </Box>
    </StyledHeader>
  )
}

export default Header
