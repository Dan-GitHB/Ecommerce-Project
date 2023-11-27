'use client'

import { createContext, useState } from 'react'

export const PropsContext = createContext()

export default function PropsProvider({ children }) {
  const [products, setProducts] = useState([])
  const [wishproduct, setWishProduct] = useState([])

  const cartProductsFromLocalStorage = localStorage.getItem('cartProducts')

  const [cartProducts, setCartProducts] = useState(
    cartProductsFromLocalStorage !== null
      ? JSON.parse(localStorage.getItem('cartProducts'))
      : []
  )

  return (
    <PropsContext.Provider
      value={{
        products,
        setProducts,
        wishproduct,
        setWishProduct,
        cartProducts,
        setCartProducts,
      }}
    >
      {children}
    </PropsContext.Provider>
  )
}
