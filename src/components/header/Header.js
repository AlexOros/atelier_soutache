import React, { useState, useContext, useCallback } from "react"
import { useTranslation } from "react-i18next"
import {
  Button,
  Menu,
  MenuItem,
  Box,
  ClickAwayListener,
} from "@material-ui/core"
import LanguageRoundedIcon from "@material-ui/icons/LanguageRounded"
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded"

import { ProductsContext } from "../../context"
import { NavLink, Cart } from "../../components"
import StyledHeader from "./Header.style"

const Header = () => {
  const { t, i18n } = useTranslation()
  const [anchorEl, setAnchorEl] = useState(null)
  const [isCartOpened, setIsCartOpened] = useState(false)
  const { nOfProductsInCart } = useContext(ProductsContext)

  const handleClose = useCallback(
    lang => {
      if (lang) {
        i18n.changeLanguage(lang)
      }
      setAnchorEl(null)
    },
    [i18n]
  )

  const handleClickCart = useCallback(() => {
    setIsCartOpened(oldState => !oldState)
  }, [setIsCartOpened])

  return (
    <ClickAwayListener onClickAway={() => setIsCartOpened(false)}>
      <StyledHeader openCart={isCartOpened}>
        <Box>
          <h5>Logo here</h5>
        </Box>
        <Box className="nav-links">
          <Box>
            <NavLink to="/">{t("home:title")}</NavLink>
          </Box>
          <Box>
            <NavLink to="/about">{t("about:title")}</NavLink>
          </Box>
        </Box>

        <Box className="shop">
          {i18n.language && (
            <Box>
              <Button
                style={{ textTransform: "lowercase" }}
                size="small"
                startIcon={<LanguageRoundedIcon fontSize="small" />}
                endIcon={<ExpandMoreRoundedIcon />}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={e => setAnchorEl(e.currentTarget)}
              >
                {i18n.language}
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => handleClose()}
              >
                <MenuItem onClick={() => handleClose("ro")}>ro</MenuItem>
                <MenuItem onClick={() => handleClose("en")}>en</MenuItem>
              </Menu>
            </Box>
          )}
          <Cart
            productsInCart={nOfProductsInCart}
            handleClick={handleClickCart}
          />
        </Box>

        <Box boxShadow={3} className="quick-view">
          Box dasd asdas asdasdasdasdas
        </Box>
      </StyledHeader>
    </ClickAwayListener>
  )
}

export default Header
