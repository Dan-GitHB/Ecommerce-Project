'use client'

import { createContext, useState } from 'react'

export const PropsContext = createContext()

export default function PropsProvider({ children }) {
  const [product, setProduct] = useState([])
  return (
    <PropsContext.Provider value={{ product, setProduct }}>
      {children}
    </PropsContext.Provider>
  )
}
