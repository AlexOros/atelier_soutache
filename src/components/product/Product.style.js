import styled, { css } from "styled-components"
import Box from "@material-ui/core/Box"

const showActiveFooter = css`
  transform: translate3d(50px, -180px, 0) scale(1.5);
  font-size: 50px;
  opacity: 0;
  /* opacity: 0; */
`

const showActiveOverlay = css`
  opacity: 1;

  & .title {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
  }

  & .hr {
    hr {
      width: 175px;
      transition-delay: 0.4s;
    }
  }

  & .price {
    transform: translateY(0px);
    transition-delay: 0.3s;
    opacity: 1;
  }
  & .actions {
    transform: translateY(0px);
    transition-delay: 0.6s;
    opacity: 1;
    height: 100%;
  }
`

const StyledProduct = styled(Box)`
  position: relative;
  max-width: 450px;
  border-radius: 3px;
  margin-left: -16px;
  margin-right: -16px;
  text-transform: capitalize;

  ${({ theme }) => theme.breakpoints.up("xs")} {
    margin-left: 0;
    margin-right: 0;
  }

  img {
    border-radius: 3px;
  }

  .overlay {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 40px;
    background: rgba(77, 77, 77, 0.9);
    opacity: 0;
    transition: all 500ms ease-in-out;
    color: ${({ theme }) => theme.palette.pink.light};
    border-radius: 3px 3px 0 0;
    display: grid;
    grid-template-columns: 1fr;

    grid-template-rows: 0.5fr 0.1fr 0.5fr 1fr;

    ${({ theme }) => theme.breakpoints.up("sm")} {
      grid-template-rows: 1fr 0.8fr 1fr 1fr;
    }

    .title {
      font-size: 1.1rem;
      line-height: 20px;
      transform: translate3d(-40px, 80px, 0px) scale(0.8);
      transition: all 0.7s;
      opacity: 0;
      max-width: 300px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      ${({ theme }) => theme.breakpoints.up("sm")} {
        font-size: 1.5rem;
        max-width: 350px;
      }

      .first-word {
        font-weight: ${({ theme }) => theme.typography.fontWeightBold};
      }
    }

    .hr {
      justify-self: left;
      hr {
        display: block;
        width: 0;
        border: none;
        border-bottom: solid 1px ${({ theme }) => theme.palette.pink.light};
        transition: all 0.5s;
      }
    }

    .price {
      display: grid;
      font-size: 1.1rem;
      line-height: 30px;
      opacity: 0;
      transform: translateY(40px);
      transition: all 0.7s;

      ${({ theme }) => theme.breakpoints.up("sm")} {
        font-size: 1.5rem;
      }

      .old {
        font-size: 0.9rem;
        text-decoration: line-through;
        color: ${({ theme }) => theme.palette.grey[400]};
        opacity: 1.7;
        ${({ theme }) => theme.breakpoints.up("sm")} {
          font-size: 1.2rem;
        }
      }

      .new {
        display: flex;
        justify-content: space-between;

        .stock {
          font-size: 1rem;
        }
      }
    }

    .actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      opacity: 0;
      letter-spacing: 1px;
      transform: translateY(40px);
      transition: all 0.7s;

      .button {
        color: ${({ theme }) => theme.palette.pink.light};
      }
    }

    ${({ details }) => details && showActiveOverlay};
  }

  .footer {
    max-width: 200px;
    height: 40px;
    transform: translate3d(0, 0, 0) scale(1);
    transition: all 0.7s;

    ${({ details }) => details && showActiveFooter};

    .first-word {
      font-weight: ${({ theme }) => theme.typography.fontWeightBold};
    }
  }
`

export default StyledProduct
