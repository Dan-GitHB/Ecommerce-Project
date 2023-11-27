import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { ProductsRoute } from './routes/products.js'
import { ReviewRoute } from './routes/reviews.js'
import { WishListRoute } from './routes/wishList.js'
import { FilterProductsRoute } from './routes/filteringProducts.js'
import { CartRoute } from './routes/cartProducts.js'
import { UsersRoute } from './routes/authLogic.js'

const app = express()
const PORT = 8000
dotenv.config()

// const password = '7WGL18KPnEIRsEUt'
const password = process.env.PASSWORD
app.use(express.json())
// app.use(cors())
app.use(
  cors({
    origin: true,
    methods: 'GET, POST, PATCH, DELETE, PUT',
    allowedHeaders: 'Content-Type, Authorization',
  })
)

app.use('/products', ProductsRoute)
app.use('/reviews', ReviewRoute)
app.use('/wishlist', WishListRoute)
app.use('/filtering', FilterProductsRoute)
app.use('/cart', CartRoute)
app.use('/auth', UsersRoute)

mongoose.connect(
  `mongodb+srv://danbotan71:${password}@cluster0.gluiigi.mongodb.net/Ecommerce-App?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)

app.listen(PORT, () => console.log('Sa vedem daca merge acum totul'))
