import React, {
  useContext,
  useCallback,
  useState,
  useRef,
  useEffect,
} from "react"
import {
  Box,
  Typography,
  IconButton,
  Checkbox,
  Button,
} from "@material-ui/core"
import BackspaceIcon from "@material-ui/icons/Backspace"
import ShoppingBasketRoundedIcon from "@material-ui/icons/ShoppingBasketRounded"
import { ProductsContext } from "../context"
import { useTranslation } from "react-i18next"
import Img from "gatsby-image"
import { navigate, Link } from "gatsby"
import { AnimatePresence, motion } from "framer-motion"

import { Title, Section, SEO, WindowLoader } from "../components"
import { getRevealAnimation } from "../utils"
import postData from "../api/postData"
import {
  StyledSummary,
  StyledFinishPay,
} from "../assets/styles/checkoutPage.style"
import { scaleInOut } from "../animationsVariants"

const scaleInPutOpts = {
  variants: scaleInOut,
  initial: "hidden",
  animate: "visible",
  exit: "hidden",
}

const PURCHASE_URL = `${process.env.GATSBY_API_BASE_URL}/purchase`

const Checkout = () => {
  const { t } = useTranslation(["common", "checkout"])
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

  const formRef = useRef(null)
  const [formState, setFormState] = useState({
    hostName: "",
    base64JsonRequest: "",
    base64Checksum: "",
  })
  const handlePostData = async () => {
    const payload = await postData(PURCHASE_URL, cart)

    setFormState(() => payload)
  }

  useEffect(() => {
    if (formState.base64Checksum) {
      formRef.current.submit()
    }
  }, [formState])

  const totalItems = cart.reduce(
    (total, currItem) => (total += currItem.quantity),
    0
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
                  {cart.map(item => (
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      key={item.uid}
                      onClick={() => navigate(`/shop/${item.slug}`)}
                      className="item"
                      {...scaleInPutOpts}
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
                    </motion.div>
                  ))}
                </AnimatePresence>

                <Total
                  {...getRevealAnimation("slide-right")}
                  t={t}
                  totalItems={totalItems}
                  totalSumInCart={totalSumInCart}
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
          productsInCart={cart.length}
          hasAgreed={hasAgreed}
          setHasAgreed={setHasAgreed}
          handlePostData={handlePostData}
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
        open={!!formState.base64Checksum}
        handleClose={() => {}}
        text={t("checkout:cart.loading")}
      />
    </>
  )
}

export default Checkout

const Consent = ({
  hasAgreed,
  setHasAgreed,
  handlePostData,
  productsInCart,
}) => {
  const { t } = useTranslation(["common"])

  return (
    <StyledFinishPay py={2} px={[0, 2]} className="consent">
      <AnimatePresence exitBeforeEnter>
        {hasAgreed ? (
          <motion.div key="0" {...scaleInPutOpts} transition="transition">
            <Button
              disabled={!productsInCart}
              disableElevation
              color="primary"
              variant="contained"
              className="consent"
              onClick={handlePostData}
            >
              {t("common:pay")}
            </Button>
          </motion.div>
        ) : (
          <motion.div key="1" {...scaleInPutOpts} transition="transition">
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
          </motion.div>
        )}
      </AnimatePresence>
    </StyledFinishPay>
  )
}

const Total = ({ t, totalItems, totalSumInCart, currency }) => {
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
