import styled from "styled-components"

export const StyledHero = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  max-width: 1200px;
  margin: 0 auto;
  grid-gap: 2rem;
  justify-content: center;

  ${({ theme }) => theme.breakpoints.up("md")} {
    grid-template-columns: 1fr 2fr;
  }

  .image {
    position: relative;
    width: 400px;
    justify-self: center;
    margin-top: ${({ theme }) => theme.spacing(8)};
    max-height: 583px;

    img {
      max-height: 583px;
    }

    &:before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: block;
      background: ${({ theme }) => theme.palette.background.default};
      overflow: hidden;
      animation: ${({ theme }) => theme.keyframes.tiltLeft} 2s 600ms forwards
        ease-in-out;
    }

    ${({ theme }) => theme.breakpoints.down("420")} {
      margin: 0 calc(-50vw + 50%);
      margin-top: ${({ theme }) => theme.spacing(8)};
      width: inherit;
      justify-self: inherit;
    }

    ${({ theme }) => theme.breakpoints.up("md")} {
      margin: 0;
      max-width: 400px;
      width: inherit;
      justify-self: inherit;
    }
  }

  .text:first-letter {
    font-size: 1.4rem;
    font-weight: bold;
  }

  .text {
    margin: 0 calc(-30vw + 30%);
    max-width: 600px;
    justify-self: center;
    background: ${({ theme }) => theme.palette.background.default};
    ${({ theme }) => theme.breakpoints.up("md")} {
      max-width: 700px;
    }
  }
`

export const StyledStorySection = styled.div`
  max-width: 540px;
  margin: 0 auto;
  .image {
    padding: 4px;
  }
`
