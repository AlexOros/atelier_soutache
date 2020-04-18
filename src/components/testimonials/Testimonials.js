import React from "react"
import { useTranslation } from "react-i18next"
import { Box, Typography } from "@material-ui/core"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { Slider } from "../../components"
import StyledTestimonials from "./Testimonials.style"

const query = graphql`
  query MyQuery {
    allStrapiTestimonial {
      nodes {
        name
        text_en
        text_ro
        id
        avatar {
          childImageSharp {
            fluid(maxWidth: 400, quality: 80) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`

const Testimonials = () => {
  const {
    allStrapiTestimonial: { nodes },
  } = useStaticQuery(query)
  const { i18n } = useTranslation("common")

  return (
    <StyledTestimonials>
      <Slider>
        {nodes.length &&
          nodes.map(({ avatar, name, text_en, text_ro }, index) => (
            <Box key={index}>
              <Box className="testimonial">
                <Box className="avatar">
                  <Img
                    className="image"
                    fluid={avatar.childImageSharp.fluid}
                    alt={`Avatar ${name}`}
                  />
                  <Typography variant="h6"> {name}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2">
                    {i18n.language === "ro" ? text_ro : text_en}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
      </Slider>
    </StyledTestimonials>
  )
}

export default Testimonials
