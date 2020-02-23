import { css } from "styled-components"

const afterLineWidthMap = {
  h1: "80px",
  h2: "55px",
  h3: "50px",
  h4: "45px",
  h5: "40px",
  h6: "35px",
  body1: "35px",
  body2: "35px",
  subtitle1: "35px",
  subtitle2: "35px",
  button: "35px",
  caption: "35px",
  overline: "35px",
}

const beforeLinePositionMap = {
  h1: "-6",
  h2: "1",
  h3: "1",
  h4: "2",
  h5: "2",
  h6: "2",
  body1: "4",
  body2: "4",
}

const titleBase = css`
  &:before {
    content: "";
    display: block;
    position: absolute;
    transition: all 200ms ease;
    top: ${({ variant }) => beforeLinePositionMap[variant]}px;
    left: -5px;
    background: ${({ theme }) => theme.palette.text.primary};
    height: ${({ variant, active }) => {
      if (active === 1) {
        return `125%`
      }
      return 0
    }};
    width: 1px;
  }

  &:after {
    content: "";
    display: block;
    transition: all 200ms ease;
    height: 1px;
    background: ${({ theme }) => theme.palette.text.primary};
    max-width: ${({ variant, active }) => {
      if (active === 1) {
        return `calc(${afterLineWidthMap[variant] || "35px"} + 1vw)`
      }
      return 0
    }};
    margin-left: -15px;
  }
`

export default titleBase
