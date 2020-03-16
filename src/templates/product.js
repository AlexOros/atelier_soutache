import React, { useMemo, useState, useEffect } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { useTranslation } from "react-i18next"
import { Box, Button, Typography } from "@material-ui/core"
import ShoppingBasketRoundedIcon from "@material-ui/icons/ShoppingBasketRounded"
import ReactMarkdown from "react-markdown"

import { Section, SEO, Title, Info } from "../components"
import StyledProductPage from "./product.style"

export default ({ data }) => {
  const { strapiProduct: product } = data

  const { t, i18n } = useTranslation(["product", "common"])
  const [name, setName] = useState({ first: "", last: "" })

  useEffect(() => {
    if (product.title) {
      const [first, ...last] = product.title.split(" ")
      setName(() => ({ first, last: last.join(" ") }))
    }
  }, [product.title])

  const infoData = useMemo(() => {
    return [
      {
        title: t("product:product_info"),
        text: i18n.language === "ro" ? product.info_ro : product.info_en,
        panel: "panel1",
      },
      {
        title: t("product:shipping_info"),
        text: i18n.language === "ro" ? product.info_ro : product.info_en,
        panel: "panel2",
      },
    ]
  }, [i18n.language, product.info_en, product.info_ro, t])

  return (
    <StyledProductPage>
      <SEO title={t("title")} />

      <Section height="90" deg="9">
        <Box className="product">
          <Box className="story">
            <Box className="image-container">
              <Box className="image" boxShadow={3}>
                <Img fluid={product.image.childImageSharp.fluid} alt="" />
              </Box>
            </Box>
            <Box my={[1, 2, 3]}>
              <Typography variant="body2" component="span">
                <ReactMarkdown
                  source={
                    i18n.language === "ro" ? product.story_ro : product.story_en
                  }
                />
              </Typography>
            </Box>
          </Box>

          <Box className="info">
            <Box ml={[0, -5]} mt={-4} mb={[2, 3, 4]}>
              <Title variant="h5" title={name.first} subtitle={name.last} />
            </Box>
            <Box mb={1} className="price">
              {product.old_price && (
                <span className="old">{product.old_price} &euro;</span>
              )}
              <span className="new">{product.price} &euro;</span>
            </Box>
            <Box className="stock">
              {t("common:stock")}{" "}
              <span className="stock-number">{product.stock}</span>
            </Box>

            <Box my={4}>
              <Button
                className="add-to-bag"
                disabled={product.stock < 1}
                endIcon={<ShoppingBasketRoundedIcon />}
                variant="contained"
                color="primary"
              >
                {t("common:add_to_bag")}
              </Button>
            </Box>

            <Info infoData={infoData} />
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
          fluid(webpQuality: 100, maxWidth: 1200) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  }
`
