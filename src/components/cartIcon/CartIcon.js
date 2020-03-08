import React from "react"
import ShoppingBasketRoundedIcon from "@material-ui/icons/ShoppingBasketRounded"
import { Box, Badge, withStyles } from "@material-ui/core"
import styled from "styled-components"

const StyledBadge = withStyles(theme => ({
  badge: {
    right: 5,
    top: 15,
    border: `2px solid ${theme.palette.background.paper}`,
    background: `${theme.palette.error.dark}`,
    padding: "0 4px",
  },
}))(Badge)

const StyledCart = styled(Box)`
  cursor: pointer;
  transition: all 200ms ease-in;
  padding: ${({ theme }) => theme.spacing(1.5)};

  &:hover {
    color: ${({ theme }) => theme.palette.grey[600]};
  }

  svg {
    font-size: 2.6rem;

    ${({ theme }) => theme.breakpoints.up("md")} {
      font-size: 3rem;
    }
  }
`

const Cart = ({ handleClick, productsInCart }) => {
  return (
    <StyledCart>
      <StyledBadge color="primary" badgeContent={productsInCart}>
        <ShoppingBasketRoundedIcon onClick={() => handleClick()} />
      </StyledBadge>
    </StyledCart>
  )
}

export default Cart
