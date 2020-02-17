import React from "react"

import StyledBrandTitle from "./BrandTitle.style"

const BrandTitle = ({ children, ...restOfProps }) => {
  return <StyledBrandTitle {...restOfProps}>{children}</StyledBrandTitle>
}

export default BrandTitle
