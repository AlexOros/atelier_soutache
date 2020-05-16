import React, { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Box, Typography } from "@material-ui/core"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import { getRevealAnimation } from "../utils"
import { SEO, Section, Title, Slider } from "../components"
import {
  StyledHero,
  StyledStorySection,
} from "../assets/styles/aboutPage.style.js"

const getStartingNumber = str => str.replace(/\D+/, "")

const SLIDER_OPTIONS = {
  centerPadding: "20px",
  className: "center",
  centerMode: true,
}

const AboutPage = ({ data }) => {
  const {
    hero: { nodes: heroImg },
    slider: { nodes: sliderImages },
  } = data
  const { t } = useTranslation("about")

  const sortedSliderImages = useMemo(
    () =>
      sliderImages.sort(
        (a, b) =>
          Number(getStartingNumber(a.name)) - Number(getStartingNumber(b.name))
      ),
    [sliderImages]
  )

  return (
    <>
      <SEO title={t("title")} />

      {/* ------------------ Section 1 ------------------- */}
      <Section paddingTop={0} deg={-9}>
        <Box mb={[0, 6, 8]} mt={[4, 8, 10]}>
          <Title
            {...getRevealAnimation("slide-down")}
            align="center"
            title={t("section-1.title.1")}
            subtitle={t("section-1.title.2")}
            variant="h4"
          />
        </Box>
        <StyledHero>
          <Box className="image" {...getRevealAnimation("slide-right")}>
            <Img fluid={heroImg[0].childImageSharp.fluid} />
          </Box>
          <Box
            p={[1, 2, 4]}
            pt={[4, 2, 4]}
            className="text"
            {...getRevealAnimation("slide-left")}
          >
            {Object.values(t("section-1.text")).map((text, index) => (
              <Box key={index} my={[2, 3]}>
                <Typography variant="body1">{text}</Typography>
              </Box>
            ))}
            <Typography style={{ textAlign: "center" }} variant="body1">
              <strong>A</strong>uthentic is the new black!
            </Typography>
          </Box>
        </StyledHero>
      </Section>

      {/* ------------------ Section 2 ------------------- */}
      <Section paddingTop={0} deg={9}>
        <Box mb={[4, 6, 8]} mt={[4, 8, 10]}>
          <Title
            {...getRevealAnimation("slide-right")}
            align="left"
            title={t("section-2.title.1")}
            subtitle={t("section-2.title.2")}
            variant="h4"
          />
        </Box>
        <StyledStorySection {...getRevealAnimation("slide-left")}>
          <Slider options={SLIDER_OPTIONS}>
            {sortedSliderImages.map(({ childImageSharp }, index) => (
              <Box className="image" maxWidth={600} key={index}>
                <Img fluid={childImageSharp.fluid} />
              </Box>
            ))}
          </Slider>
        </StyledStorySection>
      </Section>
    </>
  )
}

export const query = graphql`
  {
    hero: allFile(filter: { name: { regex: "/hero/" } }) {
      nodes {
        childImageSharp {
          fluid(maxWidth: 800, webpQuality: 95) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }

    slider: allFile(filter: { name: { regex: "/story/" } }) {
      nodes {
        name
        childImageSharp {
          fluid(maxWidth: 1600, webpQuality: 80) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  }
`

export default AboutPage
