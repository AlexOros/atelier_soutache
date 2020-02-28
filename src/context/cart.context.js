import React, { createContext, useMemo, useState } from "react"

const CartContext = createContext()

const CartProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isCartOpened, setIsCartOpened] = useState(false)
  const [products, setProducts] = useState([])

  const productsInCart = useMemo(() => products.length, [products])
  console.log("𝕃𝕆𝔾 ⟹: CartProvider -> productsInCart", productsInCart)

  return (
    <CartContext.Provider
      value={{
        isLoading,
        isCartOpened,
        products,
        productsInCart,
        setIsLoading,
        setIsCartOpened,
        setProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export { CartProvider, CartContext }
