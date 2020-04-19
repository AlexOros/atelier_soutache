import React, { useEffect, useState, useContext, useCallback } from "react"
import { Fade, Box, Typography, IconButton } from "@material-ui/core"
import BackspaceIcon from "@material-ui/icons/Backspace"
import styled, { css } from "styled-components"
import { ProductsContext } from "../../context"
import { useTranslation } from "react-i18next"
import Img from "gatsby-image"
import { Title, Section } from "../../components"
import { navigate } from "gatsby"

const itemBase = css`
  display: grid;
  grid-template-columns: 0.5fr 1fr 0.5fr 0.5fr 0.2fr;
  border-radius: 3px;
  background: white;
  background: ${({ theme }) => theme.palette.background.default};
  padding: 10px;
  box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.1);
  align-items: center;
  /*  */
`

const StyledSummary = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  .summary {
    display: grid;
    grid-gap: 1rem;
    margin: 5rem;

    .item {
      ${itemBase};
      transition: background-color 200ms ease-in;
    }

    .item:hover {
      background: ${({ theme }) => theme.palette.background.paper};
      cursor: pointer;

      .image {
        width: 150px;
      }
    }

    .image {
      height: 100px;
      width: 100px;
      border-radius: 3px 0 0 3px;
      margin: -10px 10px -10px -10px;
      transition: all 200ms ease-in;
    }

    .title {
      text-transform: capitalize;
    }

    .delete {
      z-index: 1;
    }

    .total {
      ${itemBase}
      font-size: 1.2rem;

      .quantity {
        grid-column: 3 / span 1;
      }

      .sum {
        column-span: 4 / span 1;
      }
    }
  }
`

const options = {
  order_application_context: {
    brand_name: "Atelier Soutache",
  },

  onApprove: async function(data, actions) {
    // This function captures the funds from the transaction.
    const details = await actions.order.capture()
    console.log("𝕃𝕆𝔾 ⟹: Checkout -> details", details)
    // This function shows a transaction success message to your buyer.
    alert("Transaction completed by " + details.payer.name.given_name)
    return details
  },
  onError: async function(err) {
    console.log("𝕃𝕆𝔾 ⟹: Checkout -> err", err)
    // Show an error page here, when an error occurs
  },
  onCancel: async function(data) {
    console.log("𝕃𝕆𝔾 ⟹: Checkout -> data", data)
    // Show a cancel page, or return to cart
  },
}

const Checkout = () => {
  const { t } = useTranslation(["common", "checkout"])
  const {
    productsInCart,
    cart,
    totalSumInCart,
    handleRemoveProductFromCart,
  } = useContext(ProductsContext)

  const [paypalIsLoaded, setPaypalIsLoaded] = useState(false)

  const handleRemove = useCallback(
    item => {
      handleRemoveProductFromCart(item)
    },
    [handleRemoveProductFromCart]
  )

  useEffect(() => {
    const createOrder = (data, actions) => {
      // This function sets up the details of the transaction, including the amount and line item details.
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: "22",
            },
          },
        ],
      })
    }
    setTimeout(() => {
      if (window.paypal) {
        options.createOrder = createOrder
        // eslint-disable-next-line no-undef
        paypal.Buttons(options).render("#paypal-button-container")
        setPaypalIsLoaded(true)
      } else {
        //  TODO handle Paypal is not defined
      }
    }, 3000)
  }, [])

  return (
    <>
      <Section paddingTop={0}>
        <StyledSummary>
          <Title
            variant="h5"
            title={t("checkout:section-1.title.1")}
            subtitle={t("checkout:section-1.title.2")}
          />

          <Box my={[2, 4]} className="summary">
            {cart.map(item => (
              <Box
                onClick={() => navigate(`/${item.slug}`)}
                className="item"
                key={item.id}
              >
                <Img
                  className="image"
                  fluid={item.image.childImageSharp.fluid}
                  alt=""
                />

                <Box className="title">
                  <Typography variant="h6">{item.title}</Typography>
                </Box>
                <Box className="quantity"> Quantity: {item.quantity}</Box>
                <Box className="price">Price: {item.price} EUR</Box>
                <Box className="delete">
                  <IconButton
                    color="primary"
                    onClick={e => {
                      e.stopPropagation()
                      handleRemove(item)
                    }}
                  >
                    <BackspaceIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}
            <Box className="total">
              <Box className="quantity">
                Items:{" "}
                {cart.reduce(
                  (total, currItem) => (total += currItem.quantity),
                  0
                )}
              </Box>
              <Box className="sum">Total: {totalSumInCart} EUR</Box>
            </Box>
          </Box>
        </StyledSummary>
        <Fade in={paypalIsLoaded}>
          <Box
            style={{
              margin: "0 auto",
              maxWidth: "600px",
              transition: "all 1000ms ease-in",
            }}
            className="buttons"
            id="paypal-button-container"
          ></Box>
        </Fade>
      </Section>
    </>
  )
}

export default Checkout
