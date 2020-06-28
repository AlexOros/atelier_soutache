import React, { useContext, useState, useRef, useEffect } from "react"
import { Box, Typography } from "@material-ui/core"
import ShoppingBasketRoundedIcon from "@material-ui/icons/ShoppingBasketRounded"
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
  } = useContext(ProductsContext)
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
    console.log("𝕃𝕆𝔾 ⟹: handlePostData -> payload", payload)

    if (payload.hasError) {
      setFormState(oldState => ({ ...oldState, hasError: payload.hasError }))
      // TODO handle error (missing products) here
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
    totalSumInCart >= 250 ? totalSumInCart : totalSumInCart + 21

  const [delivery, setDelivery] = useState(deliveryDefault)
  useEffect(() => {
    setDelivery(oldDelivery => ({
      ...oldDelivery,
      image: imageList[0],
      title: t("checkout:delivery"),
      price: totalSumInCart >= 250 ? 0 : 21,
    }))
  }, [imageList, t, totalSumInCart])

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
                        key={item.uid}
                        scaleInPutOpts={scaleInPutOpts}
                        item={item}
                        currency={currency}
                        handleRemoveProductFromCart={
                          handleRemoveProductFromCart
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
                <Typography component="p" variant="h5">
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
          hasError={formState.hasError}
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
      <WindowLoader
        open={isLoadingForm}
        handleClose={() => {}}
        text={t("checkout:cart.loading")}
      />
    </>
  )
}

export default Checkout
