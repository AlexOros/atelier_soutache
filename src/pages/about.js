import React, { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Box, Typography } from "@material-ui/core"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import { getRevealAnimation } from "../utils"

import { SEO, Section, Title, Slider } from "../components"

const StyledHero = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  max-width: 1200px;
  margin: 0 auto;
  grid-gap: 2rem;
  justify-content: center;

  ${({ theme }) => theme.breakpoints.up("md")} {
    grid-template-columns: 1fr 2fr;
  }

  .image {
    position: relative;
    width: 400px;
    justify-self: center;
    margin-top: ${({ theme }) => theme.spacing(8)};
    max-height: 583px;

    img {
      max-height: 583px;
    }

    &:before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: block;
      background: ${({ theme }) => theme.palette.background.default};
      overflow: hidden;
      animation: ${({ theme }) => theme.keyframes.tiltLeft} 2s 600ms forwards
        ease-in-out;
    }

    ${({ theme }) => theme.breakpoints.down("420")} {
      margin: 0 calc(-50vw + 50%);
      margin-top: ${({ theme }) => theme.spacing(8)};
      width: inherit;
      justify-self: inherit;
    }

    ${({ theme }) => theme.breakpoints.up("md")} {
      margin: 0;
      max-width: 400px;
      width: inherit;
      justify-self: inherit;
    }
  }

  .text:first-letter {
    font-size: 1.4rem;
    font-weight: bold;
  }

  .text {
    margin: 0 calc(-30vw + 30%);
    max-width: 600px;
    justify-self: center;
    background: ${({ theme }) => theme.palette.background.default};
    ${({ theme }) => theme.breakpoints.up("md")} {
      max-width: 700px;
    }
  }
`

const getStartingNumber = str => str.replace(/\D+/, "")

const StyledStorySection = styled.div`
  max-width: 540px;
  margin: 0 auto;
  .image {
    padding: 4px;
  }
`

const SLIDER_OPTIONS = {
  centerPadding: "20px",
  className: "center",
  centerMode: true,
}

export default ({ data }) => {
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
  const sixEmptyElementArray = useMemo(() => new Array(6).fill(""), [])

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
            {sixEmptyElementArray.map((skip, index) => (
              <Box key={index} my={[2, 3]}>
                <Typography variant="body1">
                  {t(`section-1.text.${index}`)}
                </Typography>
              </Box>
            ))}
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
            {sortedSliderImages.map(({ id, childImageSharp }) => (
              <Box className="image" maxWidth={600} key={id}>
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
