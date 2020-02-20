import React, { useState, useCallback } from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const StyledNavLink = styled(Link)`
  position: relative;
  text-transform: capitalize;
  text-decoration: none;
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 1.1rem;
  ${({ theme }) => theme.breakpoints.up("md")} {
    font-size: 1.2rem;
  }
  ${({ theme }) => theme.mixins.titleBase};
`

const NavLink = ({ children, ...restOfProps }) => {
  const [isActive, setIsActive] = useState(false)

  const handleIsActive = useCallback(({ isCurrent }) => {
    setIsActive(isCurrent)
  }, [])

  return (
    <StyledNavLink
      active={isActive ? 1 : 0}
      getProps={handleIsActive}
      variant="body1"
      {...restOfProps}
    >
      {children}
    </StyledNavLink>
  )
}

export default NavLink
