import React, { useState, useContext, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { Box, IconButton, useMediaQuery } from "@material-ui/core"
import MenuRoundedIcon from "@material-ui/icons/MenuRounded"
import { useTheme } from "@material-ui/core/styles"
import MenuOpenRoundedIcon from "@material-ui/icons/MenuOpenRounded"
import LogoLargeImage from "../../../static/logo_large.png"
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
import StyledHeader from "./Header.style"
import useWindowTopDistance from "../../hooks/useWindowTopDistance"

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

  const isLargerThenTen = useWindowTopDistance(10)
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
              {t("shop:title")}
            </NavLink>
          </Box>
        </Box>
      )
    },
    [handleCloseNavbar, t]
  )

  return (
    <StyledHeader isFixed={isLargerThenTen}>
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
            <div>Mobile Logo Here</div>
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
