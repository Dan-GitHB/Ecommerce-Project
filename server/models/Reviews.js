import mongoose, { Schema } from 'mongoose'
import { AllProducts } from './AllProducts.js   '

const ReviewSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
    require: true,
  },
  review: {
    type: String,
    default: 'review',
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
  },
})

ReviewSchema.set('toObject', { virtuals: true })
ReviewSchema.set('toJSON', { virtuals: true })

ReviewSchema.virtual('productData', {
  ref: 'products_collection',
  localField: 'product',
  foreignField: '_id',
  justOne: true,
})

export const AllReviews = mongoose.model('review', ReviewSchema)
