import React from "react"
import styled from "styled-components"

const StyledSection = styled.section`
  min-height: 100vh;
  position: relative;

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
    background: ${({ theme }) => theme.palette.pink.light};
    margin: ${({ width }) => (width < 100 ? "0 auto" : "")};
    overflow-x: hidden;
  }
`

const Section = ({ children, deg = 9, height = 90, width, ...restOfProps }) => {
  return (
    <StyledSection deg={deg} height={height} width={width} {...restOfProps}>
      {children}
    </StyledSection>
  )
}

export default Section
