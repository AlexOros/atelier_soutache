import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import { useTranslation } from "react-i18next"
import { Box } from "@material-ui/core"

import { Section, SEO, Title } from "../components"
import StyledProductPage from "./product.style"

export default ({ data }) => {
  const { strapiProduct: product } = data
  const { t } = useTranslation("home")
  const [name, setName] = useState({ first: "", last: "" })

  useEffect(() => {
    if (product.title) {
      const [first, ...last] = product.title.split(" ")
      setName(() => ({ first, last: last.join(" ") }))
    }
  }, [product.title])

  return (
    <StyledProductPage>
      <SEO title={t("title")} />
      {/* // TODO add carosel here https://caferati.me/demo/react-awesome-slider/images */}
      <Section height="90" deg="9">
        <Box className="product">
          <Box className="story">.</Box>

          <Box className="info">
            <Box m={3}>
              <Title variant="h5" title={name.first} subtitle={name.last} />
            </Box>
          </Box>
        </Box>
      </Section>
    </StyledProductPage>
  )
}

export const query = graphql`
  query($slug: String!) {
    strapiProduct(slug: { eq: $slug }) {
      info_en
      info_ro
      old_price
      price
      stock
      story_ro
      story_en
      title
      image {
        childImageSharp {
          fluid(webpQuality: 80) {
            srcWebp
          }
        }
      }
    }
  }
`
