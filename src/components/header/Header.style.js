import styled, { css } from "styled-components"

const fixedStyle = css`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 3.5rem;
  box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.05);
  padding: ${({ theme }) => `0 ${theme.spacing(2)} `};
  ${({ theme }) => theme.breakpoints.up("md")} {
    height: 4.5rem;
  }
  /***** */
`

const StyledHeader = styled.header`
  position: relative;
  overflow-y: hidden;
  z-index: ${({ theme }) => theme.zIndex.drawer};
  padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(2)} `};
  height: 5rem;
  background: ${({ theme }) => theme.palette.background.default};
  transition: all 0.5s;
  ${({ isFixed }) => isFixed && fixedStyle}

  ${({ theme }) => theme.breakpoints.up("md")} {
    margin-bottom: ${({ theme }) => theme.spacing(12)};
    padding: ${({ theme, isFixed }) =>
      isFixed ? `0 ${theme.spacing(2)}` : theme.spacing(2)};
  }

  .container {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 2fr 1fr;
    grid-gap: ${({ theme }) => theme.spacing(2)};
    margin: 0 auto;
    max-width: 1600px;

    ${({ theme }) => theme.breakpoints.up("md")} {
      grid-template-columns: 1fr 400px 1fr;
    }
  }

  .logo-large {
    max-width: 340px;
    cursor: pointer;
  }

  .logo-small {
    max-width: 180px;
  }

  .nav-links-desktop {
    display: grid;
    justify-items: center;
    align-content: center;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: ${({ theme }) => theme.spacing(4)};
  }

  .language-select-mobile {
    position: absolute;
    top: ${({ theme }) => theme.spacing(2)};
    left: ${({ theme }) => theme.spacing(2)};
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
    justify-content: flex-end;

    button {
      ${({ theme }) => theme.breakpoints.up("lg")} {
        margin-right: ${({ theme }) => theme.spacing(4)};
      }
    }
  }
`

export default StyledHeader
