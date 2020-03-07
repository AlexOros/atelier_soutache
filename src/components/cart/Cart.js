import React, { useMemo, useEffect, useState, useCallback } from "react"
import { useTranslation } from "react-i18next"
import {
  Typography,
  Box,
  Divider,
  IconButton,
  Button,
  Popper,
  makeStyles,
  Paper,
  ClickAwayListener,
  Zoom,
} from "@material-ui/core"
import Img from "gatsby-image"
import DeleteIcon from "@material-ui/icons/Delete"
import BackspaceIcon from "@material-ui/icons/Backspace"
import ShoppingBasketRoundedIcon from "@material-ui/icons/ShoppingBasketRounded"

import { StyledCartDrawer, StyledTotal } from "./Cart.styled"

const useStyles = makeStyles(theme => ({
  totalPopperContent: {
    padding: theme.spacing(2),
    borderRadius: "5px",
    background: theme.palette.pink.light,
  },
  confirm: {
    display: "flex",
    justifyContent: "space-around",
  },
}))

const CartNoProduct = ({ t }) => (
  <Box m={1} className="no-item" textAlign="center">
    <Typography variant="body1"> {t("no_product_in_bag")}</Typography>
  </Box>
)

const Total = ({ totalSumInCart, t, handleEmptyCart }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const classes = useStyles()
  const handleTogglePopper = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const open = Boolean(anchorEl)
  const id = open ? "simple-popper" : undefined

  return (
    <StyledTotal m={1}>
      <Box className="total">
        <div></div>
        <Typography variant="h6">
          Total: {totalSumInCart}
          <span className="euro"> &euro;</span>{" "}
        </Typography>
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          <Box>
            <IconButton
              disabled={!totalSumInCart}
              aria-describedby={id}
              onClick={handleTogglePopper}
              color="secondary"
            >
              <DeleteIcon />
            </IconButton>
            <Popper
              transition
              style={{ zIndex: 1300 }}
              placement="left"
              id={id}
              open={open}
              anchorEl={anchorEl}
            >
              <Paper className={classes.totalPopperContent}>
                <Typography variant="body1">
                  {t("remove_all_products")}
                </Typography>
                <Box mt={1} className={classes.confirm}>
                  <Button variant="contained" disableElevation color="primary">
                    {t("no")}
                  </Button>
                  <Button
                    onClick={handleEmptyCart}
                    variant="contained"
                    disableElevation
                    color="primary"
                  >
                    {t("yes")}
                  </Button>
                </Box>
              </Paper>
            </Popper>
          </Box>
        </ClickAwayListener>
      </Box>
      <Box m={6} textAlign="center">
        <Button
          disabled={!totalSumInCart}
          fullWidth
          color="secondary"
          variant="contained"
          disableElevation
        >
          {t("checkout")}
        </Button>
      </Box>
    </StyledTotal>
  )
}

const CartProduct = ({
  title,
  image,
  price,
  quantity,
  handleRemoveProductFromCart,
}) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  const handleRemove = useCallback(() => {
    if (quantity === 1) setShow(false)
    setTimeout(() => {
      handleRemoveProductFromCart()
    }, 200)
  }, [handleRemoveProductFromCart, quantity])

  return (
    <Zoom in={show}>
      <Box className="item" m={1}>
        <Img className="image" fixed={image.childImageSharp.fixed} alt="" />
        <div>
          <Typography className="title" variant="body1">
            {title}
          </Typography>
          <div>
            {price} &euro; <span> &#x2715;</span> {quantity}
          </div>
        </div>

        <IconButton color="secondary" onClick={handleRemove}>
          <BackspaceIcon />
        </IconButton>
      </Box>
    </Zoom>
  )
}

const Cart = ({
  cart,
  productsInCart,
  handleClose,
  handleRemoveProductFromCart,
  handleEmptyCart,
}) => {
  const { t } = useTranslation("common")

  const totalSumInCart = useMemo(
    () =>
      cart.reduce((total, currItem) => {
        currItem.quantity > 1
          ? (total += currItem.price * currItem.quantity)
          : (total += currItem.price)
        return total
      }, 0),
    [cart]
  )

  return (
    <StyledCartDrawer productsInCart={productsInCart}>
      <Box>
        <Box mb={[1, 2, 3]} className="header-title">
          <Typography variant="h6">{t("my_bag")}</Typography>
          <span className="count">
            {productsInCart} {t("products", { count: productsInCart })}
            <ShoppingBasketRoundedIcon />
          </span>
        </Box>
        <Divider />
      </Box>
      <Box className="items">
        {cart.length ? (
          cart.map(item => (
            <CartProduct
              key={item.id}
              handleRemoveProductFromCart={() =>
                handleRemoveProductFromCart(item)
              }
              {...item}
            />
          ))
        ) : (
          <CartNoProduct t={t} />
        )}
      </Box>
      <Box my={1}>
        <Divider />
        <Total
          handleEmptyCart={handleEmptyCart}
          t={t}
          totalSumInCart={totalSumInCart}
        />
      </Box>
    </StyledCartDrawer>
  )
}

export default Cart
