import React, { useEffect } from "react"
import { Button, Box, IconButton } from "@material-ui/core"
import { useTranslation } from "react-i18next"
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock"

import StyledDrawer from "./Drawer.style"
import { isMobile } from "../../utils"

const Drawer = ({
  closeIcon,
  children,
  isDrawerOpen,
  handleCloseDrawer,
  side,
}) => {
  const { t } = useTranslation("common")

  useEffect(() => {
    if (isMobile()) {
      isDrawerOpen ? disableBodyScroll() : enableBodyScroll()
    }

    return () => {
      clearAllBodyScrollLocks()
    }
  }, [isDrawerOpen])

  return (
    <StyledDrawer isDrawerOpen={isDrawerOpen} side={side}>
      <Box textAlign={side === "right" ? "left" : "right"}>
        {closeIcon ? (
          <IconButton
            className="close"
            onClick={handleCloseDrawer}
            color="secondary"
          >
            {closeIcon}
          </IconButton>
        ) : (
          <Button size="small" className="close" onClick={handleCloseDrawer}>
            {t("close")}
          </Button>
        )}
      </Box>
      {children}
    </StyledDrawer>
  )
}

export default Drawer
