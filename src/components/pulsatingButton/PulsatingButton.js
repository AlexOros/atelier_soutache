import React from "react"

import StyledPulsatingButton from "./PulsatingButton.style"

const PulsatingButton = ({ children, handleClick }) => {
  return (
    <StyledPulsatingButton onClick={e => handleClick(e)}>
      {children}
    </StyledPulsatingButton>
  )
}

export default PulsatingButton
