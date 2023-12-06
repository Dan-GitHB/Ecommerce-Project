import express from 'express'
import mongoose from 'mongoose'
import { AllProducts } from '../models/AllProducts.js'

const router = express.Router()

router.get(`/`, async (req, res) => {
  const { typeProduct, price } = req.query

  // let allProducts = await AllProducts.find({})
  // res.json({ data: allProducts })

  try {
    let allProducts = (await AllProducts.find({})) || []
    let filteredProducts =
      (await AllProducts.find({ typeProduct: typeProduct })) || []

    if (price > 0 && price < 1000) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price < 1000
      )

      console.log(filteredProducts)
    }

    if (price > 0 && price >= 1000 && price < 1500) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= 1000 && product.price < 1500
      )
    }

    if (price > 0 && price >= 1500) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= 1500
      )

      console.log(filteredProducts)
    }

    if (typeProduct !== '' && price > 0) {
      const currentTypeProducts = filteredProducts.filter(
        (product) => product.typeOfProduct == typeProduct
      )

      console.log(currentTypeProducts)
    }

    if (typeProduct === 'all-products' && price < 1000) {
      filteredProducts = allProducts.filter((product) => product.price < 1000)

      console.log(filteredProducts)
    }

    if (typeProduct === 'all-products' && price > 1000 && price < 1500) {
      filteredProducts = allProducts.filter((product) => product.price > 1000)
    }

    if (typeProduct === 'all-products' && price > 1500) {
      filteredProducts = allProducts.filter((product) => product.price > 1500)
    }

    if (typeProduct === 'all-products' && isNaN(price)) {
      filteredProducts = allProducts
    }

    res.json({
      status: 'success',
      data: filteredProducts,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    })
  }
})

export { router as FilterProductsRoute }
