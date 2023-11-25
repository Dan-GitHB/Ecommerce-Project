import express from 'express'
import mongoose from 'mongoose'
import { AllProducts } from '../models/AllProducts.js'

const router = express.Router()

router.get(`/`, async (req, res) => {
  const { typeProduct, price } = req.query
  const filter = {}
  let products = []
  try {
    if (typeProduct !== '') {
      filter.typeProduct = typeProduct
      products = await AllProducts.find({
        typeProduct: filter.typeProduct,
      })
    }

    if (price > 0) {
      if (price < 1000) {
        products = await AllProducts.find({ price: { $lt: 1000 } })
      } else if (price > 1000 && price < 1500) {
        products = await AllProducts.find({ price: { $gt: 1000 } })
      } else if (price > 1500) {
        products = await AllProducts.find({ price: { $gt: 1500 } })
      }
    }

    if (typeProduct !== '' && price > 0) {
      filter.typeProduct = typeProduct

      if (price < 1000) {
        products = await AllProducts.find({
          typeProduct: filter.typeProduct,
          price: { $lt: 1000 },
        })
      }

      if (price > 1000 && price < 1500) {
        products = await AllProducts.find({
          typeProduct: filter.typeProduct,
          price: { $gt: 1000 },
        })
      }

      if (price > 1500) {
        products = await AllProducts.find({
          typeProduct: filter.typeProduct,
          price: { $gt: 1500 },
        })
      }

      if (filter.typeProduct === 'all-products' && price < 1000) {
        products = await AllProducts.find({
          price: { $lt: 1000 },
        })
      }

      if (
        filter.typeProduct === 'all-products' &&
        price > 1000 &&
        price < 1500
      ) {
        products = await AllProducts.find({
          price: { $gt: 1000 },
        })
      }

      if (filter.typeProduct === 'all-products' && price > 1500) {
        products = await AllProducts.find({
          price: { $gt: 1500 },
        })
      }

      if (filter.typeProduct === 'all-products' && price === NaN) {
        products = await AllProducts.find({})
      }
    }

    res.json({
      status: 'success',
      data: products,
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
