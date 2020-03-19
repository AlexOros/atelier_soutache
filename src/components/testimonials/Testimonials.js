import React, { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Box, IconButton, Typography } from "@material-ui/core"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import Slider from "react-slick"
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded"
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

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
            fluid(maxWidth: 600, quality: 80) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`

const SampleNextArrow = ({ className, onClick }) => (
  <Box style={{ top: "43%" }} className={className} onClick={onClick}>
    <IconButton className="arrows" onClick={onClick}>
      <ArrowForwardIosRoundedIcon />
    </IconButton>
  </Box>
)

const SamplePrevArrow = ({ className, onClick }) => (
  <Box
    style={{ left: "-50px", top: "43%" }}
    className={className}
    onClick={onClick}
  >
    <IconButton className="arrows" onClick={onClick}>
      <ArrowBackIosRoundedIcon />
    </IconButton>
  </Box>
)

const Testimonials = () => {
  const {
    allStrapiTestimonial: { nodes },
  } = useStaticQuery(query)
  const { i18n } = useTranslation("common")
  // TODO add autoplay ? soem seconds, make mobile reponsive. Seee wtf is going on with the section overflow
  const memoizedSettings = useMemo(
    () => ({
      className: "center",
      dots: true,
      autoPlay: true,
      infinite: true,
      swipeToSlide: true,
      speed: 800,
      autoplaySpeed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    }),
    []
  )

  return (
    <StyledTestimonials>
      <Slider {...memoizedSettings}>
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
                  <Typography
                    className="text"
                    style={{
                      overflowY:
                        text_ro.length > 500 || text_en.length > 500
                          ? "scroll"
                          : "inherit",
                    }}
                    variant="body2"
                  >
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
