import styled, { css } from "styled-components"
import { Box } from "@material-ui/core"

const fixedStyle = css`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 4.5rem;
  box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.05);

  /***** */
`

const StyledHeader = styled.header`
  position: relative;
  overflow-y: hidden;
  z-index: ${({ theme }) => theme.zIndex.drawer};
  padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(3)} `};
  height: 5rem;
  background: ${({ theme }) => theme.palette.background.default};
  transition: all 0.5s;
  ${({ isFixed }) => isFixed && fixedStyle}

  ${({ theme }) => theme.breakpoints.up("md")} {
    padding: ${({ theme, isFixed }) =>
      isFixed ? `0 ${theme.spacing(2)}` : theme.spacing(2)};
  }

  .header {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 2fr 1fr;
    margin: 0 auto;
    max-width: 1600px;
  }

  .nav-links-desktop {
    display: grid;
    max-width: 800px;
    gap: ${({ theme }) => theme.spacing(4)};
    justify-self: center;
    grid-template-columns: 1fr 1fr;
  }

  .nav-links-mobile {
    display: grid;
    margin-top: ${({ theme }) => theme.spacing(2)};
    gap: ${({ theme }) => theme.spacing(1)};
    justify-content: center;
    a {
      color: ${({ theme }) => theme.palette.pink.light} !important;
      &::before,
      &::after {
        background: ${({ theme }) => theme.palette.pink.light} !important;
      }
    }
  }

  .shop {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`

export default StyledHeader
