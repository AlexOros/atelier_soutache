import React, { useState } from "react"
import { Box, Typography, Button, ClickAwayListener } from "@material-ui/core"
import ShoppingBasketRoundedIcon from "@material-ui/icons/ShoppingBasketRounded"
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded"
import { useTranslation } from "react-i18next"
import Img from "gatsby-image"

import { isMobile } from "../../utils"
import StyledProduct from "./Product.style"

const Product = ({ title, price, old_price, image, stock, categories }) => {
  const [showDetails, setShowDetails] = useState(false)
  const { t } = useTranslation("common")

  return (
    <ClickAwayListener onClickAway={() => setShowDetails(false)}>
      <StyledProduct
        onMouseEnter={() => !isMobile() && setShowDetails(true)}
        onMouseLeave={() => !isMobile() && setShowDetails(false)}
        onClick={() => isMobile() && setShowDetails(true)}
        details={showDetails ? 1 : 0}
        boxShadow={3}
      >
        <Img className="image" fluid={image.childImageSharp.fluid} alt="" />
        <Box px={2} pt={[4, 6, 8]} className="overlay">
          <Box letterSpacing={4}>
            <Typography className="title" variant="h3">
              <span className="first-word">{title.split(" ")[0]}</span>{" "}
              {title.split(" ")[1]}
            </Typography>
          </Box>
          <Box className="hr">
            <hr />
          </Box>

          <Typography className="price" variant="body1">
            {old_price && <span className="old">{old_price} &euro;</span>}
            <span className="new">
              <span>{price} &euro;</span>
              <span>
                <span className="stock">
                  {t("stock")}: {stock}
                </span>
              </span>
            </span>
          </Typography>

          <Box className="actions">
            <Button
              size={!isMobile() ? "small" : "medium"}
              startIcon={<ShoppingBasketRoundedIcon />}
              className="button"
            >
              {t("add_to_bag")}
            </Button>
            <Button
              size={!isMobile() ? "small" : "medium"}
              endIcon={<ArrowForwardRoundedIcon />}
              className="button"
            >
              {t("to_product")}
            </Button>
          </Box>
        </Box>
        <Box letterSpacing={2} pt={1} px={2} className="footer">
          <Typography variant="body2">
            <span className="first-word">{title.split(" ")[0]}</span>{" "}
            {title.split(" ")[1]}
          </Typography>
        </Box>
      </StyledProduct>
    </ClickAwayListener>
  )
}

export default Product
