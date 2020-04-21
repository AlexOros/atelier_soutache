import { keyframes } from "styled-components"

const slideUp = keyframes`
  0% {
    transform: translateY(40px) scale(0.8);
    filter: alpha(opacity=0);
    opacity: 0
  }

  100% {
    transform: translateY(0px) scale(1);
    filter: alpha(opacity=100);
    opacity: 1;
  }
`

const rotate = keyframes`
    0% { transform: rotate(1deg)}
    100% { transform: rotate(360deg)}
`
const tiltRight = keyframes`
    0% { transform: rotate(0)}
    100% { transform: rotate(9deg)}
`

const tiltLeft = keyframes`
    0% { transform: rotate(0)}
    100% { transform: rotate(-9deg)}
`

export default {
  slideUp,
  rotate,
  tiltRight,
  tiltLeft,
}
