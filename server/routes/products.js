import express from 'express'
import mongoose from 'mongoose'
import { AllProducts } from '../models/AllProducts.js '

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const products = await AllProducts.find({})

    res.status(200).json({
      status: 'success',
      data: products,
    })
  } catch (error) {
    console.log(error)

    res.status(404).json({
      message: 'An error occur',
    })
  }
})

// Get One specific product

router.get('/product-review/:id', async (req, res) => {
  const id = req.params.id
  const product = await AllProducts.findById(id)

  try {
    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'This product doenst exist...',
      })
    }

    res.json({
      status: 'success',
      data: product,
    })
  } catch (error) {
    console.log(error)
  }
})

export { router as ProductsRoute }
