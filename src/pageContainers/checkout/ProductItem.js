import React from "react"
import { Box, Typography, IconButton } from "@material-ui/core"
import { useTranslation } from "react-i18next"
import Img from "gatsby-image"
import { navigate } from "gatsby"
import { motion } from "framer-motion"
import BackspaceIcon from "@material-ui/icons/Backspace"

const ProductItem = ({
  item,
  currency,
  scaleInPutOpts,
  handleRemoveProductFromCart,
}) => {
  const { slug, image, title, quantity, price } = item
  const { t } = useTranslation(["common"])

  return (
    <motion.div
      whileTap={{ scale: handleRemoveProductFromCart && 0.98 }}
      onClick={() => slug && navigate(`/shop/${slug}`)}
      className="item"
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
        {t("common:quantity")}: {quantity}
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
              handleRemoveProductFromCart(item)
            }}
          >
            <BackspaceIcon />
          </IconButton>
        </Box>
      )}
    </motion.div>
  )
}

export default ProductItem
