import styled from "styled-components"
import { Typography } from "@material-ui/core"

const StyledBrandTitle = styled(Typography)`
  margin: 2rem;
  margin-right: 1rem;
  position: relative;

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 1px;
    left: -5px;
    background: ${({ theme }) => theme.palette.text.primary};
    height: 120%;
    width: 1px;
  }

  &::after {
    content: "";
    display: block;
    border-bottom: 1px solid ${({ theme }) => theme.palette.text.primary};
    width: 5%;
    margin-left: -15px;
  }
`

export default StyledBrandTitle
