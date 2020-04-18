import React, { useMemo } from "react"
import { Box, IconButton } from "@material-ui/core"
import SlickSlider from "react-slick"
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded"
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { SliderBaseStyle } from "./Slider.style"

const SampleNextArrow = ({ className, onClick }) => (
  <Box style={{ top: "43%" }} className={className} onClick={onClick}>
    <IconButton className="slick-arrow" onClick={onClick}>
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
    <IconButton className="slick-arrow" onClick={onClick}>
      <ArrowBackIosRoundedIcon />
    </IconButton>
  </Box>
)

const Slider = ({ children, options }) => {
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
      ...options,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    }),
    [options]
  )

  return (
    <SliderBaseStyle>
      <SlickSlider {...memoizedSettings}>{children}</SlickSlider>
    </SliderBaseStyle>
  )
}

export default Slider
