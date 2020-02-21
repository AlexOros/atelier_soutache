import styled from "styled-components"
import { Typography } from "@material-ui/core"

const StyledBrandTitle = styled(Typography)`
  position: relative;

  .title {
    font-weight: ${({ theme }) => theme.typography.fontWeightBold};
    margin-right: ${({ theme }) => theme.spacing(1)};
  }
  ${({ theme }) => theme.mixins.titleBase}
`

export default StyledBrandTitle
