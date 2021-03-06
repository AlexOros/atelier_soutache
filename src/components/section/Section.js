import React from "react"
import styled from "styled-components"
import { Box } from "@material-ui/core"

const StyledSection = styled(Box)`
  min-height: 100vh;
  height: inherit;
  position: relative;
  padding: ${({ theme, paddingTop }) => `${theme.spacing(paddingTop)} 0 `};

  &:before {
    content: "";
    position: absolute;
    top: 5%;
    height: ${({ height }) => `${height}%`};
    width: ${({ width }) => `${width}%`};
    bottom: 0;
    left: 0;
    right: 0;
    display: block;
    margin: 0 calc(-50vw + 53.6%);
    z-index: -1;
    transform: ${({ deg }) => `rotate(${deg}deg)`};
    background: ${({ theme, show }) => show && theme.palette.pink.light};
    margin: ${({ width }) => (width < 100 ? "0 auto" : "")};
    overflow-x: hidden;
  }
`

const Section = ({
  children,
  deg = 9,
  height = 90,
  width,
  tag = "article",
  showShape = true,
  paddingTop = 15,
  ...restOfProps
}) => {
  return (
    <StyledSection
      {...restOfProps}
      component={tag}
      show={showShape ? 1 : 0}
      paddingTop={paddingTop}
      deg={deg}
      height={height}
      width={width}
    >
      {children}
    </StyledSection>
  )
}

export default Section
