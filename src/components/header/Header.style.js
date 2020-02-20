import styled from "styled-components"

const StyledHeader = styled.header`
  display: grid;
  max-width: 1600px;
  margin: 0 auto;
  grid-template-columns: 120px 1fr 120px;
  padding: ${({ theme }) => theme.spacing(1)};

  ${({ theme }) => theme.breakpoints.up("md")} {
    padding: ${({ theme }) => theme.spacing(2)};
  }

  .navLinks {
    display: grid;
    max-width: 800px;
    gap: ${({ theme }) => theme.spacing(4)};
    justify-self: center;
    grid-template-columns: 1fr 1fr;
  }
`

export default StyledHeader
