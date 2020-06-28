import React from "react"
import { Box } from "@material-ui/core"

const Total = ({ t, totalItems, totalSumInCart, currency }) => {
  return (
    <Box className="total">
      <Box className="quantity">
        {t("common:items")}: {totalItems}
      </Box>
      <Box className="sum">
        total: {totalSumInCart.toLocaleString()}{" "}
        <span className="currency">{currency}</span>
      </Box>
    </Box>
  )
}

export default Total
