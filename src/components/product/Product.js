import React, { useState, useEffect, useCallback } from "react"
import { useTranslation } from "react-i18next"
import Img from "gatsby-image"
import { Box, Typography, Button, ClickAwayListener } from "@material-ui/core"
import ShoppingBasketRoundedIcon from "@material-ui/icons/ShoppingBasketRounded"
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded"

import { ButtonLink } from "../../components"
import { isMobile } from "../../utils"
import StyledProduct from "./Product.style"

const Product = ({ handleAddProductToCart, product, currency }) => {
  const { title, price, old_price, image, stock } = product
  const [showDetails, setShowDetails] = useState(false)
  const [outOfStock, setOutOfStock] = useState(false)
  const [isMobileFlag, setIsMobileFlag] = useState(false)
  const [name, setName] = useState({ first: "", last: "" })
  const { t } = useTranslation("common")

  useEffect(() => {
    if (title) {
      const [first, ...last] = title.split(" ")
      setName(() => ({ first, last: last.join(" ") }))
    }
  }, [title])

  useEffect(() => {
    if (stock < 1) {
      setTimeout(() => setOutOfStock(true), 500)
    } else {
      setOutOfStock(false)
    }
  }, [stock])

  useEffect(() => {
    setIsMobileFlag(() => isMobile())
  }, [])

  const handleAddProductToCartWithCheck = useCallback(() => {
    if (!showDetails) return
    handleAddProductToCart(product)
  }, [showDetails, handleAddProductToCart, product])

  return (
    <ClickAwayListener
      onClickAway={() => isMobileFlag && setShowDetails(false)}
    >
      <StyledProduct
        onMouseEnter={() => !isMobileFlag && setShowDetails(true)}
        onMouseLeave={() => !isMobileFlag && setShowDetails(false)}
        onClick={() => isMobileFlag && setShowDetails(oldShowDetails => true)}
        details={showDetails ? 1 : 0}
        boxShadow={3}
      >
        <Img className="image" fluid={image.childImageSharp.fluid} alt="" />

        <Box px={2} pt={[4, 6, 8]} className="overlay">
          <Box letterSpacing={4}>
            <Typography className="title" variant="h3">
              <span className="first-word">{name.first}</span> {name.last}
            </Typography>
          </Box>
          <Box className="hr">
            <hr />
          </Box>

          <Typography className="price" variant="body1">
            {old_price && (
              <span className="old">
                {old_price.toLocaleString()}{" "}
                <span className="currency">{currency}</span>
              </span>
            )}
            <span className="new">
              <span>
                {price.toLocaleString()}{" "}
                <span className="currency">{currency}</span>
              </span>
              <span>
                <span className="stock">
                  {t("stock")}: {stock}
                </span>
              </span>
            </span>
          </Typography>

          <Box className="actions">
            <Button
              disabled={outOfStock}
              onClick={handleAddProductToCartWithCheck}
              size={!isMobileFlag ? "small" : "medium"}
              startIcon={<ShoppingBasketRoundedIcon />}
              className={`button ${outOfStock && "disabled"}`}
            >
              {t("add_to_bag")}
            </Button>
            <ButtonLink
              className="button"
              endIcon={<ArrowForwardRoundedIcon />}
              to={`/${product.slug}`}
              size={!isMobileFlag ? "small" : "medium"}
            >
              {t("to_product")}
            </ButtonLink>
          </Box>
        </Box>
        <Box letterSpacing={2} pt={1} px={2} className="footer">
          <Typography variant="body2">
            <span className="first-word">{name.first}</span> {name.last}
          </Typography>
        </Box>
      </StyledProduct>
    </ClickAwayListener>
  )
}

export default Product
