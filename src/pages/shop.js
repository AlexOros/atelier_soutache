import React from "react"
import { useTranslation } from "react-i18next"
import { Box } from "@material-ui/core"

import { Section, Products, Title, SEO } from "../components"

export default () => {
  const { t } = useTranslation("home")

  return (
    <>
      <SEO title={t("title")} />

      <Section deg="-9">
        <Box mx={2} my={[4, 6]}>
          <Title variant="h4" title="Shop" />
        </Box>
        <Products showPagination amount={3} />
      </Section>
    </>
  )
}
