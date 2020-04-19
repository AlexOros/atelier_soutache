import styled, { css, keyframes } from "styled-components"
import Container from "@material-ui/core/Container"

const fadeIn = keyframes`
   to {
     opacity: 1;
     transform: none;
   }
 }
`

const fadeBase = css`
  animation: ${fadeIn} 200ms ease-in-out forwards;
  opacity: 0;
  animation-delay: 100ms;
`

export default styled(Container)`
  min-height: calc(100vh - 87px);
  max-width: 1600px;
  overflow-x: hidden;

  .fadeIn {
    ${fadeBase}
  }

  ${({ theme }) => theme.breakpoints.up("sm")} {
    overflow-x: inherit;
    padding: 0;
  }
`
