import styled from "styled-components"

export const StyledFooter = styled.footer`
  position: relative;
  color: ${({ theme }) => theme.palette.secondary.light};
  background: ${({ theme }) => theme.palette.primary.main};
  margin-top: ${({ theme }) => theme.spacing(13)};
  min-height: 30vh;
  text-align: center;
  font-weight: ${({ theme }) => theme.typography.fontWeightMedium};

  ${({ theme }) => theme.breakpoints.up("md")} {
    text-align: inherit;
  }

  .pages {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    max-width: 1200px;
    margin: 0 auto;
    padding: ${({ theme }) => `${theme.spacing(4)} ${theme.spacing(2)}`};

    ${({ theme }) => theme.breakpoints.up("md")} {
      flex-direction: row;
    }

    .title {
      border-bottom: 1px solid ${({ theme }) => theme.palette.secondary.light};
    }

    .links {
      text-transform: uppercase;
    }

    .column {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: ${({ theme }) => theme.spacing(2)};
      margin-bottom: ${({ theme }) => theme.spacing(2)};
      ${({ theme }) => theme.breakpoints.up("md")} {
        align-items: flex-start;
        margin-bottom: ${({ theme }) => theme.spacing(0)};
        grid-auto-rows: 2rem;
        padding: 0;
      }
      ${({ theme }) => theme.mixins.linkHover("pink")}
      a {
        margin: ${({ theme }) => `${theme.spacing(1)} 0`};
      }
    }
  }

  .social {
    display: flex;
    justify-content: space-evenly;
  }

  .copy {
    text-align: center;
    ${({ theme }) => theme.mixins.linkHover("pink")}
  }

  .payment-logos {
    max-width: 160px;
    margin: 0 auto;

    ${({ theme }) => theme.breakpoints.up("md")} {
      position: absolute;
      bottom: 10px;
      left: 10px;
    }

    svg {
      width: ${({ theme }) => theme.typography.pxToRem(40)};
      ${({ theme }) => theme.breakpoints.up("md")} {
        width: ${({ theme }) => theme.typography.pxToRem(60)};
      }
      margin-right: ${({ theme }) => theme.spacing(1)};
    }
  }
`
