import { keyframes } from "styled-components"

export const slideUp = keyframes`
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
