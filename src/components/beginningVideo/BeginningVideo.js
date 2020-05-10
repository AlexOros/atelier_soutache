import React, { useRef, useEffect } from "react"
import { Dialog, Fade } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"

import BeginningVideoMp4 from "../../../static/atelier-soutache.mp4"
import BeginningVideoWebm from "../../../static/atelier-soutache.webm"

import {
  StyledDialogContent,
  StyledVideo,
  StyledCloseButton,
} from "./BeginningVideo.style"

const TransitionFade = React.forwardRef(function Transition(props, ref) {
  return <Fade direction="left" ref={ref} {...props} />
})

const BeginningVideo = ({ open, handleClose, maxWidth = "lg" }) => {
  const videoEl = useRef(null)

  useEffect(() => {
    setTimeout(() => {
      if (videoEl?.current) {
        videoEl.current.play()
      }
    }, 1000)
  }, [])

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
        <StyledVideo ref={videoEl} preload="metadata" controls>
          <source src={BeginningVideoMp4} type="video/mp4" />
          <source src={BeginningVideoWebm} type="video/webm" />
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
