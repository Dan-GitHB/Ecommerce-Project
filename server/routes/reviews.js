import express, { Router } from 'express'
import { AllProducts } from '../models/AllProducts.js'
import { AllReviews } from '../models/Reviews.js'
import { ObjectId } from 'mongodb'
import { verifyToken } from './authLogic.js'

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

router.post('/:id', verifyToken, async (req, res) => {
  const id = req.params.id
  const productt = await AllProducts.findById(id)

  const { title, content, rating } = req.body

  if (title === '' || content === '' || rating < 1) {
    return res.status(500).json({ message: 'All the fields are required' })
  }

  const newReview = new AllReviews({
    title,
    content,
    rating,
    product: productt._id,
  })

  try {
    await newReview.save()

    res.status(201).json({
      message: 'The review was created successfully',
      data: newReview,
    })
  } catch (error) {
    console.log(error)
  }
})

export { router as ReviewRoute }
