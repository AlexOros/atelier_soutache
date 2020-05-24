import React, { useContext } from "react"
import { useTranslation } from "react-i18next"
import { Box, useTheme, useMediaQuery } from "@material-ui/core"

import { ProductsContext } from "../context"
import { Section, Products, Title, SEO } from "../components"
import { getRevealAnimation } from "../utils"

export default () => {
  const { storePage, setStorePage } = useContext(ProductsContext)
  const { t } = useTranslation("shop")
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

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
        <Products
          amount={isSmallScreen ? 8 : 6}
          currentPage={storePage}
          handleSetCurrentPage={setStorePage}
        />
      </Section>
    </>
  )
}
