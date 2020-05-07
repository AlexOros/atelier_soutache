import React from "react"
import { Link } from "gatsby"
import { Button } from "@material-ui/core"
import styled from "styled-components"

const StyledButtonLink = styled(Button)`
  .MuiButton-label a {
    text-decoration: none;
    color: ${({ theme }) => theme.palette.secondary.light};

    &:after {
      background: none;
    }
    a:hover:after,
    a:focus:after {
      width: 0;
    }
  }
`

const ButtonLink = ({ children, to, ...restOfProps }) => {
  return (
    <StyledButtonLink {...restOfProps}>
      <Link to={to}>{children}</Link>
    </StyledButtonLink>
  )
}

export default ButtonLink
