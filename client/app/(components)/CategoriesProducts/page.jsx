'use client'
import { useState, useEffect } from 'react'
import { getAllProducts } from '@/app/actions/getAllProductsFunc'
import axios from 'axios'
import Style from './Categories.css'

const page = () => {
  const [prods, setProds] = useState([])
  const [type, setTye] = useState('')
  const [price, setPrice] = useState(-1)

  useEffect(() => {
    const getProducts = async () => {
      try {
        let produsele = await getAllProducts()
        setProds(produsele)

        if (type.length > 0) {
          const response = await axios.get(
            `http://localhost:8000/filtering?typeProduct=${type}&price=${price}`
          )

          setProds(response.data.data)
        }

        if (type === 'all-products') {
          setProds(produsele)
        }

        if (price > 0) {
          const response = await axios.get(
            `http://localhost:8000/filtering?typeProduct=${type}&price=${price}`
          )

          setProds(response.data.data)
        }

        if (price === 'all-products') {
          setProds(produsele)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getProducts()
  }, [type, price])

  const handleTypeChange = (event) => {
    const selectType = event.target.value
    setTye(selectType)
  }

  const handlePriceChange = (event) => {
    const selectPrice = event.target.value
    setPrice(Number(selectPrice))
  }

  return (
    <div className='parent-categories'>
      <div className='categories-logic'>
        <div className='categories-header'>
          <h1>All Products</h1>
        </div>

        <div className='categories-buttons'>
          <form action='' className='form-categories'>
            <section className='type-products field'>
              <label htmlFor='category-type'>Type:</label>
              <select
                name='category'
                id='category-type'
                className='category-product'
                value={type}
                onChange={handleTypeChange}
              >
                <option value='all-products'>All</option>
                <option value='Laptops'>Laptops</option>
                <option value='AirPods'>AirPods</option>
                <option value='Phones'>Phones</option>
                <option value='Monitors'>Monitors</option>
                <option value='Mouses'>Mouses</option>
                <option value='Keyboards'>Keyboards</option>
                <option value='Games'>Games</option>
                <option value='PCs'>PCs</option>
                <option value='TEST'>Test</option>
              </select>
            </section>

            <section
              className='price-products field'
              value={price}
              onChange={handlePriceChange}
            >
              <label htmlFor='category-price'>Price:</label>
              <select
                name='category'
                id='category-price'
                className='category-product'
              >
                <option value='all-products'>None</option>
                <option value={999}>Below $1000</option>
                <option value={1001}>Above $1000</option>
                <option value={1501}>Above $1500</option>
              </select>
            </section>
          </form>
        </div>
      </div>

      <div className='products-parent'>
        {prods.map((product) => {
          return (
            <div className='product' key={product._id}>
              <div className='bg-image-products-category'>
                <div className='image'>
                  <img src={product.image} className='image-product' />
                </div>
              </div>

              <h4 className='name-product'>{product.title}</h4>

              <div className='price-buy'>
                <strong className='price'>${product.price}</strong>
                <button className='add-to-cart'>Add to Cart</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default page
