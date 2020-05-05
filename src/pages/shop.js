import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Box } from "@material-ui/core"

import { Section, Products, Title, SEO } from "../components"
import { getRevealAnimation, isMobile } from "../utils"

export default () => {
  const { t } = useTranslation("shop")
  const [isMobileFlag, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(isMobile())
  }, [])

  return (
    <>
      <SEO title={t("title")} />

      <Section paddingTop={0} deg="-9">
        <Box mx={2} my={[4, 6]}>
          <Title
            align="center"
            {...getRevealAnimation("slide-down")}
            variant="h4"
            title={t("title")}
          />
        </Box>
        <Products showPagination amount={isMobileFlag ? 2 : 6} />
      </Section>
    </>
  )
}
