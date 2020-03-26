import styled, { keyframes } from "styled-components"

const rotateAnimation = keyframes`
    0% { transform: rotate(1deg)}
    100% { transform: rotate(360deg)}
`
const StyledHomePage = styled.div`
  ${({ theme }) => theme.mixins.linkHover()}
  .section-1 {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.3rem;
    padding: ${({ theme }) => `0 0 ${theme.spacing(15)} 0 `};

    ${({ theme }) => theme.breakpoints.up("md")} {
      grid-template-columns: 1fr 1fr;
    }

    .image {
      position: relative;
      transform: translate(-10vw, 0);
      display: none;

      ${({ theme }) => theme.breakpoints.up("md")} {
        display: inline-block;
      }

      ${({ theme }) => theme.breakpoints.up("2000")} {
        transform: translate(0, 0);
      }

      &:before {
        content: "";
        position: absolute;
        top: 5%;
        bottom: 0;
        left: 0;
        right: 0;
        display: block;
        transform: rotate(9deg);
        background: ${({ theme }) => theme.palette.pink.light};
        overflow-x: hidden;
      }
    }

    .content {
      display: flex;
      justify-content: center;
      align-items: center;

      h1 {
        font-size: 3rem;
        position: relative;

        ${({ theme }) => theme.breakpoints.down("sm")} {
          font-size: 2.6rem;

          &:before {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            left: 30%;
            right: 0;
            width: 50px;
            height: 250px;
            display: block;
            background: ${({ theme }) => theme.palette.pink.light};
            overflow-x: hidden;
            opacity: 0.8;
            z-index: -1;
            animation: ${rotateAnimation} 30s infinite linear;
          }
        }
      }
    }

    .creation {
      ${({ theme }) => theme.breakpoints.up("sm")} {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      p {
        text-transform: none !important;
      }
    }
  }

  .section-2 {
    .title {
      text-transform: capitalize;
    }
    .content {
      display: grid;
      grid-template-columns: 1fr;
      align-items: center;

      ${({ theme }) => theme.breakpoints.up("md")} {
        grid-template-columns: 1fr 1.3fr;
      }
    }

    .text {
      margin: 0 auto;
      max-width: 600px;
      background: ${({ theme }) => theme.palette.background.default};
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      min-height: 90vh;

      ${({ theme }) => theme.breakpoints.up("sm")} {
        min-height: 40vh;
      }
      ${({ theme }) => theme.breakpoints.up("md")} {
        min-height: 60vh;
      }

      button {
        max-height: 40px;
      }

      p {
        line-height: 30px;
      }
    }

    .image {
      grid-row: 1/ 2;
      margin: 0 calc(-50vw + 50%);

      ${({ theme }) => theme.breakpoints.up("sm")} {
        margin: 0;
      }

      ${({ theme }) => theme.breakpoints.up("md")} {
        transform: translate(10vw, 0);
        grid-row: inherit;
      }

      ${({ theme }) => theme.breakpoints.up("2000")} {
        transform: translate(0, 0);
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
`

export default StyledHomePage
