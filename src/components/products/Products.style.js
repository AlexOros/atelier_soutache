import styled from "styled-components"
import Box from "@material-ui/core/Box"

export const StyledProducts = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  margin: 0 auto;
  width: 100%;
  max-width: 450px;
  min-height: 85vh;

  ${({ theme }) => theme.breakpoints.up("1060")} {
    max-width: unset;
    justify-items: center;
    grid-template-columns: 1fr 1fr;
  }

  ${({ theme }) => theme.breakpoints.up("1600")} {
    justify-items: unset;
    grid-template-columns: 1fr 1fr 1fr;
  }
`

export const StyledPaginationComponent = styled(Box)`
  justify-self: 2 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    border-radius: 50%;
    margin: 0 1px 0 1px;
  }
`
