const getRevealAnimation = (
  animation = "fade",
  delay = 300,
  duration = 400
) => {
  return {
    "data-sal": animation,
    "data-sal-delay": delay,
    "data-sal-easing": "ease-out-back",
    "data-sal-duration": duration,
  }
}

export default getRevealAnimation
