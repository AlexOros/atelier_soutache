import React from "react"

import StyledTitle from "./Title.style"

const Title = ({ title, subtitle, ...restOfProps }) => {
  return (
    <StyledTitle active="1" {...restOfProps}>
      <span className="title">{title}</span> <span>{subtitle}</span>
    </StyledTitle>
  )
}

export default Title
