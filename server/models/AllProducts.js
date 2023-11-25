import mongoose from 'mongoose'

const ProductSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },

  image: {
    type: String,
    require: true,
  },

  price: {
    type: Number,
    require: true,
  },

  wishList: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
  },

  productId: {
    type: mongoose.Schema.Types.ObjectId,
  },

  typeProduct: {
    type: String,
  },
  pieces: {
    type: Number,
  },
})

export const AllProducts = mongoose.model('products_collection', ProductSchema)
