import React from "react"
import styled from "styled-components"
import Box from "@material-ui/core/Box"

const StyledSection = styled.section`
  min-height: 100vh;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 5%;
    height: 90%;
    bottom: 0;
    left: 0;
    right: 0;
    display: block;
    margin: 0 calc(-50vw + 52%);
    z-index: -1;
    transform: ${({ deg }) => `rotate(${deg}deg)`};
    background: ${({ theme }) => theme.palette.pink.light};

    ${({ theme }) => theme.breakpoints.up("sm")} {
      top: 12%;
      height: 75%;
    }
    ${({ theme }) => theme.breakpoints.up("md")} {
      top: 15%;
      height: 70%;
    }
  }
`

const Section = ({ children, deg = 9 }) => {
  return (
    <StyledSection deg={deg}>
      <Box>{children}</Box>
    </StyledSection>
  )
}

export default Section
