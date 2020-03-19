import React from "react"
import { useTranslation } from "react-i18next"
import { Box } from "@material-ui/core"

import { Title, Section, SEO, Products, Testimonials } from "../components"
const IndexPage = () => {
  const { t } = useTranslation("home")

  return (
    <>
      {/* TODO add description in en and ro for each page */}
      <SEO title={t("title")} />

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
      <Section deg={-9}></Section>
      <Section deg={9}></Section>
      <Box my={15}>
        <Testimonials />
      </Box>
    </>
  )
}

export default IndexPage
