import styled from "styled-components"
import { Typography } from "@material-ui/core"

export const StyledBrandTitle = styled(Typography)`
  position: relative;
  display: inline-block;
  ${({ theme }) => theme.mixins.titleBase}
`

export const StyledText = styled.span`
  display: inline-block;

  &::first-letter {
    text-transform: capitalize;
  }
`

export const StyledTitle = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
`

export default StyledBrandTitle
