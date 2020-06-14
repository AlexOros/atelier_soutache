import React, { useEffect } from "react"
import { CometSpinLoader } from "react-css-loaders"
import { Typography } from "@material-ui/core"
import { useTheme } from "styled-components"

import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock"

import { StyledBackdrop } from "./WindowLoader.style"

const WindowLoader = ({ open, handleClose, text }) => {
  useEffect(() => {
    if (open) disableBodyScroll()

    return () => {
      clearAllBodyScrollLocks()
    }
  }, [open])

  const theme = useTheme()
  return (
    <StyledBackdrop open={open} onClick={handleClose}>
      {text && (
        <Typography className="text" variant="h6">
          {text}
        </Typography>
      )}
      <CometSpinLoader color={theme.palette.background.default} size={60} />
    </StyledBackdrop>
  )
}

export default WindowLoader
