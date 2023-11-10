'use client'
import { useEffect, useState, useContext } from 'react'
import { getAllProducts } from '@/app/actions/getAllProductsFunc'
import { getProductReview } from '@/app/actions/reviewProductFunc'
import { PropsContext } from '@/app/actions/consumProps'

import Style from './HomeProducts.css'
import Link from 'next/link'
import axios from 'axios'

const HomeProducts = () => {
  const [products, setProducts] = useState([])
  const [nameProduct, setNameProduct] = useState('')
  const [inWishList, setInWishList] = useState(false)

  const { product, setProduct } = useContext(PropsContext)

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

  const getNameProduct = async (selectedProduct) => {
    setNameProduct(selectedProduct)

    try {
      const response = await axios.post(`http://localhost:8000/wishlist`, {
        nameProduct,
      })
      const data = response.data.product[0]

      const updateProducts = products.map((product) => {
        if (product._id === selectedProduct._id) {
          return {
            ...product,
            inWishList: !product.inWishList,
          }
        }

        return product
      })

      setProduct((prevProducts) => [...prevProducts, data])

      setProducts(updateProducts)
    } catch (error) {
      console.error(error)
    }
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
                    } fa-heart`}
                    onClick={() => {
                      getNameProduct(product.title)
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
                <button className='add-to-cart'>Add to Cart</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HomeProducts
