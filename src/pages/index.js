import React from "react"
import { useTranslation } from "react-i18next"
import { Box } from "@material-ui/core"

import { Title, Section, SEO, Products } from "../components"
const IndexPage = () => {
  const { t } = useTranslation("home")

  return (
    <Box mt={[2, 4, 6]}>
      <SEO title={t("title")} description="Wtf my cohones?" />

      <Section deg={9}>
        <Box mx={2} my={[4, 6]}>
          <Title
            variant="h4"
            title={t("section-1.title.1")}
            subtitle={t("section-1.title.2")}
          />
        </Box>
        <Products />
      </Section>
    </Box>
  )
}

export default IndexPage
