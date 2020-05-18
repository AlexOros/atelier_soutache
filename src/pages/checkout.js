import React, { useContext, useCallback, useState } from "react"
import { Box, Typography, IconButton, Checkbox } from "@material-ui/core"
import BackspaceIcon from "@material-ui/icons/Backspace"
import { ProductsContext } from "../context"
import { useTranslation } from "react-i18next"
import Img from "gatsby-image"
import { navigate, Link } from "gatsby"
import ShoppingBasketRoundedIcon from "@material-ui/icons/ShoppingBasketRounded"

import { Title, Section, SEO } from "../components"
import { getRevealAnimation } from "../utils"

import {
  StyledSummary,
  StyledConsent,
} from "../assets/styles/checkoutPage.style"

const Checkout = () => {
  const { t, i18n } = useTranslation(["common", "checkout"])
  const {
    cart,
    currency,
    totalSumInCart,
    handleRemoveProductFromCart,
  } = useContext(ProductsContext)
  const [hasAgreed, setHasAgreed] = useState(false)

  const handleRemove = useCallback(
    item => {
      handleRemoveProductFromCart(item)
    },
    [handleRemoveProductFromCart]
  )

  const totalItems = cart.reduce(
    (total, currItem) => (total += currItem.quantity),
    0
  )

  return (
    <>
      <SEO title={t("checkout:title")} />

      <Section paddingTop={0}>
        <StyledSummary px={[2, 4, 6]}>
          <Box mb={[6, 8]} mt={[4, 8, 10]}>
            <Title
              {...getRevealAnimation("slide-down")}
              variant="h4"
              title={t("checkout:section-1.title.1")}
              subtitle={t("checkout:section-1.title.2")}
            />
          </Box>

          {cart.length ? (
            <Box
              {...getRevealAnimation("slide-left")}
              my={[2, 4]}
              className="summary"
            >
              {cart.map(item => (
                <Box
                  key={item.uid}
                  onClick={() => navigate(`/shop/${item.slug}`)}
                  className="item"
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
                    {t("common:price")}: {item.price.toLocaleString()}{" "}
                    {currency}
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
              <Total
                {...getRevealAnimation("slide-right")}
                t={t}
                totalItems={totalItems}
                totalSumInCart={totalSumInCart}
                currency={currency}
              />
            </Box>
          ) : (
            <Box className="empty">
              <Typography component="p" variant="h5">
                {t("common:no_product_in_bag")}
              </Typography>
              <span className="empty-bag">
                <ShoppingBasketRoundedIcon />
              </span>
            </Box>
          )}
        </StyledSummary>

        <StyledConsent
          py={2}
          px={[0, 2]}
          className="consent"
          {...getRevealAnimation("slide-right")}
        >
          <Typography>
            <Checkbox
              color="default"
              checked={hasAgreed}
              onChange={() => setHasAgreed(!hasAgreed)}
              inputProps={{
                "aria-label": "I agree to terms and conditions checkbox",
              }}
            />
            {t("common:i_agree")}{" "}
            <Link to="/terms-and-services">
              {t("common:terms_and_services")}
            </Link>
            .
          </Typography>

          <Typography className="note" variant="caption">
            ( {t("common:agree_to_advance")} )
          </Typography>
        </StyledConsent>

        <Box
          my={[4, 8]}
          bgcolor="rgb(250, 250, 250)"
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

function Total({ t, totalItems, totalSumInCart, currency }) {
  return (
    <Box className="total">
      <Box className="quantity">
        {t("common:items")}: {totalItems}
      </Box>
      <Box className="sum">
        total: {totalSumInCart.toLocaleString()}{" "}
        <span className="currency">{currency}</span>
      </Box>
    </Box>
  )
}
