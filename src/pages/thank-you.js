import React from "react"
import styled from "styled-components"
import { Typography, Button, Box } from "@material-ui/core"
import { navigate } from "gatsby"
import { useTranslation } from "react-i18next"

import { Section, Title, SEO } from "../components"
import { getRevealAnimation } from "../utils"
import ThankYouSVG from "../assets/svg/thank-you.svg"

const StyledThankYouMessage = styled.div`
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

  .message {
    margin: -5rem auto 0 auto;
    max-width: 400px;

    ${({ theme }) => theme.breakpoints.up("md")} {
      margin-top: 0;
    }
  }

  .message-background {
    background: ${({ theme }) => theme.palette.background.default};
    padding: ${({ theme }) => theme.spacing(1)};
    transform: rotate(9deg);
    transition: all 150ms 200ms ease-in-out;

    :hover {
      transform: rotate(0deg);
    }
  }
`

const CompletePage = () => {
  const { t } = useTranslation(["common", "thank_you"])

  return (
    <Section paddingTop={0} deg={-9}>
      <SEO title={t("thank_you:title")} />
      <Title
        {...getRevealAnimation("slide-down")}
        align="center"
        title={t("thank_you:section.title")}
        subtitle={"!"}
        variant="h3"
      />

      <StyledThankYouMessage>
        <ThankYouSVG {...getRevealAnimation("slide-right")} className="svg" />

        <div className="message" {...getRevealAnimation("slide-left")}>
          <div className="message-background">
            <Box>
              <Typography variant="h6">
                {t("thank_you:section.message.1")}{" "}
              </Typography>
            </Box>

            <Box mb={4}>
              <Typography variant="h6">
                {t("thank_you:section.message.2")}{" "}
              </Typography>
            </Box>

            <Box mb={4}>
              <Typography variant="h6">
                {t("thank_you:section.message.3")}{" "}
              </Typography>
            </Box>

            <Box fontStyle="italic">
              <Typography variant="h6">
                {t("thank_you:section.message.4")}{" "}
              </Typography>
            </Box>
            <span role="img" aria-label="happy emoji">
              💃
            </span>

            <Box mt={[4, 6, 8]}>
              <Button
                onClick={() => navigate("/shop")}
                color="primary"
                variant="contained"
                fullWidth
                disableElevation
              >
                {t("common:back_to_shop")}
              </Button>
            </Box>
          </div>
        </div>
      </StyledThankYouMessage>
    </Section>
  )
}

export default CompletePage
