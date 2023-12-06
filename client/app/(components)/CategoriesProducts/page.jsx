'use client'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Style from '../../../styles/Categories.css'
import { getAllProducts } from '@/app/actions/getAllProductsFunc'
import { PropsContext } from '@/app/actions/consumProps'

const page = () => {
  const { cartProducts, setCartProducts } = useContext(PropsContext) // Produsele ce le adaugam in Cart Page

  const [prods, setProds] = useState([])
  const [type, setTye] = useState('')
  const [price, setPrice] = useState(-1)

  useEffect(() => {
    const allProducts = async () => {
      const response = await axios.get('http://localhost:8000/products')

      setProds(response.data.data)
    }
    allProducts()
  }, [])

  useEffect(() => {
    const getProducts = async () => {
      try {
        if (type.length > 0) {
          const response = await axios.get(
            `http://localhost:8000/filtering?typeProduct=${type}&price=${price}`
          )

          // const productsToFilter = response.data.data
          // const filterProducts = await productsToFilter.filter(
          //   (prod) => prod.typeProduct === type
          // )

          setProds(response.data.data)
          console.log(prods)
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

  const addProductsToCart = async (selectedProduct) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/products`,

        {
          nameProduct: selectedProduct.title,
        }
      )

      const data = response.data.product[0]
      const currentCartProducts =
        JSON.parse(localStorage.getItem('cartProducts')) || []

      const updatedCartProducts = [...currentCartProducts, data]

      localStorage.setItem('cartProducts', JSON.stringify(updatedCartProducts))

      setCartProducts(JSON.parse(localStorage.getItem('cartProducts')))
    } catch (error) {
      console.log(error)
      alert('Something went wrong. Make sure you are logged in!')
    }
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
        {prods.length > 0 ? (
          prods.map((product) => {
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
                  <button
                    className='add-to-cart'
                    onClick={() => addProductsToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            )
          })
        ) : (
          <h1 className='filter-info'>
            Dont exist yet products on this specific filter. You can change the
            price maybe
          </h1>
        )}
      </div>
    </div>
  )
}

export default page
