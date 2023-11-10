import mongoose from 'mongoose'

const WishListSchema = mongoose.Schema({
  title: {
    type: String,
  },

  image: {
    type: String,
  },

  price: {
    type: Number,
  },
})

export const WishList = mongoose.model('wishlist', WishListSchema)
