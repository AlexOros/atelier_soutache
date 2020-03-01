import React, { createContext, useMemo, useState, useCallback } from "react"

const ProductsContext = createContext()

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])

  const nOfProductsInCart = useMemo(() => cart.length, [cart])

  const handleAddProductToCart = useCallback(
    product => {
      setProducts(
        products.map(prod => {
          if (prod.id === product.id && product.stock > 0) {
            prod.stock -= 1
            setCart(oldState => [...oldState, product])
          }
          return prod
        })
      )
    },
    [products]
  )

  return (
    <ProductsContext.Provider
      value={{
        cart,
        nOfProductsInCart,
        handleAddProductToCart,
        setProducts,
        products,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export { ProductsProvider, ProductsContext }
