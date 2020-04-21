import React from "react"
import { useTranslation } from "react-i18next"
import { graphql, navigate } from "gatsby"
import Img from "gatsby-image"
import { Box, Typography, IconButton, Button } from "@material-ui/core"
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded"
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded"

import { randomNumFromZeroTo, getRevealAnimation } from "../utils"
import { Title, Section, SEO, Products, Testimonials } from "../components"
import StyledHomePage from "./styles/home.style"
import useIsVisible from "../hooks/useIsVisible"

const IndexPage = ({ data }) => {
  const {
    homeSection1: { nodes: heroImages },
    homeSection2: { nodes: moreImage },
  } = data
  const { t } = useTranslation(["home", "common"])

  const [areProductsVisible, setProductsRef] = useIsVisible({ threshold: 1 })

  return (
    <StyledHomePage>
      {/* TODO add description in en and ro for each page */}
      <SEO title={t("home:title")} />

      {/* ------------------ Section 1 ------------------- */}

      <Section className="section-1" paddingTop={0}>
        <Box {...getRevealAnimation("slide-right")} className="image">
          <Img
            fluid={heroImages[randomNumFromZeroTo(4)].childImageSharp.fluid}
          />
        </Box>

        <Box my={[6, 4, 0]} className="content">
          <Box {...getRevealAnimation("slide-left")}>
            <Typography variant="h1">
              <strong>{t("home:section-1.title.1")}</strong>{" "}
              <span>{t("home:section-1.title.2")}</span>
            </Typography>

            <Box className="creation" mt={[5, 3]} textAlign="center">
              <Box mb={[1, 0]}>
                <Title
                  variant="body2"
                  title={t("home:section-1.subtitle.1")}
                  subtitle={t("home:section-1.subtitle.2")}
                />
              </Box>

              <IconButton style={{ color: "orangered" }}>
                <PlayArrowRoundedIcon fontSize="large" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Section>

      {/* ------------------ Section 2 ------------------- */}

      <Section className="section-2" deg={-9}>
        <Box className="title" mt={[-2, -5]} mb={[4, 6]}>
          <Title
            {...getRevealAnimation("slide-right")}
            variant="h4"
            title={t("home:section-2.title.1")}
            subtitle={t("home:section-2.title.2")}
          />
        </Box>

        <Box className="content">
          <Box
            p={[1, 2, 4]}
            pt={[4, 2, 4]}
            className="text"
            {...getRevealAnimation("slide-right")}
          >
            <Typography variant="body1">
              {t("home:section-2.text.1")}
            </Typography>
            <Typography variant="body1">
              {t("home:section-2.text.2")}
            </Typography>

            <Button
              onClick={() => navigate("/about")}
              disableElevation
              variant="contained"
              color="primary"
            >
              {t("common:find_out_more")}
            </Button>
          </Box>
          <Box
            {...getRevealAnimation("slide-left")}
            className="image"
            style={{ textTransform: "capitalize" }}
          >
            <Img fluid={moreImage[0].childImageSharp.fluid} />
          </Box>
        </Box>
      </Section>

      {/* ------------------ Section 3 ------------------- */}

      <Box my={[5, 15]} {...getRevealAnimation("slide-right")}>
        <Testimonials />
      </Box>

      {/* ------------------ Section 4 ------------------- */}

      <Section paddingTop={0} deg={9}>
        <Box mt={[2, 5]} mb={[4, 6]} mx={3}>
          <Title
            {...getRevealAnimation("slide-left")}
            align="right"
            variant="h4"
            title="Soutache..."
          />
        </Box>
        <Box ref={setProductsRef}>{areProductsVisible && <Products />}</Box>
        <Box my={5} textAlign="center">
          <Button
            {...getRevealAnimation("slide-left")}
            onClick={() => navigate("/shop")}
            size="large"
            endIcon={<ArrowForwardIosRoundedIcon />}
            disableElevation
            variant="contained"
            color="primary"
          >
            {t("common:shop")}
          </Button>
        </Box>
      </Section>
    </StyledHomePage>
  )
}
export const query = graphql`
  {
    homeSection1: allFile(filter: { name: { regex: "/home-model/" } }) {
      nodes {
        publicURL
        childImageSharp {
          fluid(maxWidth: 1600, webpQuality: 95) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }

    homeSection2: allFile(filter: { name: { regex: "/home-about/" } }) {
      nodes {
        publicURL
        childImageSharp {
          fluid(maxWidth: 1600, webpQuality: 95) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  }
`

export default IndexPage
