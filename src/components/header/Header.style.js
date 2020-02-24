import styled from "styled-components"

const StyledHeader = styled.header`
  position: relative;
  display: grid;
  max-width: 1600px;
  z-index: ${({ theme }) => theme.zIndex.drawer};
  margin: 0 auto;
  grid-template-columns: 1fr 2fr 1fr;
  padding: ${({ theme }) => theme.spacing(1)};
  ${({ theme }) => theme.breakpoints.up("md")} {
    padding: ${({ theme }) => theme.spacing(2)};
  }

  .nav-links {
    display: grid;
    max-width: 800px;
    gap: ${({ theme }) => theme.spacing(4)};
    justify-self: center;
    grid-template-columns: 1fr 1fr;
  }

  .shop {
    /* justify-self: end; */
    display: flex;
    justify-content: space-around;
  }

  .quick-view {
    transition: all 0.7s;
    z-index: ${({ theme }) => theme.zIndex.mobileStepper};
    transform: ${({ openCart }) =>
      openCart ? " translateX(0)" : " translateX(240px)"};
    position: fixed;
    right: 0;
    top: 65px;
    background: rgba(77, 77, 77, 0.99);
    height: 50vh;
    border-radius: 3px 0 0 3px;
  }
`

export default StyledHeader
