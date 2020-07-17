import React from "react"
import { Typography, Checkbox, Button, Box } from "@material-ui/core"
import { useTranslation } from "react-i18next"
import { Link } from "gatsby"
import { AnimatePresence, motion } from "framer-motion"

import { StyledFinishPay } from "./CheckoutPage.style"

const Consent = ({
  scaleInPutOpts,
  hasAgreed,
  productsInCart,
  hasError,
  handleHasAgreed,
  handlePostData,
}) => {
  const { t } = useTranslation(["common"])

  return (
    <StyledFinishPay py={2} px={[0, 2]} className="consent">
      <AnimatePresence exitBeforeEnter>
        {hasAgreed ? (
          <motion.div key="0" {...scaleInPutOpts} transition="transition">
            <Box>
              <Typography variant="h6">
                {t("common:payment_disabled")}
              </Typography>
            </Box>
            <Box my={2} mx="auto">
              <Button
                disabled={!productsInCart || hasError}
                // disabled={false}
                disableElevation
                color="primary"
                variant="contained"
                className="consent"
                onClick={handlePostData}
              >
                {t("common:pay")}
              </Button>
            </Box>
          </motion.div>
        ) : (
          <motion.div key="1" {...scaleInPutOpts} transition="transition">
            <Typography>
              <Checkbox
                color="default"
                checked={hasAgreed}
                onChange={handleHasAgreed}
                inputProps={{
                  "aria-label": `${t("common:i_agree")} ${t(
                    "common:terms_and_services"
                  )}`,
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

export default Consent
