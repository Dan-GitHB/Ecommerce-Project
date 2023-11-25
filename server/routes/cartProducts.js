import express from 'express'
import mongoose from 'mongoose'
import stripe from 'stripe'
import { verifyToken } from './authLogic.js'
import { AllProducts } from '../models/AllProducts.js'

const app = express()
const router = express.Router()

const stripeSecretKey =
  'sk_test_51OEFugGk7gyLcRzVk8betvpIH5RKJ9PA9w3tYoextYq3LY4xSfRSaJORSSwZWsjMbbMlprvZe53OCT8kzHZTCa7N00mcHTOQrK'

const stripeIdk = stripe(stripeSecretKey)

router.post('/', async (req, res) => {
  const { nameProduct } = req.body

  try {
    const product = await AllProducts.find({ title: nameProduct })

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

// add new pieces of one product
router.patch('/increase-pieces', async (req, res) => {
  const { productId } = req.body

  try {
    const query = { _id: productId, pieces: { $lt: 10 } }
    const update = { $inc: { pieces: 1 } }

    const product = await AllProducts.findOneAndUpdate(query, update, {
      new: true,
    })

    if (!product) {
      return res
        .status(404)
        .json({ message: 'Product not found or pieces already at maximum.' })
    }
    res.json({
      message: 'Product updated successfully',
      product,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

router.patch('/decrease-pieces', async (req, res) => {
  const { productId } = req.body

  try {
    const query = { _id: productId, pieces: { $gt: 1 } }
    const update = { $inc: { pieces: -1 } }

    const product = await AllProducts.findOneAndUpdate(query, update, {
      new: true,
    })

    if (!product) {
      return res
        .status(404)
        .json({ message: 'Product not found or pieces already at minimum.' })
    }

    res.json({
      message: 'Product updated successfully',
      product,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

router.post('/create-checkout-session', async (req, res) => {
  const { cartProducts } = req.body

  try {
    const session = await stripeIdk.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: cartProducts.map((item) => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.title,
              images: [item.image],
            },
            unit_amount: item.price * 100,
          },
          quantity: item.pieces,
        }
      }),
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    })

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')

    res.json({ url: session.url, cartProducts })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export { router as CartRoute }
