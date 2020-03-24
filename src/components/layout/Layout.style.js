import styled from "styled-components"
import Container from "@material-ui/core/Container"

export default styled(Container)`
  min-height: calc(100vh - 87px);
  max-width: 1600px;
  overflow-x: hidden;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    overflow-x: inherit;
    padding: 0;
  }
`
