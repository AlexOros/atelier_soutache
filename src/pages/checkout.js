import React, { useContext, useCallback } from "react"
import { Box, Typography, IconButton } from "@material-ui/core"
import BackspaceIcon from "@material-ui/icons/Backspace"
import { ProductsContext } from "../context"
import { useTranslation } from "react-i18next"
import Img from "gatsby-image"
import { Title, Section, SEO } from "../components"
import { navigate } from "gatsby"
import { getRevealAnimation } from "../utils"

import StyledSummary from "../assets/styles/checkoutPage.style"

const Checkout = () => {
  const { t, i18n } = useTranslation(["common", "checkout"])
  const {
    cart,
    currency,
    totalSumInCart,
    handleRemoveProductFromCart,
  } = useContext(ProductsContext)

  const handleRemove = useCallback(
    item => {
      handleRemoveProductFromCart(item)
    },
    [handleRemoveProductFromCart]
  )

  return (
    <>
      <SEO title={t("checkout:title")} />

      <Section paddingTop={0}>
        <StyledSummary>
          <Title
            {...getRevealAnimation("slide-right")}
            variant="h5"
            title={t("checkout:section-1.title.1")}
            subtitle={t("checkout:section-1.title.2")}
          />

          <Box my={[2, 4]} className="summary">
            {cart.map(item => (
              <Box
                onClick={() => navigate(`/${item.slug}`)}
                className="item"
                key={item.id}
              >
                <Img
                  className="image"
                  fluid={item.image.childImageSharp.fluid}
                  alt=""
                />

                <Box className="title">
                  <Typography variant="h6">{item.title}</Typography>
                </Box>
                <Box className="quantity">
                  {" "}
                  {t("common:quantity")}: {item.quantity}
                </Box>
                <Box className="price">
                  {t("common:price")}: {item.price.toLocaleString()} {currency}
                </Box>
                <Box className="delete">
                  <IconButton
                    color="primary"
                    onClick={e => {
                      e.stopPropagation()
                      handleRemove(item)
                    }}
                  >
                    <BackspaceIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}
            <Box className="total">
              <Box className="quantity">
                {t("common:items")}:{" "}
                {cart.reduce(
                  (total, currItem) => (total += currItem.quantity),
                  0
                )}
              </Box>
              <Box className="sum">
                total: {totalSumInCart.toLocaleString()}{" "}
                <span className="currency">{currency}</span>
              </Box>
            </Box>
          </Box>
        </StyledSummary>
        <Box
          borderRadius={3}
          bgcolor="white"
          p={2}
          maxWidth={600}
          textAlign="center"
          mx="auto"
        >
          <Typography variant="h5">
            {i18n.language === "ro"
              ? "Serviciul nu este disponibil momentan"
              : "Checkout service not available yet, coming soon..."}
          </Typography>
        </Box>
      </Section>
    </>
  )
}

export default Checkout
