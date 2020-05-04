import React, { useEffect, useState, useCallback, useRef } from "react"
import { navigate } from "gatsby"
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
  <Box m={[0.5, 1]} className="no-item" textAlign="center">
    <Typography variant="body1"> {t("no_product_in_bag")}</Typography>
  </Box>
)

const Total = ({
  totalSumInCart,
  currency,
  t,
  handleEmptyCart,
  handleCloseDrawer,
}) => {
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
          <span className="currency">{currency}</span>
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
      <Box m={[2, 4, 6]} textAlign="center">
        <Button
          onClick={() => {
            navigate("/checkout")
            handleCloseDrawer()
          }}
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
  currency,
  title,
  image,
  price,
  quantity,
  handleRemoveProductFromCart,
}) => {
  const [show, setShow] = useState(false)
  const isDoneDeleting = useRef(true)

  useEffect(() => {
    setShow(true)
  }, [])

  const handleRemove = useCallback(() => {
    if (quantity === 1) setShow(false)
    if (isDoneDeleting.current) {
      isDoneDeleting.current = false
      setTimeout(() => {
        handleRemoveProductFromCart()
        isDoneDeleting.current = true
      }, 200)
    }
  }, [handleRemoveProductFromCart, quantity])

  return (
    <Zoom in={show}>
      <Box className="item" m={[0.5, 1]}>
        <Img className="image" fixed={image.childImageSharp.fixed} alt="" />
        <div>
          <Typography className="title" variant="body1">
            {title}
          </Typography>
          <div>
            {price.toLocaleString()}{" "}
            <span className="currency">{currency}</span> <span> &#x2715;</span>{" "}
            {quantity}
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
  cart = [],
  currency,
  totalProductsInCart,
  handleRemoveProductFromCart,
  handleEmptyCart,
  totalSumInCart,
  handleCloseDrawer,
}) => {
  const { t } = useTranslation("common")

  return (
    <StyledCartDrawer totalProductsInCart={totalProductsInCart}>
      <Box>
        <Box mb={[1, 2, 3]} className="header-title">
          <Typography variant="h6">{t("my_bag")}</Typography>
          <span className="count">
            {totalProductsInCart}{" "}
            {t("products", { count: totalProductsInCart })}
            <ShoppingBasketRoundedIcon />
          </span>
        </Box>
        <Divider />
      </Box>
      <Box className="items">
        {cart.length ? (
          cart.map(item => (
            <CartProduct
              currency={currency}
              key={item.strapiId}
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
          currency={currency}
          handleCloseDrawer={handleCloseDrawer}
          handleEmptyCart={handleEmptyCart}
          t={t}
          totalSumInCart={totalSumInCart}
        />
      </Box>
    </StyledCartDrawer>
  )
}

export default Cart
