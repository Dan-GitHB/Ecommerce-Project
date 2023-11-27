'use client'
import Style from '../../../../styles/ProductReview.css'
import { getProductReview } from '@/app/actions/reviewProductFunc'
import { PropsContext } from '@/app/actions/consumProps'
import axios from 'axios'

import { useState, useEffect, useContext } from 'react'

const page = ({ params }) => {
  const { cartProducts, setCartProducts } = useContext(PropsContext)

  const [product, setProduct] = useState('')
  const [reviews, setReviews] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [rating, setRating] = useState(0)

  const [storedToken, setStoredToken] = useState('')

  const id = params.id

  useEffect(() => {
    const reviewProduct = async () => {
      try {
        const response = await getProductReview(id)

        setProduct(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    const getAllReviews = async () => {
      const response = await axios.get(`http://localhost:8000/reviews/${id}`)
      // const reviewTitles = response.data.review.map((review) => review.title)
      setReviews(response.data.review)
    }

    reviewProduct()
    getAllReviews()
  }, [])

  useEffect(() => {
    setStoredToken(localStorage.getItem('token'))
  }, [storedToken])

  const titleValue = () => {
    event.preventDefault()
    setTitle(event.target.value)
  }

  const contentValue = () => {
    event.preventDefault()
    setContent(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(`http://localhost:8000/reviews/${id}`, {
        title,
        content,
        rating,
      })

      alert(response.data.message)
      window.location.href = `/ProductReview/${id}`
    } catch (error) {
      alert(error.response.data.message)
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

  if (storedToken) {
    axios.defaults.headers.post['Authorization'] = `Bearer ${storedToken}`
  }

  // JSX CODE HERE:
  return (
    <>
      <div className='review-product-parent'>
        <div className='review-product-content'>
          <h1 className='product-name'>{product.title}</h1>

          <p className='product-description'>{product.description}</p>

          <span className='price-buy-product'>
            <strong className='price-product'>${product.price}</strong>
            <button
              className='add-to-cart-product'
              onClick={() => addProductsToCart(product)}
            >
              <i className='fa-solid fa-cart-shopping'></i>
              Add to Cart
            </button>
          </span>
        </div>

        <div className='review-product-image bg-image'>
          <img src={product.image} className='image-product' />
        </div>
      </div>

      <div className='parent-reviews'>
        <h2 className='review-header'>Reviews: </h2>
        <div className='one-review'>
          <section className='add-review'>
            <h2 className='add-review-header'>Add a review</h2>

            <form onSubmit={handleSubmit}>
              <span className='rate-review'>
                {[1, 2, 3, 4, 5].map((index) => {
                  return (
                    <i
                      key={index}
                      className={` ${
                        index <= rating ? 'fa-solid' : 'fa-regular'
                      } fa-star `}
                      onClick={() => setRating(index)}
                    ></i>
                  )
                })}
              </span>
              <input
                type='text'
                name='title'
                placeholder='Title'
                className='title-review'
                onChange={titleValue}
              />

              <textarea
                cols={'30'}
                rows={'2'}
                name='review-content'
                placeholder='Was it good? Pros? Cons?'
                className='review-text'
                onChange={contentValue}
              />

              <button type='submit' className='create-new-review'>
                Submit your review
              </button>
            </form>
          </section>

          <section className='all-reviews'>
            <h2 className='all-review-header'> All reviews</h2>

            {reviews.map((review, index) => (
              <div className='review' key={review._id}>
                <div className='rate-date'>
                  <span className='rate-reviews'>
                    {[1, 2, 3, 4, 5].map((index) => {
                      return (
                        <i
                          key={index}
                          className={` ${
                            review.rating >= index ? 'fa-solid' : 'fa-regular'
                          } fa-star`}
                        ></i>
                      )
                    })}
                  </span>

                  {/* <span className='date-review'>2023-04-06:19:28:01</span> */}
                </div>

                <div className='review-content'>
                  <span className='review-title'>
                    <h3>{review.title}</h3>
                  </span>

                  <span className='message-review-product'>
                    {review.content}
                  </span>
                </div>

                <hr />
              </div>
            ))}
          </section>
        </div>
      </div>
    </>
  )
}

export default page
