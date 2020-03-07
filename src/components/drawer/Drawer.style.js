import styled, { css } from "styled-components"

const left = css`
  border-radius: 0 3px 3px 0;
  left: 0;
`

const right = css`
  border-radius: 3px 0 0 3px;
  right: 0;
`

const StyledDrawer = styled.div`
  color: ${({ theme }) => theme.palette.pink.light};
  transition: all 0.7s;
  z-index: ${({ theme }) => theme.zIndex.mobileStepper};
  background: rgba(77, 77, 77, 0.99);
  height: 100vh;
  box-shadow: ${({ theme }) => theme.shadows[3]};
  position: fixed;
  top: 0;
  min-width: 85vw;

  transform: ${({ isDrawerOpen, side }) =>
    isDrawerOpen
      ? " translateX(0)"
      : `translateX( ${side === "right" ? "85vw" : "-85vw"})`};

  ${({ theme }) => theme.breakpoints.up("md")} {
    min-width: 400px;
    transform: ${({ isDrawerOpen, side }) =>
      isDrawerOpen
        ? "translateX(0)"
        : `translateX(${side === "right" ? "400px" : "-400px"})`};
  }

  ${({ side }) => {
    console.log("𝕃𝕆𝔾 ⟹: side", side)
    return side === "right" ? right : left
  }}

  .close {
    justify-self: end;
    color: ${({ theme }) => theme.palette.pink.light};
    margin: 0.2rem 0.2rem 0 0.2rem;
  }
`

export default StyledDrawer
