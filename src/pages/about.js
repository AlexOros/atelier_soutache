import React from "react"
import { useTranslation } from "react-i18next"
import { Box } from "@material-ui/core"

import { SEO, Section, Title } from "../components"

export default () => {
  const { t } = useTranslation("about")

  return (
    <>
      <SEO title={t("title")} />
      <Box my={10}>
        <Title
          align="center"
          title={t("section-1.title.1")}
          subtitle={t("section-1.title.2")}
          variant="h4"
        />
      </Box>
      <Section paddingTop={0} deg={-9}></Section>
    </>
  )
}
