import React from "react"
import { Box } from "@material-ui/core"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

import { Product } from "../../components"

const StyledProducts = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  margin: 0 auto;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    max-width: 450px;
  }

  ${({ theme }) => theme.breakpoints.up("md")} {
    justify-items: center;
    grid-template-columns: 1fr 1fr;
  }

  ${({ theme }) => theme.breakpoints.up("lg")} {
    justify-items: unset;
    grid-template-columns: 1fr 1fr 1fr;
  }
`

const Products = ({}) => {
  const {
    allStrapiProduct: { nodes },
  } = useStaticQuery(graphql`
    query ProductsQuery {
      allStrapiProduct {
        nodes {
          title
          price
          old_price
          stock
          image {
            childImageSharp {
              fluid(maxWidth: 900, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          categories {
            name
          }
        }
      }
    }
  `)

  return (
    <StyledProducts>
      {nodes.map(node => (
        <Product key={node.id} {...node} />
      ))}
    </StyledProducts>
  )
}

export default Products
