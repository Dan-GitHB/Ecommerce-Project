'use client'

import { useContext, useState, useEffect } from 'react'
import { PropsContext } from '@/app/actions/consumProps'
import Style from '../../../styles/Cart.css'
import axios from 'axios'

const Page = () => {
  const { cartProducts, setCartProducts } = useContext(PropsContext)
  const [totalPrice, setTotalPrice] = useState(0)

  const [storedToken, setStoredToken] = useState('')

  useEffect(() => {
    // Calculul totalului de prețuri când coșul de cumpărături se schimbă
    const calculateTotalPrice = () => {
      let total = 0
      cartProducts.forEach((product) => {
        total += product.price * product.pieces
      })
      setTotalPrice(total)
    }

    calculateTotalPrice()
  }, [cartProducts])

  useEffect(() => {
    setStoredToken(localStorage.getItem('token'))
  }, [storedToken])

  // Adaugam noi bucati pentru un produs
  const addProductPieces = async (productId) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/cart/increase-pieces`,
        {
          productId: productId,
        }
      )

      setCartProducts((produseleAnterioare) =>
        produseleAnterioare.map((produsulCurent) =>
          produsulCurent._id === productId
            ? {
                ...produsulCurent,

                // pieces: response.data.product.pieces,
                pieces: produsulCurent.pieces + 1,
              }
            : produsulCurent
        )
      )
    } catch (error) {
      console.log(error)
    }
  }

  // Stergem anumite bucati a unui produs:
  const deleteProductPieces = async (productId) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/cart/decrease-pieces`,
        {
          productId: productId,
        }
      )

      setCartProducts((produseleAnterioare) =>
        produseleAnterioare.map((produsulCurent) =>
          produsulCurent._id === productId
            ? {
                ...produsulCurent,
                // pieces: response.data.product.pieces,
                pieces: produsulCurent.pieces - 1,
              }
            : produsulCurent
        )
      )
    } catch (error) {
      console.log(error)
    }
  }

  // Stergem un product din cart Products:

  const deleteOneCartProduct = (productId) => {
    setCartProducts((produseleAnterioare) =>
      produseleAnterioare.filter(
        (produsulCurent) => produsulCurent._id !== productId
      )
    )
  }
  // Stergem toate produsele din cart Products:

  const deleteAllCartProducts = () => {
    setCartProducts([])
  }

  const handleCheckout = async () => {
    try {
      if (cartProducts.length === 0) {
        alert(
          'You cant go to checkout page before you add some products into the cart'
        )
        return
      }

      const response = await axios.post(
        'http://localhost:8000/cart/create-checkout-session',
        {
          cartProducts: cartProducts,
        }
      )

      window.location = response.data.url
    } catch (error) {
      console.log(error)
    }
  }

  if (storedToken) {
    axios.defaults.headers.post['Authorization'] = `Bearer ${storedToken}`
  }

  return (
    <>
      <h1 className='cart-header'>Your Cart Items</h1>
      <div className='cart-product-parent'>
        <div className='cart-product-main'>
          <section className='cart-product-header'>
            <h1>Shopping Cart</h1>
            <p onClick={deleteAllCartProducts}>Remove all</p>
          </section>

          {cartProducts.map((product) => (
            <div className='cart-product' key={product._id}>
              <div className='product-cart'>
                <section className='product-image'>
                  <img src={product.image} alt={product.title} />
                </section>

                <section className='product-title'>
                  <p>{product.title}</p>
                </section>

                <section className='product-pieces'>
                  <button
                    onClick={() => {
                      deleteProductPieces(product._id)
                    }}
                  >
                    -
                  </button>
                  <p>{product.pieces}</p>
                  <button
                    onClick={() => {
                      addProductPieces(product._id)
                    }}
                  >
                    +
                  </button>
                </section>

                <section className='product-price'>
                  <strong>${product.price * product.pieces} </strong>
                  <p onClick={() => deleteOneCartProduct(product._id)}>
                    remove
                  </p>
                </section>
              </div>
            </div>
          ))}

          <hr />

          <div className='sub-total'>
            <div className='sub-total-info'>
              <h1>Sub Total</h1>
              <section className='total-items'>
                <p>{cartProducts.length} items</p>
                <strong className='total price'>
                  ${totalPrice.toFixed(2)}
                </strong>
              </section>
            </div>

            <button onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
