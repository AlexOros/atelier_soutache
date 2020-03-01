import React, { createContext, useState, useCallback } from "react"

const ProductsContext = createContext()

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [productsInCart, setProductsInCart] = useState(0)

  const handleAddProductToCart = useCallback(
    product => {
      let existingProductInCart = null
      setProducts(oldProducts =>
        oldProducts.map(prod => {
          if (prod.id === product.id && product.stock > 0) {
            prod.stock -= 1

            setProductsInCart(amount => (amount += 1))
            existingProductInCart = cart.find(
              cartProd => cartProd.id === product.id
            )
          }
          return prod
        })
      )

      setCart(oldCartProducts => {
        if (existingProductInCart) {
          return oldCartProducts.map(cartProd =>
            cartProd.id === product.id
              ? { ...cartProd, quantity: cartProd.quantity + 1 }
              : cartProd
          )
        }
        return [...cart, { ...product, quantity: 1 }]
      })
    },
    [cart]
  )

  const handleRemoveProductFromCart = useCallback(
    product => {
      setCart(oldCart => {
        const existingProductInCart = oldCart.find(
          cartProd => cartProd.id === product.id
        )
        if (existingProductInCart.quantity === 1) {
          return oldCart.filter(prod => prod.id !== product.id)
        }

        return oldCart.map(prod =>
          prod.id === product.id ? (prod.quantity -= 1) : prod
        )
      })

      setProducts(oldProducts =>
        oldProducts.map(prod => {
          if (prod.id === product.id) {
            prod.stock += 1
            setProductsInCart(amount => (amount -= 1))
          }

          return prod
        })
      )
    },

    []
  )

  return (
    <ProductsContext.Provider
      value={{
        cart,
        productsInCart,
        setProducts,
        products,
        handleRemoveProductFromCart,
        handleAddProductToCart,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export { ProductsProvider, ProductsContext }
