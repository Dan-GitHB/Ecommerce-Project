'use server'
import axios from 'axios'

export const getProductReview = async (idProduct) => {
  const response = await axios.get(
    `http://localhost:8000/products/product-review/${idProduct}`
  )

  const data = response.data

  return data
}
