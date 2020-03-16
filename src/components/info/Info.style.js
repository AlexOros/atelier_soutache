import styled from "styled-components"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"

const StyledExpansionPanel = styled(ExpansionPanel)`
  .MuiExpansionPanelDetails-root {
    padding: 0 ${({ theme }) => theme.spacing(1)};
    font-size: ${({ theme }) => theme.typography.pxToRem(14)};
  }
  .title {
    text-transform: capitalize;
    display: flex;
    justify-content: space-between;
  }
`

export default StyledExpansionPanel
