'use server'
import axios from 'axios'

export const getAllProducts = async () => {
  const response = await axios.get('http://localhost:8000/products')

  const data = response.data.data

  return data
}
