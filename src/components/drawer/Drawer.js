import React from "react"
import { Button, Box } from "@material-ui/core"
import { useTranslation } from "react-i18next"

import StyledDrawer from "./Drawer.style"

const Drawer = ({ children, isDrawerOpen, handleCloseDrawer, side }) => {
  const { t } = useTranslation("common")
  return (
    <StyledDrawer isDrawerOpen={isDrawerOpen} side={side}>
      <Box textAlign={side === "right" ? "left" : "right"}>
        <Button size="small" className="close" onClick={handleCloseDrawer}>
          {t("close")}
        </Button>
      </Box>
      {children}
    </StyledDrawer>
  )
}

export default Drawer
