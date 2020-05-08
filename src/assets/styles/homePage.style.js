import styled from "styled-components"

const StyledHomePage = styled.div`
  ${({ theme }) => theme.mixins.linkHover()}
  .section-1 {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.3rem;

    ${({ theme }) => theme.breakpoints.up("md")} {
      grid-template-columns: 1fr 1.5fr;
    }

    ${({ theme }) => theme.breakpoints.up("lg")} {
      grid-template-columns: 1fr 2fr;
    }

    .image {
      position: relative;
      margin: 0 calc(-50vw + 50%);
      display: none;
      max-width: 450px;
      max-height: 674px;

      img {
        max-height: 674px;
      }

      &:before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: block;
        background: ${({ theme }) => theme.palette.background.default};
        overflow: hidden;
        animation: ${({ theme }) => theme.keyframes.tiltRight} 2s 600ms forwards
          ease-in-out;
      }

      ${({ theme }) => theme.breakpoints.up("md")} {
        margin: 0;
        display: inline-block;
      }
    }

    .content {
      display: flex;
      justify-content: center;

      ${({ theme }) => theme.breakpoints.down("sm")} {
        margin-top: ${({ theme }) => theme.spacing(13)};
      }

      ${({ theme }) => theme.breakpoints.up("md")} {
        justify-content: center;
        margin-top: ${({ theme }) => theme.spacing(30)};
      }

      h1 {
        font-size: 3rem;
        position: relative;
        line-height: 5rem;

        ${({ theme }) => theme.breakpoints.down("sm")} {
          text-align: center;
          font-size: 2.6rem;
        }
        &:before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 40%;
          right: 0;
          width: 50px;
          height: 250px;
          display: block;
          background: ${({ theme }) => theme.palette.background.default};
          overflow-x: hidden;
          z-index: -1;
          animation: ${({ theme }) => theme.keyframes.rotate} 30s 600ms infinite
            linear;

          ${({ theme }) => theme.breakpoints.up("md")} {
            top: -100px;
            left: 45%;
            width: 100px;
            height: 450px;
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
      grid-gap: ${({ theme }) => theme.spacing(2)};

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
        grid-row: inherit;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
`

export default StyledHomePage
