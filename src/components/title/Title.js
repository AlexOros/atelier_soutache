import React from "react"

import StyledTitle from "./Title.style"
import { Box } from "@material-ui/core"

const Title = ({ title, subtitle, align, ...restOfProps }) => {
  return (
    <Box textAlign={align} mx={[2, 4, 6]}>
      <StyledTitle active={1} {...restOfProps}>
        <div>
          <span className="title word">{title}</span>{" "}
          <span className="word">{subtitle}</span>
        </div>
      </StyledTitle>
    </Box>
  )
}

export default Title
