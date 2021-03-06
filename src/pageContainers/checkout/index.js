import React, { useContext, useState, useRef, useEffect, useMemo } from "react"
import { Box, Typography, Snackbar, IconButton } from "@material-ui/core"
import ShoppingBasketRoundedIcon from "@material-ui/icons/ShoppingBasketRounded"
import CloseIcon from "@material-ui/icons/Close"
import { useTranslation } from "react-i18next"
import { AnimatePresence, motion } from "framer-motion"
import { graphql, useStaticQuery } from "gatsby"

import { ProductsContext } from "../../context"
import { Title, Section, SEO, WindowLoader } from "../../components"
import { getRevealAnimation } from "../../utils"
import postData from "../../api/postData"
import { StyledSummary } from "./CheckoutPage.style"
import { scaleInOut } from "../../animationsVariants"
import ProductItem from "./ProductItem"
import Consent from "./Consent"
import Total from "./Total"

const scaleInPutOpts = {
  variants: scaleInOut,
  initial: "hidden",
  animate: "visible",
  exit: "hidden",
}

const DELIVERY_COST = 21

const deliveryDefault = {
  image: "",
  title: "Delivery",
  quantity: 1,
  price: 21,
}

const PURCHASE_URL = `${process.env.GATSBY_API_BASE_URL}/purchase`

const query = graphql`
  query delivery {
    allFile(filter: { name: { eq: "delivery" } }) {
      nodes {
        childImageSharp {
          fluid(maxWidth: 900, quality: 80) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  }
`

const Checkout = () => {
  const { t } = useTranslation(["common", "checkout"])
  const {
    cart,
    totalSumInCart,
    currency,
    handleRemoveProductFromCart,
    handleSetErrorOnCartProduct,
  } = useContext(ProductsContext)
  const [snack, setSnack] = useState(false)
  const [hasAgreed, setHasAgreed] = useState(false)
  const formRef = useRef(null)
  const [formState, setFormState] = useState({
    hostName: "",
    base64JsonRequest: "",
    base64Checksum: "",
  })
  const {
    allFile: { nodes: imageList },
  } = useStaticQuery(query)

  const [isLoadingForm, setIsLoadingForm] = useState(false)
  const handlePostData = async () => {
    const cartAndDelivery = [...cart, delivery]
    const payload = await postData(PURCHASE_URL, cartAndDelivery)

    if (payload.hasError) {
      handleSetErrorOnCartProduct(payload.productsList)
      setSnack(true)
    } else {
      setFormState(() => payload)
      setIsLoadingForm(true)
    }
  }

  const handleHasAgreed = () => setHasAgreed(!hasAgreed)

  useEffect(() => {
    if (formState.base64Checksum) formRef.current.submit()
  }, [formState])

  const totalItems = cart.reduce(
    (total, currItem) => (total += currItem.quantity),
    1
  )

  const totalSumInCartWithDelivery =
    totalSumInCart >= 250 ? totalSumInCart : totalSumInCart + DELIVERY_COST

  const [delivery, setDelivery] = useState(deliveryDefault)
  useEffect(() => {
    setDelivery(oldDelivery => ({
      ...oldDelivery,
      image: imageList[0],
      title: t("checkout:delivery"),
      price: totalSumInCart >= 250 ? 0 : DELIVERY_COST,
    }))
  }, [imageList, t, totalSumInCart])

  const hasErrors = useMemo(
    () =>
      cart.reduce((diff, curr) => {
        if (curr.error !== 0 && curr.error < curr.quantity) {
          return (diff += curr.quantity - curr.error)
        }
        return diff
      }, 0),
    [cart]
  )

  return (
    <>
      <SEO title={t("checkout:title")} />

      <Section paddingTop={0}>
        <StyledSummary>
          <Box mb={[6, 8]} mt={[4, 8, 10]}>
            <Title
              {...getRevealAnimation("slide-down")}
              variant="h4"
              title={t("checkout:section-1.title.1")}
              subtitle={t("checkout:section-1.title.2")}
            />
          </Box>

          <AnimatePresence exitBeforeEnter>
            {cart.length ? (
              <motion.div key="0" {...scaleInPutOpts} className="summary">
                <AnimatePresence>
                  <>
                    {cart.map(item => (
                      <ProductItem
                        error={item.error && item.error < item.quantity}
                        key={item.uid}
                        scaleInPutOpts={scaleInPutOpts}
                        item={item}
                        realStock={item.error}
                        currency={currency}
                        handleRemoveProductFromCart={() =>
                          handleRemoveProductFromCart(item)
                        }
                      />
                    ))}
                    <ProductItem
                      scaleInPutOpts={scaleInPutOpts}
                      item={delivery}
                      currency={currency}
                    />
                  </>
                </AnimatePresence>

                <Total
                  {...getRevealAnimation("slide-right")}
                  t={t}
                  totalItems={totalItems}
                  totalSumInCart={totalSumInCartWithDelivery}
                  currency={currency}
                />
              </motion.div>
            ) : (
              <motion.div key="1" {...scaleInPutOpts} className="empty">
                <Typography component="p" variant="h4">
                  {t("common:no_product_in_bag")}
                </Typography>
                <span className="empty-bag">
                  <ShoppingBasketRoundedIcon />
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </StyledSummary>

        <Consent
          scaleInPutOpts={scaleInPutOpts}
          productsInCart={cart.length}
          hasAgreed={hasAgreed}
          handleHasAgreed={handleHasAgreed}
          handlePostData={handlePostData}
          hasError={hasErrors !== 0}
        />

        <form
          ref={formRef}
          action={formState.hostName}
          method="post"
          acceptCharset="UTF-8"
        >
          <input
            type="hidden"
            name="jsonRequest"
            value={`${formState.base64JsonRequest}`}
          />
          <input
            type="hidden"
            name="checksum"
            value={`${formState.base64Checksum}`}
          />
        </form>
      </Section>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={snack}
        autoHideDuration={10000}
        onClose={() => setSnack(false)}
        message={t("checkout:cart.remove_extra_items")}
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setSnack(false)}
            >
              <CloseIcon />
            </IconButton>
          </>
        }
      />
      <WindowLoader
        open={isLoadingForm}
        handleClose={() => {}}
        text={t("checkout:cart.loading")}
      />
    </>
  )
}

export default Checkout
