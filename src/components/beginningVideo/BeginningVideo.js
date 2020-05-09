import React from "react"
import { Dialog, Fade } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"

import BeginningVideoMp4 from "../../../static/Atelier Soutache (1).mp4"
import {
  StyledDialogContent,
  StyledVideo,
  StyledCloseButton,
} from "./BeginningVideo.style"

const TransitionFade = React.forwardRef(function Transition(props, ref) {
  return <Fade direction="left" ref={ref} {...props} />
})

const BeginningVideo = ({ open, handleClose, maxWidth = "lg" }) => {
  return (
    <Dialog
      fullWidth
      maxWidth={maxWidth}
      open={open}
      TransitionComponent={TransitionFade}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="Process video"
      aria-describedby="A short film about the process of making soutache jewelry"
    >
      <StyledDialogContent style={{ padding: "0" }}>
        <StyledVideo autoplay="true" controls>
          <source src={BeginningVideoMp4} />
        </StyledVideo>
      </StyledDialogContent>
      <StyledCloseButton
        color="secondary"
        onClick={e => {
          e.stopPropagation()
          handleClose()
        }}
        className="video-close-btn"
      >
        <CloseIcon />
      </StyledCloseButton>
    </Dialog>
  )
}

export default BeginningVideo
