import React from "react"
import styled from "styled-components"
import { Typography, Button, Box } from "@material-ui/core"
import { navigate, Link } from "gatsby"
import { useTranslation } from "react-i18next"

import { Section, Title, SEO } from "../components"
import { getRevealAnimation } from "../utils"
import FailedSVG from "../assets/svg/purchase-failed.svg"

const StyledThankYouMessage = styled.div`
  ${({ theme }) => theme.mixins.linkHover("")}
  ${({ theme }) => theme.breakpoints.up("md")} {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .svg {
    height: 100vh;
    max-width: 100vw;
    margin-top: -5rem;

    ${({ theme }) => theme.breakpoints.up("md")} {
      margin-top: 0;
      height: 80vh;
      max-width: 50vw;
    }
    margin-right: ${({ theme }) => theme.spacing(3)};
  }

  .message-container {
    border: 5px solid ${({ theme }) => theme.palette.pink.light};
    background: ${({ theme }) => theme.palette.background.default};
    padding: ${({ theme }) => theme.spacing(1)};
    margin: -5rem auto 0 auto;
    max-width: 400px;
    ${({ theme }) => theme.breakpoints.up("md")} {
      margin-top: 0;
    }
  }
`

const PurchaseFailed = () => {
  const { t } = useTranslation(["common", "failed"])

  return (
    <Section paddingTop={0} deg={-9} showShape={false}>
      <SEO title={t("failed:title")} />
      <Title
        {...getRevealAnimation("slide-down")}
        align="center"
        title={t("failed:title")}
        subtitle={"!"}
        variant="h3"
      />

      <StyledThankYouMessage>
        <FailedSVG {...getRevealAnimation("slide-right")} className="svg" />

        <div
          className="message-container"
          {...getRevealAnimation("slide-left")}
        >
          <Typography variant="h6">
            {t("failed:message")}{" "}
            <Link to={"/contact"}> {t("common:here")}</Link>.
          </Typography>

          <Box mt={[4, 6, 8]}>
            <Button
              onClick={() => navigate("/")}
              color="primary"
              variant="contained"
              fullWidth
              disableElevation
            >
              {t("common:back_to_home")}
            </Button>
          </Box>
        </div>
      </StyledThankYouMessage>
    </Section>
  )
}

export default PurchaseFailed
