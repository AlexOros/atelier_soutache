import styled, { keyframes } from "styled-components"
import { ButtonBase } from "@material-ui/core"

const shockwave = keyframes`
0% {
  transform: scale(1);
  box-shadow:  0 0 2px #444;
  opacity: 1;
}
100% {
  transform: scale(1);
  opacity: 0;
  box-shadow: 0 0 50px #666, inset 0 0 10px #444;
}`

const StyledPulsatingButton = styled(ButtonBase)`
  border-radius: 4px;
  color: ${({ theme }) => theme.palette.primary.main};
  background: ${({ theme }) => theme.palette.background.default};
  width: 260px;
  height: 43px;
  font-size: 15px;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    border-radius: 4px;
    width: 259px;
    height: 42px;
    animation: ${shockwave} 2s ease-in infinite;
  }
`

export default StyledPulsatingButton
