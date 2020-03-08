import styled, { css } from "styled-components"

const left = css`
  left: 0;
  /* - */
`
const right = css`
  right: 0;
  /* - */
`

const StyledDrawer = styled.div`
  color: ${({ theme }) => theme.palette.pink.light};
  transition: all 0.7s;
  z-index: ${({ theme }) => theme.zIndex.drawer};
  background: rgba(77, 77, 77, 0.99);
  height: 101vh;
  box-shadow: ${({ theme }) => theme.shadows[3]};
  position: fixed;
  top: 0;
  min-width: 100vw;
  overflow: hidden;

  transform: ${({ isDrawerOpen, side }) =>
    isDrawerOpen
      ? " translateX(0)"
      : `translateX( ${side === "right" ? "120vw" : "-120vw"})`};

  ${({ theme }) => theme.breakpoints.up("md")} {
    min-width: 400px;
    transform: ${({ isDrawerOpen, side }) =>
      isDrawerOpen
        ? "translateX(0)"
        : `translateX(${side === "right" ? "450px" : "-450px"})`};
  }

  ${({ side }) => (side === "right" ? right : left)}

  .close {
    justify-self: end;
    color: ${({ theme }) => theme.palette.pink.light};
    margin: 0.2rem 0.2rem 0 0.2rem;
  }
`

export default StyledDrawer
