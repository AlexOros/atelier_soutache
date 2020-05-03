import styled from "styled-components"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"

const StyledExpansionPanel = styled(ExpansionPanel)`
  .MuiExpansionPanelDetails-root {
    padding: 0 ${({ theme }) => theme.spacing(1)};
    font-size: ${({ theme }) => theme.typography.pxToRem(14)};
  }
  .MuiExpansionPanelSummary-root {
    .MuiButtonBase-root {
      transition: all 300ms ease-in-out;
    }
  }
  .title {
    text-transform: capitalize;
    display: flex;
    justify-content: space-between;
  }
  .link {
    ${({ theme }) => theme.mixins.linkHover()}
  }
`

export default StyledExpansionPanel
