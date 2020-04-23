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
    grid-gap: ${({ theme }) => theme.spacing(5)};
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
          border-radius: 0;
        }

        ${({ theme }) => theme.breakpoints.up("md")} {
          width: 50vw;
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

  .info {
    .price {
      font-size: ${({ theme }) => theme.typography.pxToRem(20)};
      .new {
        margin-left: ${({ theme }) => theme.spacing(1)};
      }
      .old {
        font-size: 0.9rem;
        text-decoration: line-through;
        color: ${({ theme }) => theme.palette.grey[500]};
        opacity: 1.7;
        ${({ theme }) => theme.breakpoints.up("sm")} {
          font-size: 1.2rem;
        }
      }
    }
    .stock {
      text-transform: capitalize;
      font-size: ${({ theme }) => theme.typography.pxToRem(16)};
      display: flex;
      align-items: center;
      &-number {
        margin-left: ${({ theme }) => theme.spacing(1)};
        font-size: ${({ theme }) => theme.typography.pxToRem(20)};
        font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
      }
    }

    .button-group {
      display: flex;
      justify-content: space-between;
    }
  }
`

export default StyledProductPage
