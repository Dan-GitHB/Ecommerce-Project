import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { ProductsRoute } from './routes/products.js'
import { ReviewRoute } from './routes/reviews.js'
import { WishListRoute } from './routes/wishList.js'

const app = express()
const PORT = 8000

const password = '7WGL18KPnEIRsEUt'

app.use(express.json())
app.use(cors())
app.use('/products', ProductsRoute)
app.use('/reviews', ReviewRoute)
app.use('/wishlist', WishListRoute)

mongoose.connect(
  `mongodb+srv://danbotan71:${password}@cluster0.gluiigi.mongodb.net/Ecommerce-App?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)

app.listen(PORT, () => console.log('Sa vedem daca merge acum totul'))