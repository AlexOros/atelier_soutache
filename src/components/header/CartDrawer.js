import React from "react"
import { useTranslation } from "react-i18next"
import { Typography, Box, Divider, IconButton, Button } from "@material-ui/core"
import Img from "gatsby-image"
import DeleteIcon from "@material-ui/icons/Delete"
import ShoppingBasketRoundedIcon from "@material-ui/icons/ShoppingBasketRounded"

import { StyledCartDrawer } from "./Header.style"

const CartNoProduct = ({ t }) => (
  <Box m={1} className="no-item" textAlign="center">
    {t("no_product_in_bag")}
  </Box>
)

const CartProduct = ({
  title,
  image,
  price,
  quantity,
  handleRemoveProductFromCart,
}) => {
  return (
    <Box className="item" m={1}>
      <Img className="image" fixed={image.childImageSharp.fixed} alt="" />
      <div>
        <Typography variant="body1">{title}</Typography>
        <div>
          {price} &euro; <span> &#x2715;</span> {quantity}
        </div>
      </div>

      <IconButton onClick={handleRemoveProductFromCart}>
        <DeleteIcon />
      </IconButton>
    </Box>
  )
}

const CartDrawer = ({
  openCart,
  cart,
  productsInCart,
  handleClose,
  handleRemoveProductFromCart,
}) => {
  const { t } = useTranslation("common")

  return (
    <StyledCartDrawer openCart={openCart} productsInCart={productsInCart}>
      <Button size="small" className="close" onClick={handleClose}>
        {t("close")}
      </Button>
      <Box mb={3} className={`title  ${openCart && "title-active"}`}>
        <Typography variant="h5">{t("my_bag")}</Typography>
        <span className="count">
          {productsInCart} - {t("products", { productsInCart })}
          <ShoppingBasketRoundedIcon />
        </span>
      </Box>
      <Divider />
      <Box className="items">
        {cart.length ? (
          cart.map(item => (
            <CartProduct
              handleRemoveProductFromCart={() =>
                handleRemoveProductFromCart(item)
              }
              key={item.id}
              {...item}
            />
          ))
        ) : (
          <CartNoProduct t={t} />
        )}
      </Box>
    </StyledCartDrawer>
  )
}

export default CartDrawer
