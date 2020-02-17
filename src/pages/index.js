import React, { useContext } from "react"
import { Link } from "gatsby"
import { useTranslation } from "react-i18next"

import SEO from "../components/seo"

const IndexPage = () => {
  const { t } = useTranslation("home")

  return (
    <section>
      <SEO title={t("title")} />
      <h2>{t("section-1.title")}</h2>
      <h4>{t("section-1.description")}</h4>
    </section>
  )
}

export default IndexPage
