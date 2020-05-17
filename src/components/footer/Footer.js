import React, { useMemo } from "react"
import { Link } from "gatsby"
import { Box, Typography, IconButton } from "@material-ui/core"
import { useTranslation } from "react-i18next"
import FacebookIcon from "@material-ui/icons/Facebook"
import InstagramIcon from "@material-ui/icons/Instagram"
import LaunchRoundedIcon from "@material-ui/icons/LaunchRounded"

import VisaSvg from "../../assets/svg/visa.svg"
import MasterCardSvg from "../../assets/svg/mastercard.svg"
import { StyledFooter } from "./Footer.style"
import { mailTo } from "../../utils"

const Footer = () => {
  const { t } = useTranslation()

  const memoYear = useMemo(() => new Date().getFullYear(), [])

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
            <Link to="/shipping-and-returns">
              {t("shipping_and_returns:title")}
            </Link>

            <Link to="/terms-and-services">
              {t("terms_and_services:title")}
            </Link>
            <Link /*to="/privacy-policy" */>{t("privacy_policy:title")}</Link>

            <a
              href="https://anpc.ro/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Box display="flex" alignItems="center">
                <LaunchRoundedIcon fontSize="small" />
                ANPC
              </Box>
            </a>
          </Box>
        </Box>
        <Box component="section">
          <Typography className="title" variant="h5">
            Contact
          </Typography>
          <Box className="column">
            <Typography variant="body2">GA Studio II</Typography>
            <Typography variant="body2">{t("common:address")}</Typography>

            <Typography
              variant="body2"
              dangerouslySetInnerHTML={{ __html: mailTo("Contact") }}
            />
          </Box>

          <Box my={1} className="social">
            <a
              href="https://www.facebook.com/DianaAtelierSoutache"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconButton color="secondary">
                <FacebookIcon fontSize="large" />
              </IconButton>{" "}
            </a>
            <a
              href="https://www.instagram.com/ateliersoutache/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconButton color="secondary">
                <InstagramIcon fontSize="large" />
              </IconButton>
            </a>
          </Box>
        </Box>
      </Box>

      <Box className="copy" pt={[0, 1, 3]} pb={3} px={1}>
        <Typography variant="body2">
          &copy; {memoYear} Atelier Soutache, {t("common:all_rights_reserved")}.
        </Typography>

        <Typography variant="body2">
          {t("common:photo_by")}{" "}
          <a
            href="https://www.instagram.com/silvia_aftene/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Silvia Aftene
          </a>
        </Typography>

        <Typography variant="body2">
          {t("common:coded_by")}{" "}
          <a
            href="https://www.linkedin.com/in/oros-alexandru/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Oros Alexandru
          </a>
        </Typography>
      </Box>
      <Box className="payment-logos" maxWidth={50}>
        <VisaSvg />
        <MasterCardSvg />
      </Box>
    </StyledFooter>
  )
}

export default Footer
