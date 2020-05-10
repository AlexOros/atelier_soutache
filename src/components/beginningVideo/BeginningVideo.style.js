import styled from "styled-components"
import { DialogContent, IconButton } from "@material-ui/core"

export const StyledDialogContent = styled(DialogContent)`
  background: #333;
  overflow: hidden;
`

export const StyledVideo = styled.video`
  position: relative;
  width: 100%;
  margin-bottom: -5px;
`

export const StyledCloseButton = styled(IconButton)`
  color: ${({ theme }) => theme.palette.background.default};
  z-index: 1;
  position: absolute;
  top: 10px;
  right: 10px;
`
