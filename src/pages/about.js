import React from "react"
import { useTranslation } from "react-i18next"
import { Typography } from "@material-ui/core"

import SEO from "../components/seo"

export default () => {
  const { t } = useTranslation("about")

  return (
    <section>
      <SEO title={t("title")} />
      <Typography variant="h5">
        {" "}
        {t("title")} - {t("description")}
      </Typography>
    </section>
  )
}
