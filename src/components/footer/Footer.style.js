import styled from "styled-components"

export const StyledFooter = styled.footer`
  color: ${({ theme }) => theme.palette.secondary.light};
  background: ${({ theme }) => theme.palette.primary.main};
  margin-top: ${({ theme }) => theme.spacing(13)};
  min-height: 30vh;
  text-align: center;

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
`
