import React from "react"
import { useTranslation } from "react-i18next"
import { Box } from "@material-ui/core"

import SEO from "../components/seo"
import { Title, Section, Product } from "../components"
const IndexPage = () => {
  const { t } = useTranslation("home")

  return (
    <Box mt={[2, 4, 6]}>
      <SEO title={t("title")} />

      <Section deg={9}>
        <Box mx={2} my={[4, 6]}>
          <Title
            variant="h4"
            title={t("section-1.title.1")}
            subtitle={t("section-1.title.2")}
          />
        </Box>

        <Box
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridGap: "20px",
          }}
        >
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </Box>
      </Section>
    </Box>
  )
}

export default IndexPage
