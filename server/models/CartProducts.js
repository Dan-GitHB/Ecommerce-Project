import mongoose from 'mongoose'

const cartSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },

  image: {
    type: String,
    require: true,
  },

  priece: {
    type: Number,
    require: true,
  },
})

export const CartProducts = mongoose.model('cart', cartSchema)
