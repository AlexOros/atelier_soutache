import styled from "styled-components"
import Box from "@material-ui/core/Box"

const StyledProductPage = styled(Box)`
  .product {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: ${({ theme }) => theme.spacing(10)};
    max-width: 1200px;
    margin: 0 auto;

    ${({ theme }) => theme.breakpoints.up("md")} {
      grid-template-columns: 1fr 1fr;
    }
  }

  .story {
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
        width: 80vw;
        max-height: 400px;
        ${({ theme }) => theme.breakpoints.down("xs")} {
          width: 100vw;
          border-radius: 0;
        }

        ${({ theme }) => theme.breakpoints.up("md")} {
          width: 50vw;
        }
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

    .add-to-bag {
    }
  }
`

export default StyledProductPage
