import styled from "styled-components"
import Box from "@material-ui/core/Box"

const StyledProducts = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  margin: 0 auto;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    max-width: 450px;
  }

  ${({ theme }) => theme.breakpoints.up("md")} {
    justify-items: center;
    grid-template-columns: 1fr 1fr;
  }

  ${({ theme }) => theme.breakpoints.up("lg")} {
    justify-items: unset;
    grid-template-columns: 1fr 1fr 1fr;
  }
`

export default StyledProducts
