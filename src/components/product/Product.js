import React, { useState } from "react"
import { Box, Typography, Button, ClickAwayListener } from "@material-ui/core"
import ShoppingBasketRoundedIcon from "@material-ui/icons/ShoppingBasketRounded"
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import { isMobile } from "../../utils"
import StyledProduct from "./Product.style"

const Product = () => {
  const data = useStaticQuery(
    graphql`
      query MyQuery {
        file {
          childImageSharp {
            # Specify the image processing specifications right in the query.
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `
  )
  const [showDetails, setShowDetails] = useState(false)

  return (
    <ClickAwayListener onClickAway={() => setShowDetails(false)}>
      <StyledProduct
        onMouseEnter={() => !isMobile() && setShowDetails(true)}
        onMouseLeave={() => !isMobile() && setShowDetails(false)}
        onClick={() => isMobile() && setShowDetails(true)}
        details={showDetails ? 1 : 0}
        boxShadow={3}
      >
        <Img className="image" fluid={data.file.childImageSharp.fluid} alt="" />
        <Box px={2} pt={[4, 6, 8]} className="overlay">
          <Box letterSpacing={4}>
            <Typography className="title" variant="h3">
              <span className="first-word">Red</span> Roses
            </Typography>
          </Box>
          <Box className="hr">
            <hr />
          </Box>

          <Typography className="price" variant="body1">
            <span className="old">$50</span>{" "}
            <span className="new">
              <span>$42 </span>
              <span>
                <span className="stock">Stock: 0</span>
              </span>
            </span>
          </Typography>

          <Box className="actions">
            <Button
              size={!isMobile() ? "small" : "medium"}
              startIcon={<ShoppingBasketRoundedIcon />}
              className="button"
            >
              add to bag
            </Button>
            <Button
              size={!isMobile() ? "small" : "medium"}
              endIcon={<ArrowForwardRoundedIcon />}
              className="button"
            >
              to Product
            </Button>
          </Box>
        </Box>
        <Box letterSpacing={4} pt={1} px={2} className="footer">
          <Typography variant="body2">
            <span className="first-word">Red</span> Roses
          </Typography>
        </Box>
      </StyledProduct>
    </ClickAwayListener>
  )
}

export default Product
