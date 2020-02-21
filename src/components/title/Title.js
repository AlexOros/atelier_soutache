import React from "react"
import { Box } from "@material-ui/core"
import StyledTitle from "./Title.style"

const Title = ({ title, subtitle, align, ...restOfProps }) => {
  return (
    <StyledTitle align={align} active="1" {...restOfProps}>
      <span className="title">{title}</span> <span>{subtitle}</span>
    </StyledTitle>
  )
}

export default Title
