import express, { Router } from 'express'
import { AllProducts } from '../models/AllProducts.js'
import { AllReviews } from '../models/Reviews.js'
import { ObjectId } from 'mongodb'

const router = express.Router()

router.get('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const product = await AllProducts.findById(id)

    const allReviews = await AllReviews.find({
      product: product._id,
    }).populate('productData')

    res.status(200).json({
      review: allReviews,
    })
  } catch (error) {}
})

router.post('/:id', async (req, res) => {
  const id = req.params.id
  const productt = await AllProducts.findById(id)

  const newReview = new AllReviews({
    title: req.body.title,
    content: req.body.content,
    rating: req.body.rating,
    product: productt._id,
  })

  try {
    await newReview.save()

    res.status(201).json({
      message: 'Review creat cu success',
      data: newReview,
    })
  } catch (error) {
    console.log(error)
  }
})

export { router as ReviewRoute }
