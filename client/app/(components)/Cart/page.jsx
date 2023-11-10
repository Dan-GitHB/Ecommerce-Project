import Style from './Cart.css'

const Page = () => {
  return (
    <>
      <h1 className='cart-header'>Your cart Items</h1>
      <div className='cart-product-parent'>
        <div className='cart-product-main'>
          <section className='cart-product-header'>
            <h1>Shopping Cart</h1>
            <p>Remove all</p>
          </section>

          <div className='cart-product'>
            <div className='product-cart'>
              <section className='product-image'>
                <img src='https://cdn.dxomark.com/wp-content/uploads/medias/post-125428/Apple-iPhone-14-Pro-Max_FINAL_featured-image-packshot-review-1.jpg' />
              </section>

              <section className='product-title'>
                <p>Iphone 14 Pro</p>
              </section>

              <section className='product-pieces'>
                <button>+</button>
                <p>2</p>
                <button>-</button>
              </section>

              <section className='product-price'>
                <strong>$299</strong>
                <p>remove</p>
              </section>
            </div>
          </div>

          <div className='cart-product'>
            <div className='product-cart'>
              <section className='product-image'>
                <img src='https://m.media-amazon.com/images/I/91cU88oSl8L.jpg' />
              </section>

              <section className='product-title'>
                <p>Iphone 14 Pro</p>
              </section>

              <section className='product-pieces'>
                <button>+</button>
                <p>2</p>
                <button>-</button>
              </section>

              <section className='product-price'>
                <strong>$299</strong>
                <p>remove</p>
              </section>
            </div>
          </div>

          <hr />

          <div className='sub-total'>
            <div className='sub-total-info'>
              <h1>Sub Total</h1>
              <section className='total-items'>
                <p>2 items</p>
                <strong className='price'>$6.18</strong>
              </section>
            </div>

            <button>Checkout</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
