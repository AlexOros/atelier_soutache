import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import {
  Typography,
  Box,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "@material-ui/core"
import { Link } from "gatsby"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import ReactMarkdown from "react-markdown"

import StyledExpansionPanel from "./Info.style"

const Info = ({ info, handleChange, expanded, t }) => (
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
      <Box pb={2} className="link">
        {typeof info.text === "object" ? (
          <>
            {Object.values(info.text).map((text, index) => (
              <Box key={index} mb={1}>
                <Typography
                  dangerouslySetInnerHTML={{ __html: text }}
                  variant="body2"
                />
              </Box>
            ))}
            <Link to="shipping-and-returns">{t("to_shipping_and_return")}</Link>
          </>
        ) : (
          <ReactMarkdown source={info.text} />
        )}
      </Box>
    </ExpansionPanelDetails>
  </StyledExpansionPanel>
)

const InfoContainer = ({ infoData = [] }) => {
  const [expanded, setExpanded] = useState(false)
  const { t } = useTranslation("product")

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Box my={3}>
      {infoData.map(info => (
        <Info
          t={t}
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
