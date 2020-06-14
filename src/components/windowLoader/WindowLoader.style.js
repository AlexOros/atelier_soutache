import { Backdrop } from "@material-ui/core"
import styled from "styled-components"

export const StyledBackdrop = styled(Backdrop)`
  z-index: ${({ theme }) => theme.zIndex.modal};
  display: grid;
  place-content: center;
  text-align: center;
  background: rgba(0, 0, 0, 0.6);

  .text {
    color: ${({ theme }) => theme.palette.background.default};
    padding: ${({ theme }) => theme.spacing(0.5)};
  }
`
