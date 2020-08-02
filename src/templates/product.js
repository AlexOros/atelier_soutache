import React, {
  useMemo,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react"
import { graphql, navigate } from "gatsby"
import { useTranslation } from "react-i18next"
import ReactImageMagnify from "react-image-magnify"
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core"
import { ProductsContext } from "../context"
import ShoppingBasketRoundedIcon from "@material-ui/icons/ShoppingBasketRounded"
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded"
import ReactMarkdown from "react-markdown"

import UniqueSVG from "../assets/svg/unique.svg"
import { Section, SEO, Title, Info } from "../components"
import StyledProductPage from "../assets/styles/productPage.style"
import { getRevealAnimation } from "../utils"

export default ({ data }) => {
  const { strapiProduct: product } = data
  const { t, i18n } = useTranslation(["product", "common"])
  const theme = useTheme()
  const smallScreens = useMediaQuery(theme.breakpoints.down("sm"))
  const [name, setName] = useState({ first: "", last: "" })
  const [seeMore, setSeeMore] = useState(false)
  const [storeProduct, setStore] = useState(null)
  const { currency, products, handleAddProductToCart } = useContext(
    ProductsContext
  )

  useEffect(() => {
    setStore(() => products.find(prod => prod.uid === product.uid))
  }, [product.uid, products])

  useEffect(() => {
    if (product.title) {
      const [first, ...last] = product.title.split(" ")
      setName(() => ({ first, last: last.join(" ") }))
    }
  }, [product.title])

  useEffect(() => {
    smallScreens ? setSeeMore(false) : setSeeMore(true)
  }, [smallScreens])

  const infoData = useMemo(
    () => [
      {
        title: t("product:product_info"),
        text: i18n.language === "ro" ? product.info_ro : product.info_en,
        panel: "panel1",
      },
      {
        title: t("product:shipping_info"),
        text: t("product:shipping_info_text", {
          interpolation: { escapeValue: false },
        }),
        panel: "panel2",
      },
    ],
    [i18n.language, product.info_en, product.info_ro, t]
  )

  const getMessageMouse = useCallback(
    () =>
      i18n.language === "ro"
        ? "Misca mouse-ul peste imagine pentru a o mari"
        : "Hover to zoom",

    [i18n.language]
  )

  const getMessageTouch = useCallback(
    () =>
      i18n.language === "ro"
        ? "Țineti apasat pentru a mari imaginea"
        : "Long-Touch to zoom",
    [i18n.language]
  )

  const memoAltName = useMemo(() => {
    if (product.categories.length) {
      return `${product.categories[0].name} ${product.title}`
    }
    return product.title
  }, [product.categories, product.title])

  const imageMagnifyOptions = useMemo(
    () => ({
      smallImage: {
        alt: memoAltName,
        isFluidWidth: true,
        src: product.image.childImageSharp.fluid.tracedSVG,
        srcSet: product.image.childImageSharp.fluid.srcSetWebp,
      },
      largeImage: {
        src: product.image.childImageSharp.fluid.srcWebp,
        width: 1200,
        height: 800,
      },
      isHintEnabled: true,
      hintTextMouse: getMessageMouse(),
      hintTextTouch: getMessageTouch(),
      shouldHideHintAfterFirstActivation: false,
    }),
    [
      memoAltName,
      product.image.childImageSharp.fluid.tracedSVG,
      product.image.childImageSharp.fluid.srcSetWebp,
      product.image.childImageSharp.fluid.srcWebp,
      getMessageMouse,
      getMessageTouch,
    ]
  )

  return (
    <StyledProductPage more={seeMore ? 1 : 0}>
      <SEO title={product.title} />

      <Section paddingTop={5} height="90" deg="9">
        <Box className="product">
          <Box {...getRevealAnimation("slide-right")} className="story">
            <Box mb={4}>
              {smallScreens && (
                <Title variant="h4" title={name.first} subtitle={name.last} />
              )}
            </Box>

            <Box className="image-container">
              <Box className="image">
                <ReactImageMagnify
                  style={{ zIndex: 10, borderRadius: "10px" }}
                  {...imageMagnifyOptions}
                />
              </Box>
            </Box>

            <Box className="story-text">
              <Typography variant="body2" component="span">
                <ReactMarkdown
                  source={
                    i18n.language === "ro" ? product.story_ro : product.story_en
                  }
                />
              </Typography>
            </Box>
          </Box>

          <Box {...getRevealAnimation("slide-left")} mt={2}>
            {!smallScreens && (
              <Box ml={[0, -5]} mt={[-1, -4]} mb={[2, 3, 4]}>
                <Title variant="h4" title={name.first} subtitle={name.last} />
              </Box>
            )}
            <Box className="old-price">
              {!!storeProduct?.old_price && (
                <>
                  {storeProduct?.old_price.toLocaleString()}
                  <span className="currency">{currency}</span>
                </>
              )}
            </Box>
            <div className="unique">
              <UniqueSVG />
              <Typography variant="body2">
                <strong>{t("common:unique")}</strong>
              </Typography>
            </div>
            <Box className="details">
              <div className="new">
                {storeProduct?.price && (
                  <>
                    {storeProduct.price.toLocaleString()}
                    <span className="currency">{currency}</span>
                  </>
                )}
              </div>
              <div>
                {storeProduct && (
                  <>
                    <span className="stock"> {t("common:stock")}</span>
                    <span className="stock-number">{storeProduct.stock}</span>
                  </>
                )}
              </div>
            </Box>

            <Box my={4} className="button-group">
              <Button
                disableElevation
                onClick={() => navigate("/shop")}
                startIcon={<ArrowBackIosRoundedIcon />}
                variant="contained"
                color="primary"
              >
                {t("common:shop")}
              </Button>

              <Button
                disableElevation
                onClick={() =>
                  storeProduct && handleAddProductToCart(storeProduct)
                }
                disabled={!storeProduct || storeProduct?.stock < 1}
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
      uid
      info_en
      info_ro
      old_price
      price
      stock
      story_ro
      story_en
      title
      categories {
        name
      }
      image {
        childImageSharp {
          fluid(webpQuality: 90, maxWidth: 1200) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  }
`
