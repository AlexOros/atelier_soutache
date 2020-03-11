import styled from "styled-components"
import { Typography } from "@material-ui/core"

const StyledBrandTitle = styled(Typography)`
  position: relative;
  display: inline-block;

  .title {
    font-weight: ${({ theme }) => theme.typography.fontWeightBold};
    margin-right: ${({ theme }) => theme.spacing(1)};
  }

  .word {
    text-transform: capitalize;
  }
  ${({ theme }) => theme.mixins.titleBase}
`

export default StyledBrandTitle
