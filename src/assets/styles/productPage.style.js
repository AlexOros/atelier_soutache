import styled, { css } from "styled-components"
import Box from "@material-ui/core/Box"

const pinkBackground = css`
  background: linear-gradient(
    180deg,
    rgba(251, 224, 223, 0.18139005602240894),
    rgba(251, 224, 223, 0.98139005602240894),
    rgba(251, 224, 223, 1)
  );
`

const StyledProductPage = styled(Box)`
  .product {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: ${({ theme }) => theme.spacing(3)};
    max-width: 1200px;
    margin: 0 auto;

    ${({ theme }) => theme.breakpoints.up("md")} {
      grid-template-columns: 1fr 1fr;
      grid-gap: ${({ theme }) => theme.spacing(10)};
    }
  }

  .story {
    position: relative;
    display: grid;
    justify-self: center;
    ${({ theme }) => theme.breakpoints.up("md")} {
      justify-self: end;
    }

    .image-container {
      display: flex;
      max-width: 600px;
      justify-self: center;

      ${({ theme }) => theme.breakpoints.down("xs")} {
        margin: 0 calc(-50vw + 50%);
      }

      ${({ theme }) => theme.breakpoints.up("md")} {
        justify-self: flex-end;
      }

      .image {
        box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.1);
        ${({ theme }) => theme.breakpoints.down("xs")} {
          width: 100vw;
        }

        ${({ theme }) => theme.breakpoints.up("md")} {
          width: 50vw;
          border-radius: 3px;
        }

        img {
          ${({ theme }) => theme.breakpoints.up("md")} {
            border-radius: 3px;
          }
        }
      }
    }

    .more {
      height: 30px;
      position: absolute;
      bottom: -5px;
      left: 0;
      right: 0;
      ${({ more }) => (more ? "" : pinkBackground)}
      max-width: 95vw;
      margin: 0 auto;

      .icon {
        transition: all 200ms ease-in-out;
        transform: ${({ more }) => (more ? `rotate(180deg)` : "")};
      }
    }
  }

  .old-price {
    font-size: ${({ theme }) => theme.typography.pxToRem(15)};
    text-decoration: line-through;
    color: ${({ theme }) => theme.palette.grey[500]};
    opacity: 1.7;
  }

  .details {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-transform: capitalize;
    font-size: ${({ theme }) => theme.typography.pxToRem(20)};

    .stock {
      font-size: ${({ theme }) => theme.typography.pxToRem(16)};
    }

    .stock-number {
      margin-left: ${({ theme }) => theme.spacing(1)};
      font-size: ${({ theme }) => theme.typography.pxToRem(20)};
      font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
    }
  }

  .button-group {
    display: flex;
    justify-content: space-between;
  }

  .currency {
    font-size: ${({ theme }) => theme.typography.pxToRem(14)};
  }
`

export default StyledProductPage
