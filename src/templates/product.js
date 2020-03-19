import React, { useMemo, useState, useEffect, useContext } from "react"
import { graphql, navigate } from "gatsby"
import Img from "gatsby-image"
import { useTranslation } from "react-i18next"
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  Collapse,
  IconButton,
} from "@material-ui/core"
import { ProductsContext } from "../context"
import ShoppingBasketRoundedIcon from "@material-ui/icons/ShoppingBasketRounded"
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded"
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded"
import ReactMarkdown from "react-markdown"

import { Section, SEO, Title, Info } from "../components"
import StyledProductPage from "./styles/product.style"

export default ({ data }) => {
  const { strapiProduct: product } = data
  const { t, i18n } = useTranslation(["product", "common"])
  const theme = useTheme()
  const smallScreens = useMediaQuery(theme.breakpoints.down("sm"))
  const [name, setName] = useState({ first: "", last: "" })
  const [seeMore, setSeeMore] = useState(false)
  const [storeProduct, setStore] = useState(null)
  const { products, handleAddProductToCart } = useContext(ProductsContext)

  useEffect(() => {
    if (products.length === 0) navigate("/")
    setStore(() => products.find(prod => prod.id === product.id))
  }, [product.id, products])

  useEffect(() => {
    if (product.title) {
      const [first, ...last] = product.title.split(" ")
      setName(() => ({ first, last: last.join(" ") }))
    }
  }, [product.title])

  useEffect(() => {
    smallScreens ? setSeeMore(false) : setSeeMore(true)
  }, [smallScreens])

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
    <StyledProductPage more={seeMore ? 1 : 0}>
      <SEO title={t("title")} />

      <Section height="90" deg="9">
        <Box className="product">
          {smallScreens && (
            <Title variant="h5" title={name.first} subtitle={name.last} />
          )}
          <Box className="story">
            <Box className="image-container">
              <Box className="image" boxShadow={3}>
                <Img fluid={product.image.childImageSharp.fluid} alt="" />
              </Box>
            </Box>
            <Box my={[1, 2, 3]} className="story-text">
              <Collapse in={seeMore} collapsedHeight={140}>
                <Typography variant="body2" component="span">
                  <ReactMarkdown
                    source={
                      i18n.language === "ro"
                        ? product.story_ro
                        : product.story_en
                    }
                  />
                </Typography>
              </Collapse>
              {smallScreens && (
                <Box textAlign="center" className="more">
                  <IconButton onClick={() => setSeeMore(old => !old)}>
                    <ExpandMoreRoundedIcon
                      className="icon"
                      color="primary"
                      fontSize="large"
                    />
                  </IconButton>
                </Box>
              )}
            </Box>
            <Box my={4}>
              <Button
                onClick={() => navigate("/shop")}
                className="add-to-bag"
                disabled={storeProduct && storeProduct.stock < 1}
                startIcon={<ArrowBackIosRoundedIcon />}
                variant="contained"
                color="primary"
              >
                {t("common:shop")}
              </Button>
            </Box>
          </Box>

          <Box className="info">
            <Box ml={[0, -5]} mt={[-1, -4]} mb={[2, 3, 4]}>
              {!smallScreens && (
                <Title variant="h5" title={name.first} subtitle={name.last} />
              )}
            </Box>
            <Box mb={1} className="price">
              {product.old_price && (
                <span className="old">{product.old_price} &euro;</span>
              )}
              <span className="new">{product.price} &euro;</span>
            </Box>
            <Box className="stock">
              {t("common:stock")}{" "}
              {storeProduct && (
                <span className="stock-number">{storeProduct.stock}</span>
              )}
            </Box>

            <Box my={4}>
              <Button
                onClick={() => handleAddProductToCart(storeProduct)}
                className="add-to-bag"
                disabled={storeProduct && storeProduct.stock < 1}
                startIcon={<ShoppingBasketRoundedIcon />}
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
