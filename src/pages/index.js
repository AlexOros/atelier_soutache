import React from "react"
import { Link } from "gatsby"
import { useTranslation } from "react-i18next"
import { Typography, Box } from "@material-ui/core"

import SEO from "../components/seo"
import { Title } from "../components"
const IndexPage = () => {
  const { t } = useTranslation("home")

  return (
    <section>
      <SEO title={t("title")} />
      <Typography variant="h5">
        {t("title")} - {t("description")}
      </Typography>
    </section>
  )
}

export default IndexPage
