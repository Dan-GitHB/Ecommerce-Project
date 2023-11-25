'use client'
import Style from '../ProductReview.css'
import { getProductReview } from '@/app/actions/reviewProductFunc'
import axios from 'axios'

import { useState, useEffect } from 'react'

const page = ({ params }) => {
  const [product, setProduct] = useState('')
  const [reviews, setReviews] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [rating, setRating] = useState(0)

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
      const reviewTitles = response.data.review.map((review) => review.title)
      setReviews(response.data.review)
    }

    reviewProduct()
    getAllReviews()
  }, [])

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

      alert('The review is posting right now')
    } catch (error) {
      alert(
        'Please make sure that you have an account and you are logged in before you try to post a review'
      )
      window.location = 'http://localhost:3000/Auth/LogIn'
    }
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
            <button className='add-to-cart-product'>
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

                  <span className='date-review'>2023-04-06:19:28:01</span>
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
