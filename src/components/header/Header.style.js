import styled, { css } from "styled-components"
import { Box } from "@material-ui/core"
const StyledHeader = styled.header`
  position: relative;
  display: grid;
  align-items: center;
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
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`

const FOUR_ITEMS_HEIGHT = 583

const itemBase = css`
  padding: ${({ theme }) => theme.spacing(1)};
  border-radius: 3px;
  box-shadow: 1px 2px 12px rgba(251, 224, 223, 0.4);
  transition: all 0.3s ease-in;
  text-transform: capitalize;
  min-height: 136px;
  /* -- */
`

export const StyledCartDrawer = styled.div`
  display: grid;
  grid-template-rows: 125px 1fr 240px;
  color: ${({ theme }) => theme.palette.pink.light};
  transition: all 0.7s;
  z-index: ${({ theme }) => theme.zIndex.mobileStepper};
  transform: ${({ openCart }) =>
    openCart ? " translateX(0)" : "translateX(440px)"};
  position: fixed;
  right: 0;
  top: 0;
  background: rgba(77, 77, 77, 0.99);
  height: 100vh;
  box-shadow: ${({ theme }) => theme.shadows[3]};
  border-radius: 3px 0 0 3px;
  ${({ theme }) => theme.breakpoints.up("md")} {
    min-width: 400px;
  }



  .close {
    margin: ${({ theme }) => theme.spacing(1)};
    color: ${({ theme }) => theme.palette.pink.light};
  }

  .header-title {
    text-align: center;
    text-transform: capitalize;
  }

  .count {
    display: flex;
    max-width: 150px;
    justify-content: space-evenly;
    align-items: center;
    margin: 0 auto;
  }

  hr {
    background: ${({ theme }) => theme.palette.pink.light};
  }

  .items {
    max-height: ${FOUR_ITEMS_HEIGHT + "px"};
    overflow-y: ${({ productsInCart }) =>
      productsInCart > 4 ? "scroll" : "inherit"};

    .title {
      max-width: 180px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &::-webkit-scrollbar {
      width: 14px;
      cursor: grab;
    }

    & {
      scrollbar-width: thin;
      scrollbar-color: rgba(77, 77, 77, 0.99);
    }
    &::-webkit-scrollbar-track {
      background: rgba(77, 77, 77, 0.99);
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.palette.pink.dark};
      border-radius: 6px;
      border: 3px solid  rgba(77, 77, 77, 0.99);
    }
  }

  .no-item {
    ${itemBase};
    display: flex;
    justify-content:center;
    align-items: center;
  }

  .item {
    ${itemBase};
    display: grid;
    grid-template-columns: 120px 1fr 50px;
    grid-gap: 15px;
    align-items: center;
   
    &:hover {
      box-shadow:1px 2px 12px ${({ theme }) => theme.palette.pink.light};
    }


  .image {
    border-radius: 50%;
    max-width: 120px;
    max-height: 120px;
  }
`

export const StyledTotal = styled(Box)`
  .total {
    display: grid;
    grid-gap: 15px;
    grid-template-columns: 120px 1fr 50px;
  }

  .euro {
    font-weight: 400;
    font-size: 1rem;
  }
`
export default StyledHeader
