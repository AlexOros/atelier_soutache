import React, { createContext, useState, useCallback, useMemo } from "react"

const ProductsContext = createContext()

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [totalProductsInCart, setProductsInCart] = useState(0)
  const [currency /*setCurrency*/] = useState("RON")

  const totalSumInCart = useMemo(() => {
    return cart.reduce((total, currItem) => {
      currItem.quantity > 1
        ? (total += currItem.price * currItem.quantity)
        : (total += currItem.price)
      return total
    }, 0)
  }, [cart])

  const handleEmptyCart = useCallback(() => {
    setProducts(products =>
      products.map(prod => {
        prod.stock = prod.originalStock
        return prod
      })
    )
    setCart([])
    setProductsInCart(0)
  }, [])

  const handleSetInitialProducts = useCallback(products => {
    setProducts(() =>
      products.reverse().map(prod => {
        prod.originalStock = prod.stock
        return prod
      })
    )
  }, [])

  const handleAddProductToCart = useCallback(
    product => {
      if (product.stock < 1) return

      let existingProductInCart = null
      setProducts(oldProducts =>
        oldProducts.map(prod => {
          if (prod.strapiId === product.strapiId && product.stock > 0) {
            prod.stock -= 1

            setProductsInCart(amount => (amount += 1))
            existingProductInCart = cart.find(
              cartProd => cartProd.strapiId === product.strapiId
            )
          }
          return prod
        })
      )

      setCart(oldCartProducts => {
        if (existingProductInCart) {
          return oldCartProducts.map(cartProd =>
            cartProd.strapiId === product.strapiId
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
          cartProd => cartProd.strapiId === product.strapiId
        )
        if (!existingProductInCart) return
        if (existingProductInCart.quantity === 1) {
          return oldCart.filter(prod => prod.strapiId !== product.strapiId)
        }

        return oldCart.map(prod => {
          if (prod.strapiId === product.strapiId) prod.quantity -= 1
          return prod
        })
      })

      setProducts(oldProducts =>
        oldProducts.map(prod => {
          if (prod.strapiId === product.strapiId) {
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
        currency,
        cart,
        totalProductsInCart,
        products,
        totalSumInCart,
        handleSetInitialProducts,
        handleEmptyCart,
        handleRemoveProductFromCart,
        handleAddProductToCart,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export { ProductsProvider, ProductsContext }
