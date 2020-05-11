import styled, { css, keyframes } from "styled-components"

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

export default styled.div`
  .main {
    min-height: calc(100vh - 87px);
    max-width: 1600px;
    overflow-x: hidden;
    padding: ${({ theme }) => theme.typography.pxToRem(10)};

    ${({ theme }) => theme.breakpoints.up("sm")} {
      overflow-x: inherit;
      padding: 0;
    }
  }

  .fadeIn {
    ${fadeBase}
  }
`
