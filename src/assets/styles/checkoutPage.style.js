import styled, { css } from "styled-components"
import Box from "@material-ui/core/Box"

const itemBase = css`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 15px;
  background: ${({ theme }) => theme.palette.background.default};
  padding: 10px;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 1rem;
  }

  ${({ theme }) => theme.breakpoints.up("sm")} {
    grid-template-columns: 0.5fr 1fr 0.5fr 0.5fr 0.2fr;
    align-items: center;
    justify-content: center;
  }

  /*  */
`

export const StyledSummary = styled(Box)`
  max-width: 1000px;
  margin: 0 auto;

  .summary {
    display: grid;
    grid-gap: 1rem;
    text-transform: capitalize;

    .item {
      ${itemBase};
      transition: background-color 200ms ease-in;
      text-transform: capitalized;
    }

    .item:hover {
      ${({ theme }) => theme.breakpoints.up("md")} {
        background: ${({ theme }) => theme.palette.background.paper};
        cursor: pointer;

        .image {
          width: 150px;
        }
      }
    }

    .image {
      height: 100%;
      width: 100%;
      border-radius: 3px;

      ${({ theme }) => theme.breakpoints.up("sm")} {
        margin: -10px 10px -10px -10px;
        height: 100px;
        width: 100px;
        border-radius: 3px 0 0 3px;
        transition: all 200ms ease-in;
      }
    }

    .delete {
      z-index: 1;
    }

    .total {
      ${itemBase}
      font-size: 1.2rem;
      text-transform: capitalize;

      ${({ theme }) => theme.breakpoints.up("sm")} {
        .quantity {
          grid-column: 3 / span 1;
        }

        .sum {
          grid-column: 4 / span 2;
        }
      }

      ${({ theme }) => theme.breakpoints.down("xs")} {
        grid-template-columns: 1fr;
      }
    }
  }

  .empty {
    display: flex;
    min-height: 100px;
    max-width: 1000px;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    background: ${({ theme }) => theme.palette.background.default};

    p::first-letter {
      text-transform: capitalize;
    }
  }

  .empty-bag {
    margin-left: ${({ theme }) => theme.spacing(2)};
    svg {
      width: 3.5rem;
      height: 3.5rem;
    }
  }

  .currency {
    font-size: ${({ theme }) => theme.typography.pxToRem(14)};
  }
`

export const StyledConsent = styled(Box)`
  display: grid;
  place-items: center;
  max-width: 400px;
  margin: ${({ theme }) => theme.spacing(4)} auto;
  background: ${({ theme }) => theme.palette.background.default};

  ${({ theme }) => theme.mixins.linkHover()}

  .checkbox {
    color: "orangered";
  }

  .note {
    opacity: 0.8;
    color: #666;
  }
`
