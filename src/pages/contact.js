import React from "react"
import { Box, Typography } from "@material-ui/core"
import styled from "styled-components"
import { useTranslation } from "react-i18next"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import { getRevealAnimation } from "../utils"
import { SEO, Title, Section } from "../components"

const StyledContact = styled(Section)`
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

  h6 {
    justify-content: center;
    line-height: 3rem;
  }
`

const StyledContactData = styled(Box)`
  background: ${({ theme }) => theme.palette.background.default};
  justify-self: top;
  max-height: 40vh;
`

const AboutPage = ({ data }) => {
  const {
    allFile: { nodes: heroImg },
  } = data
  const { t } = useTranslation("about")

  return (
    <>
      <SEO title="contact" />

      {/* ------------------ Section 1 ------------------- */}
      <Box>
        <Box mb={[0, 8, 12]} mt={[4, 8, 10]}>
          <Title
            // {...getRevealAnimation("slide-down")}
            align="center"
            title="Contact"
            variant="h4"
          />
        </Box>
        <StyledContact paddingTop="0" deg={9}>
          <Box className="image" {...getRevealAnimation("slide-right")}>
            <Img fluid={heroImg[0].childImageSharp.fluid} />
          </Box>

          <StyledContactData
            mt={[0, 10]}
            p={[1, 2, 5]}
            {...getRevealAnimation("slide-left")}
          >
            <Typography variant="h5">GA Studio II</Typography>
            <Box>
              <Typography
                variant="h6"
                dangerouslySetInnerHTML={{ __html: t("common:address") }}
              />
            </Box>
            <Box>
              <Typography variant="h6">
                {t("common:phone")}: +40 727 818 482
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6">
                E-mail: ateliersoutache@gmail.com
              </Typography>
            </Box>
          </StyledContactData>
        </StyledContact>
      </Box>
    </>
  )
}

export default AboutPage

export const query = graphql`
  {
    allFile(filter: { name: { regex: "/contact-hero/" } }) {
      nodes {
        childImageSharp {
          fluid(maxWidth: 1800, webpQuality: 95) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  }
`
