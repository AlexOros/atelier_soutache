import React, { useState } from "react"
import {
  Typography,
  Box,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import ReactMarkdown from "react-markdown"

import StyledExpansionPanel from "./Info.style"

const Info = ({ info, handleChange, expanded }) => (
  <StyledExpansionPanel
    expanded={expanded === info.panel}
    onChange={handleChange(info.panel)}
  >
    <Box px={2}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        style={{ display: "flex" }}
        aria-controls={`${info.panel}bh-content`}
        id={`${info.panel}bh-header`}
      >
        <Typography className="title" variant="body1">
          {info.title}
        </Typography>
      </ExpansionPanelSummary>
    </Box>
    <ExpansionPanelDetails>
      <Box>
        <ReactMarkdown source={info.text} />
      </Box>
    </ExpansionPanelDetails>
  </StyledExpansionPanel>
)

const InfoContainer = ({ infoData = [] }) => {
  const [expanded, setExpanded] = useState(false)

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Box my={3}>
      {infoData.map(info => (
        <Info
          key={info.panel}
          info={info}
          expanded={expanded}
          handleChange={handleChange}
        />
      ))}
    </Box>
  )
}

export default InfoContainer
