import styled from "styled-components"

const StyledHeader = styled.header`
  display: grid;
  max-width: 1600px;
  margin: 0 auto;
  grid-template-columns: 1fr 2fr 1fr;
  padding: ${({ theme }) => theme.spacing(1)};

  ${({ theme }) => theme.breakpoints.up("md")} {
    padding: ${({ theme }) => theme.spacing(2)};
  }

  .nav-links {
    display: grid;
    max-width: 800px;
    gap: ${({ theme }) => theme.spacing(4)};
    justify-self: center;
    grid-template-columns: 1fr 1fr;
  }

  .shop {
    justify-self: end;
  }
`

export default StyledHeader
