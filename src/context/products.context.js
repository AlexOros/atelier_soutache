import React, { createContext, useState, useCallback, useMemo } from "react"

const ProductsContext = createContext()

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [totalProductsInCart, setProductsInCart] = useState(0)
  const [storePage, setStorePage] = useState(1)
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

  const handleSetStaticInitialProducts = useCallback(products => {
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
          if (prod.uid === product.uid && product.stock > 0) {
            prod.stock -= 1

            setProductsInCart(amount => (amount += 1))
            existingProductInCart = cart.find(
              cartProd => cartProd.uid === product.uid
            )
          }
          return prod
        })
      )

      setCart(oldCartProducts => {
        if (existingProductInCart) {
          return oldCartProducts.map(cartProd =>
            cartProd.uid === product.uid
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
          cartProd => cartProd.uid === product.uid
        )
        if (!existingProductInCart) return
        if (existingProductInCart.quantity === 1) {
          return oldCart.filter(prod => prod.uid !== product.uid)
        }

        return oldCart.map(prod => {
          if (prod.uid === product.uid) prod.quantity -= 1
          return prod
        })
      })

      setProducts(oldProducts =>
        oldProducts.map(prod => {
          if (prod.uid === product.uid) {
            prod.stock += 1
            setProductsInCart(amount => (amount -= 1))
          }
          return prod
        })
      )
    },

    []
  )

  const handleSetProducts = useCallback(newProducts => {
    const newProductsMap = newProducts.reduce((prodMap, item) => {
      prodMap[item.uid] = item
      return prodMap
    }, {})

    setProducts(products => {
      return products
        .filter(product => !!newProductsMap[product.uid])
        .map(product => ({ ...product, ...newProductsMap[product.uid] }))
    })
  }, [])

  return (
    <ProductsContext.Provider
      value={{
        currency,
        cart,
        totalProductsInCart,
        products,
        totalSumInCart,
        storePage,
        setStorePage,
        handleSetStaticInitialProducts,
        handleEmptyCart,
        handleRemoveProductFromCart,
        handleAddProductToCart,
        handleSetProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export { ProductsProvider, ProductsContext }
