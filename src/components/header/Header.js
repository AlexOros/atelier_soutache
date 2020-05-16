import React, { useState, useContext, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { Box, IconButton, Hidden } from "@material-ui/core"
import MenuRoundedIcon from "@material-ui/icons/MenuRounded"
import MenuOpenRoundedIcon from "@material-ui/icons/MenuOpenRounded"
import { navigate } from "gatsby"

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
    totalProductsInCart,
    cart,
    currency,
    totalSumInCart,
    handleRemoveProductFromCart,
    handleEmptyCart,
  } = useContext(ProductsContext)
  const hasScrolledMoreThen20px = useWindowTopDistance(3)

  const handleClickCart = useCallback(() => {
    setIsCartOpen(oldState => !oldState)
  }, [])

  const handleClickNavbar = useCallback(() => {
    setIsNavbarOpen(oldState => !oldState)
  }, [])

  const getPageLinks = useCallback(
    className => {
      return (
        <Box className={className}>
          <Box>
            <NavLink to="/" onClick={() => setIsNavbarOpen(false)}>
              {t("home:title")}
            </NavLink>
          </Box>
          <Box>
            <NavLink to="/about" onClick={() => setIsNavbarOpen(false)}>
              {t("about:title")}
            </NavLink>
          </Box>
          <Box>
            <NavLink to="/shop" onClick={() => setIsNavbarOpen(false)}>
              {t("shop:title")}
            </NavLink>
          </Box>
          <Box>
            <NavLink to="/contact" onClick={() => setIsNavbarOpen(false)}>
              Contact
            </NavLink>
          </Box>
        </Box>
      )
    },
    [t]
  )

  return (
    <StyledHeader isFixed={hasScrolledMoreThen20px}>
      <Box className="container">
        <Hidden smDown implementation="css">
          <img
            onClick={() => navigate("/")}
            className="logo-large"
            src={LogoLargeImage}
            alt="logo"
          />
        </Hidden>
        <Hidden mdUp implementation="css">
          <Box>
            <IconButton
              onClick={() => handleClickNavbar()}
              color="primary"
              aria-label="menu"
            >
              <MenuRoundedIcon />
            </IconButton>
          </Box>
        </Hidden>
        <Hidden smDown implementation="css">
          {getPageLinks("nav-links-desktop")}
        </Hidden>
        <Hidden mdUp implementation="css">
          <Box textAlign="center">
            <img
              onClick={() => navigate("/")}
              className="logo-small"
              src={LogoSmallImage}
              alt="logo"
            />
          </Box>
        </Hidden>
        <Box className="shop">
          <Hidden smDown implementation="css">
            <LanguageSelector />
          </Hidden>
          <CartIcon
            totalProductsInCart={totalProductsInCart}
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
            currency={currency}
            handleCloseDrawer={() => setIsCartOpen(false)}
            handleRemoveProductFromCart={handleRemoveProductFromCart}
            handleEmptyCart={handleEmptyCart}
            cart={cart}
            totalProductsInCart={totalProductsInCart}
            totalSumInCart={totalSumInCart}
          />
        </Drawer>
      </Box>
    </StyledHeader>
  )
}

export default Header
