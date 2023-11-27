'use client'
import Style from '../../../styles/WishList.css'
import axios from 'axios'
import { useContext, useState, useEffect } from 'react'
import { PropsContext } from '@/app/actions/consumProps'

const WishList = () => {
  const { wishproduct, setWishProduct } = useContext(PropsContext)
  const { cartProducts, setCartProducts } = useContext(PropsContext) // Produsele ce le adaugam in Cart Page
  const [storedToken, setStoredToken] = useState('')

  useEffect(() => {
    setStoredToken(localStorage.getItem('token'))
  }, [storedToken])

  const removeProductFromWishList = (productId) => {
    let wishProducts = JSON.parse(localStorage.getItem('wishProducts'))

    let updatedProducts = wishProducts.filter(
      (item) => item && item._id !== productId
    )

    setWishProduct(updatedProducts)

    return localStorage.setItem('wishProducts', JSON.stringify(updatedProducts))
  }

  //

  const addProductsToCart = async (selectedProduct) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/products`,

        {
          nameProduct: selectedProduct.title,
        }
      )

      const data = response.data.product[0]

      setCartProducts((prevCartProducts) => [...prevCartProducts, data])
    } catch (error) {
      console.log(error)
      alert('Something went wrong. Make sure you are logged in!')
    }
  }

  // Setam tokenul in header, pentru a arata ca suntem logati in cont

  if (storedToken) {
    axios.defaults.headers.post['Authorization'] = `Bearer ${storedToken}`
  }

  let allWishProducts = JSON.parse(localStorage.getItem('wishProducts'))

  return (
    <div className='wish-list-parent'>
      <h1 className='wish-list-header'>My WishList</h1>
      <div className='wish-list-content'>
        <div className='wish-list-type-category'>
          <p>Product Name</p>
          <p>Unit Price</p>
          <p>Stock Status</p>
          <p></p>
        </div>
        <hr className='idk' />

        {allWishProducts && allWishProducts.length > 0
          ? allWishProducts.map((item) =>
              item !== undefined ? (
                <div className='wish-list-product-main' key={item._id}>
                  <div className='wish-list-product'>
                    <div className='wish-list-product-info'>
                      <i
                        className='fa-regular fa-trash-can wish-list-trash'
                        onClick={() => removeProductFromWishList(item._id)}
                      ></i>
                      <img src={item.image} className='wish-list-image' />
                      <p className='wish-list-name-product'>{item.title}</p>
                    </div>
                    <div className='wish-list-product-price'>
                      <span className='unit-price'>${item.price}</span>
                      <p className='new-price'>${item.price - 40}</p>
                    </div>
                    <div className='wish-list-stock'>
                      <p>In Stock</p>
                    </div>
                    <div className='wish-list-addtocart'>
                      <p>Added on: {item._id}</p>
                      <button onClick={() => addProductsToCart(item)}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  <hr className='idk' />
                </div>
              ) : null
            )
          : 'Wish List is empty'}
      </div>
    </div>
  )
}

export default WishList
