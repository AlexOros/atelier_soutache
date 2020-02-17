import React, { useContext } from "react"
import { Link } from "gatsby"
import { useTranslation } from "react-i18next"

import SEO from "../components/seo"
import { BrandTitle } from "../components"
const IndexPage = () => {
  const { t } = useTranslation("home")

  return (
    <section>
      <SEO title={t("title")} />
      <BrandTitle variant="h1">This is my title</BrandTitle>
    </section>
  )
}

export default IndexPage
