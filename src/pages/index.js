import React, { useContext } from "react"
import { Link } from "gatsby"
import { useTranslation } from "react-i18next"

import SEO from "../components/seo"

const IndexPage = () => {
  const { t } = useTranslation()
  return (
    <section>
      <SEO title="Home" />
      <h2>{t("title")}</h2>
      <h4>{t("description")}</h4>
    </section>
  )
}

export default IndexPage
