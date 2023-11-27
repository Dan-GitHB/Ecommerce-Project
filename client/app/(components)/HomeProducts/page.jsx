'use client'
import { useEffect, useState, useContext } from 'react'
import { getAllProducts } from '@/app/actions/getAllProductsFunc'
import { getProductReview } from '@/app/actions/reviewProductFunc'
import { PropsContext } from '@/app/actions/consumProps'

import styles from '../../../styles/HomeProducts.css'
import Link from 'next/link'
import axios from 'axios'

const HomeProducts = () => {
  const { products, setProducts } = useContext(PropsContext) //Toate produsele din home Page
  const { wishproduct, setWishProduct } = useContext(PropsContext) //Produsele ce le adaugam in Wish List
  const { cartProducts, setCartProducts } = useContext(PropsContext) // Produsele ce le adaugam in Cart Page
  const [storedToken, setStoredToken] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProducts()
        setProducts(response)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    setStoredToken(localStorage.getItem('token'))
  }, [storedToken])

  const addProductsToWishList = async (selectedProduct) => {
    try {
      const response = await axios.post(`http://localhost:8000/wishlist`, {
        nameProduct: selectedProduct.title,
      })
      const data = response.data.product[0]

      if (selectedProduct !== '') {
        const updateProducts = products.map((product) => {
          if (product._id === selectedProduct._id) {
            return {
              ...product,
              inWishList: true,
            }
          }

          return product
        })

        setProducts(updateProducts)
      }

      setWishProduct((prevProducts) => [...prevProducts, data])
      localStorage.setItem('wishProducts', JSON.stringify(wishproduct))
    } catch (error) {
      alert('Something went wrong. Make sure you are logged in')
    }
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

  if (wishproduct.length > 0) {
    localStorage.setItem('wishProducts', JSON.stringify(wishproduct))
  }

  if (storedToken) {
    axios.defaults.headers.post['Authorization'] = `Bearer ${storedToken}`
  }

  return (
    <div className='home-parent'>
      <div className='products-parent'>
        {products.map((product) => {
          return (
            <div className='product' key={product._id}>
              <div className='bg-image'>
                <span className='add-to-buy'>
                  <i
                    className={`${
                      product.inWishList ? 'fa-solid' : 'fa-regular'
                    } fa-heart i`}
                    onClick={() => {
                      if (product.inWishList === true) {
                        alert(
                          'This product is already on your wish list. Go check it out!'
                        )
                        return null
                      }
                      addProductsToWishList(product)
                    }}
                  ></i>
                </span>

                <div className='image'>
                  <Link href={`/ProductReview/${product._id}`}>
                    <img src={product.image} className='image-product' />
                  </Link>
                </div>
              </div>

              <h4 className='name-product'>{product.title}</h4>

              <div className='price-buy'>
                <strong className='price'>${product.price}</strong>
                <button
                  className='add-to-cart'
                  onClick={() => {
                    addProductsToCart(product)
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HomeProducts
