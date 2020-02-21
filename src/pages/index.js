import React from "react"
import { Link } from "gatsby"
import { useTranslation } from "react-i18next"
import { Typography, Box } from "@material-ui/core"

import SEO from "../components/seo"
import { Title, Section } from "../components"
const IndexPage = () => {
  const { t } = useTranslation("home")

  return (
    <Box mt={[2, 4, 6]}>
      <SEO title={t("title")} />

      <Section deg={9}>
        <Title
          variant="h3"
          title={t("section-1.title.1")}
          subtitle={t("section-1.title.2")}
        />
      </Section>
    </Box>
  )
}

export default IndexPage
