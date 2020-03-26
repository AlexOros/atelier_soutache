import React from "react"
import { Link } from "gatsby"
import { Box, Typography, Button } from "@material-ui/core"
import { useTranslation } from "react-i18next"

import { StyledFooter } from "./Footer.style"

const Footer = () => {
  const { t } = useTranslation()

  return (
    <StyledFooter>
      <Box className="pages">
        <Box component="section">
          <Typography className="title" variant="h5">
            Soutache
          </Typography>
          <Box className="column links">
            <Link to="/">{t("home:title")}</Link>
            <Link to="/about">{t("about:title")}</Link>
            <Link to="/shop">{t("shop:title")}</Link>
          </Box>
        </Box>
        <Box component="section">
          <Typography className="title" variant="h5">
            Help
          </Typography>
          <Box className="column links">
            <Link to="/shipping-and-returns ">
              {t("shipping_and_returns:title")}
            </Link>
            <Link to="/payment-methods">{t("payment_methods:title")}</Link>
            <Link to="/terms-and-services">
              {t("terms_and_services:title")}
            </Link>
            <Link to="/privacy-policy">{t("privacy_policy:title")}</Link>
            <a
              href="https://anpc.ro/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ANPC
            </a>
          </Box>
        </Box>
        <Box component="section">
          <Typography className="title" variant="h5">
            Contact
          </Typography>
          <Box className="column ">
            <a href="mailto:www.ateliersoutache@gmail.com?Subject=Support">
              www.ateliersoutache@gmail.com
            </a>
          </Box>
          <Box my={3} className="social">
            <Box>Facebook</Box>
            <Box>Instagram</Box>
          </Box>
        </Box>
      </Box>
      <Box py={3} px={1} textAlign="center">
        &copy; {new Date().getFullYear()} Atelier Soutache,{" "}
        {t("common:all_rights_reserved")}.
        <br /> {t("common:coded_by")}{" "}
        <a
          href="https://www.linkedin.com/in/oros-alexandru/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          Oros Alexandru
        </a>
      </Box>
    </StyledFooter>
  )
}

export default Footer
