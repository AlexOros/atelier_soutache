import React from "react"
import { Box, Typography, IconButton } from "@material-ui/core"
import { useTranslation } from "react-i18next"
import Img from "gatsby-image"
import { navigate } from "gatsby"
import BackspaceIcon from "@material-ui/icons/Backspace"

import { StyledProductItem } from "./CheckoutPage.style"
import { motion } from "framer-motion"

const ProductItem = ({
  error,
  item,
  currency,
  scaleInPutOpts,
  realStock,
  handleRemoveProductFromCart,
}) => {
  const { slug, image, title, quantity, price } = item
  const { t } = useTranslation(["common"])

  const hasError = Boolean(realStock && realStock < quantity)

  return (
    <StyledProductItem
      error={error}
      whileTap={{ scale: handleRemoveProductFromCart && 0.98 }}
      onClick={() => slug && navigate(`/shop/${slug}`)}
      {...scaleInPutOpts}
    >
      {image && (
        <Img
          className="image"
          fluid={image.childImageSharp.fluid}
          alt={`${t("common:soutache_product")} ${title}`}
        />
      )}

      <Box className="title">
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Box className="quantity">
        <span>
          {t("common:quantity")}: {quantity}
        </span>
        {hasError && (
          <motion.div {...scaleInPutOpts} className="diff">
            {t("common:in_stock")} {realStock}
          </motion.div>
        )}
      </Box>
      <Box className="price">
        {t("common:price")}: {price.toLocaleString()} {currency}
      </Box>

      {handleRemoveProductFromCart && (
        <Box className="delete">
          <IconButton
            color="primary"
            onClick={e => {
              e.stopPropagation()
              handleRemoveProductFromCart()
            }}
          >
            <BackspaceIcon />
          </IconButton>
        </Box>
      )}
    </StyledProductItem>
  )
}

export default ProductItem
