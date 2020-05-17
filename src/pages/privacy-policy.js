import React from "react"
import { useTranslation } from "react-i18next"
import { Box, Typography } from "@material-ui/core"
import styled from "styled-components"

import { Section, Title, SEO } from "../components"
import { getRevealAnimation, mailTo } from "../utils"

const StyledArticle = styled(Section)`
  max-width: 800px;
  margin: 0 auto;

  ${({ theme }) => theme.mixins.linkHover()}
`

const StyledSection = styled(Box)`
  background: ${({ theme }) => theme.palette.background.default};
  padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(3)}`};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`

export default () => {
  const { t } = useTranslation("privacy_policy")

  return (
    <>
      <SEO title={t("title")} />
      <StyledArticle deg="-9" paddingTop="0">
        <Box mx={2} my={[4, 6]}>
          <Title
            align="center"
            {...getRevealAnimation("slide-down")}
            variant="h4"
            component="h1"
            title={t("title")}
          />
        </Box>

        {/* ------------------ Section 1 ------------------- */}
        <StyledSection
          {...getRevealAnimation("slide-left")}
          component="section"
        >
          <Typography variant="h6" component="h2">
            {t("section-1.title")}
          </Typography>

          {Object.values(
            t("section-1.text", {
              selfLink: "/",
              mailTo: mailTo("Privacy Policy"),
              dataProtectionLink: "https://www.dataprotection.ro/",
            })
          ).map((item, index) => (
            <Box key={index} mx={[0, 2]} my={1}>
              <Typography
                variant="body1"
                dangerouslySetInnerHTML={{ __html: item }}
              />
            </Box>
          ))}
        </StyledSection>
      </StyledArticle>
    </>
  )
}
