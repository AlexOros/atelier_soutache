import styled, { css } from "styled-components"

const itemBase = css`
  display: grid;
  grid-template-columns: 0.5fr 1fr 0.5fr 0.5fr 0.2fr;
  border-radius: 3px;
  background: white;
  background: ${({ theme }) => theme.palette.background.default};
  padding: 10px;
  box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.1);
  align-items: center;
  /*  */
`

const StyledSummary = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-transform: capitalize;

  .summary {
    display: grid;
    grid-gap: 1rem;
    margin: 5rem;

    .item {
      ${itemBase};
      transition: background-color 200ms ease-in;
      text-transform: capitalized;
    }

    .item:hover {
      background: ${({ theme }) => theme.palette.background.paper};
      cursor: pointer;

      .image {
        width: 150px;
      }
    }

    .image {
      height: 100px;
      width: 100px;
      border-radius: 3px 0 0 3px;
      margin: -10px 10px -10px -10px;
      transition: all 200ms ease-in;
    }

    .delete {
      z-index: 1;
    }

    .total {
      ${itemBase}
      font-size: 1.2rem;

      .quantity {
        grid-column: 3 / span 1;
      }

      .sum {
        column-span: 4 / span 1;
      }
    }
  }

  .currency {
    font-size: ${({ theme }) => theme.typography.pxToRem(14)};
  }
`

export default StyledSummary
