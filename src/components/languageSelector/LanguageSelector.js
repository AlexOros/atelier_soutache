import React, { useState, useCallback } from "react"
import { Box, Button, Menu, MenuItem } from "@material-ui/core"
import { useTranslation } from "react-i18next"
import LanguageRoundedIcon from "@material-ui/icons/LanguageRounded"
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded"

const LanguageSelector = () => {
  const { i18n } = useTranslation()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClose = useCallback(
    lang => {
      if (lang) {
        i18n.changeLanguage(lang)
      }
      setAnchorEl(null)
    },
    [i18n]
  )

  return (
    <>
      {i18n.language && (
        <Box>
          <Button
            style={{ textTransform: "lowercase" }}
            size="small"
            startIcon={<LanguageRoundedIcon fontSize="small" />}
            endIcon={<ExpandMoreRoundedIcon />}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={e => setAnchorEl(e.currentTarget)}
          >
            {i18n.language}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => handleClose()}
          >
            <MenuItem onClick={() => handleClose("ro")}>ro</MenuItem>
            <MenuItem onClick={() => handleClose("en")}>en</MenuItem>
          </Menu>
        </Box>
      )}
    </>
  )
}

export default LanguageSelector
