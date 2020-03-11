import styled from "styled-components"
import Box from "@material-ui/core/Box"

const StyledProductPage = styled(Box)`
  .product {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: ${({ theme }) => theme.spacing(10)};
  }

  .story {
  }

  .info {
  }
`

export default StyledProductPage
