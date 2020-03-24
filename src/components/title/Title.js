import React from "react"

import { StyledBrandTitle, StyledText, StyledTitle } from "./Title.style"
import { Box } from "@material-ui/core"

const Title = ({
  title,
  subtitle,
  align,
  variant = "body1",
  ...restOfProps
}) => {
  return (
    <Box textAlign={align} mx={[2, 4, 6]}>
      <StyledBrandTitle variant={variant} active={1} {...restOfProps}>
        <StyledText>
          <StyledTitle>{title}</StyledTitle> <span>{subtitle}</span>
        </StyledText>
      </StyledBrandTitle>
    </Box>
  )
}

export default Title
