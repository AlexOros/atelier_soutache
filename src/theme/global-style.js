import { createGlobalStyle, css } from "styled-components"
import theme from "./index"

const primaryObjColor = theme.palette.primary

const link = css`
  a:not([class]) {
    text-shadow: rgb(255, 255, 255) 1px 0px 0px,
      rgb(255, 255, 255) 0.540302px 0.841471px 0px,
      rgb(255, 255, 255) -0.416147px 0.909297px 0px,
      rgb(255, 255, 255) -0.989992px 0.14112px 0px,
      rgb(255, 255, 255) -0.653644px -0.756802px 0px,
      rgb(255, 255, 255) 0.283662px -0.958924px 0px,
      rgb(255, 255, 255) 0.96017px -0.279415px 0px;
    text-decoration: none;
    background-image: linear-gradient(
      ${primaryObjColor.dark} 50%,
      ${primaryObjColor.dark} 50%
    );
    background-size: 10000px 1px;
    color: ${primaryObjColor.dark};
    font-size: 16px;
    background-repeat: no-repeat;
    background-position: 0 1em;
    background-position: -10000px 1.1em;
    cursor: pointer;
  }

  a:hover:not([class]),
  a:focus:not([class]) {
    background-position: 0 1.1em;
    transition: all 3s ease-in-out;
  }

  a:active:not([class]) {
    background-image: linear-gradient(
      ${primaryObjColor.light} 50%,
      ${primaryObjColor.light} 50%
    );
  }
`

const GlobalStyle = createGlobalStyle`
  body {
    ${link};
    overflow-x: hidden;
    
  }
`

export default GlobalStyle
