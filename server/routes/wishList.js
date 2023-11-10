import express from 'express'
import mongoose from 'mongoose'
import { AllProducts } from '../models/AllProducts.js'
import { WishList } from '../models/WishList.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const product = await AllProducts.find({ title: 'Mackbook 14 Pro' })

    res.json({
      message: 'Merge',
      data: product,
    })
  } catch (error) {
    console.log(error)
  }
})

// Creem wishList products collection

router.post('/create', async (req, res) => {
  try {
    const { title, image, price } = req.body

    const newWishListProduct = new WishList({ title, image, price })
    await newWishListProduct.save()

    // Aici obține toate produsele din wishlist

    res.status(201).json({
      status: 'success',
      newWishListProduct,
    })
  } catch (error) {
    console.log(error)
  }
})

// Le adaugam la wishList page
router.post('/', async (req, res) => {
  const nameProduct = req.body.nameProduct

  try {
    const product = await WishList.find({ title: nameProduct })

    if (!product) {
      return res.json({
        status: 'error',
        message: 'We cant find this product',
      })
    }

    res.status(201).json({
      product,
    })
  } catch (error) {
    console.log(error)
  }
})

export { router as WishListRoute }
