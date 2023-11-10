import Style from './Categories.css'

const page = () => {
  return (
    <div className='parent-categories'>
      <div className='categories-logic'>
        <div className='categories-header'>
          <h1>All Products</h1>
        </div>

        <div className='categories-buttons'>
          <form action='' className='form-categories'>
            <section className='type-products field'>
              <label htmlFor='category'>Type:</label>
              <select name='category' className='category-product'>
                <option value='all-products'>All</option>
                <option value='phones'>Phones</option>
                <option value='laptops'>Laptops</option>
                <option value='airpods'>AirPods</option>
                <option value='monitors'>Monitors</option>
                <option value='pc'>PCs</option>
              </select>
            </section>

            <section className='price-products field'>
              <label htmlFor='category'>Price:</label>
              <select name='category' className='category-product'>
                <option value=''>None</option>
                <option value='below-1k'>Below $1000</option>
                <option value='above-1k'>Above $1000</option>
                <option value='above-1.5k'>Above $1500</option>
              </select>
            </section>

            <section className='review-category field'>
              <label htmlFor='reviews'>Sort:</label>
              <select name='reviews' className='category-product'>
                <option value=''>None</option>
                <option value='best-reviews'>Best Reviews</option>
                <option value='most-reviews'>Most Reviews</option>
                <option value='bad-reviews'>Bad Reviews</option>
              </select>
            </section>
          </form>
        </div>
      </div>

      <div className='products-parent'>
        <div className='product'>
          <div className='bg-image-products-category'>
            <span className='add-to-buy'>
              <i className='fa-solid fa-heart'></i>
            </span>

            <div className='image'>
              <img
                src='https://cdn.mos.cms.futurecdn.net/ypPU5BkLx6jYmawjkhpeNE.png'
                className='image-product'
              />
            </div>
          </div>

          <h4 className='name-product'>Mackbook 14 Pro</h4>

          <div className='price-buy'>
            <strong className='price'>$899</strong>
            <button className='add-to-cart'>Add to Cart</button>
          </div>
        </div>

        <div className='product'>
          <div className='bg-image-products-category'>
            <span className='add-to-buy'>
              <i className='fa-solid fa-heart'></i>
            </span>

            <div className='image'>
              <img
                src='https://www.macworld.com/wp-content/uploads/2023/01/apple-airpods-pro-100815758-orig.jpg?quality=50&strip=all'
                className='image-product'
              />
            </div>
          </div>

          <h4 className='name-product'>AirPods Pro</h4>

          <div className='price-buy'>
            <strong className='price'>$899</strong>
            <button className='add-to-cart'>Add to Cart</button>
          </div>
        </div>

        <div className='product'>
          <div className='bg-image-products-category'>
            <span className='add-to-buy'>
              <i className='fa-solid fa-heart'></i>
            </span>

            <div className='image'>
              <img
                src='https://cdn.dxomark.com/wp-content/uploads/medias/post-125428/Apple-iPhone-14-Pro-Max_FINAL_featured-image-packshot-review-1.jpg'
                className='image-product'
              />
            </div>
          </div>

          <h4 className='name-product'>Iphone 14 Pro</h4>

          <div className='price-buy'>
            <strong className='price'>$899</strong>
            <button className='add-to-cart'>Add to Cart</button>
          </div>
        </div>

        <div className='product'>
          <div className='bg-image-products-category'>
            <span className='add-to-buy'>
              <i className='fa-solid fa-heart'></i>
            </span>

            <div className='image'>
              <img
                src='https://m.media-amazon.com/images/I/91cU88oSl8L.jpg'
                className='image-product'
              />
            </div>
          </div>

          <h4 className='name-product'>Mackbook 14 Pro</h4>

          <div className='price-buy'>
            <strong className='price'>$899</strong>
            <button className='add-to-cart'>Add to Cart</button>
          </div>
        </div>

        <div className='product'>
          <div className='bg-image-products-category'>
            <span className='add-to-buy'>
              <i className='fa-solid fa-heart'></i>
            </span>

            <div className='image'>
              <img
                src='https://m.media-amazon.com/images/I/615CE5wL-tL.jpg'
                className='image-product'
              />
            </div>
          </div>

          <h4 className='name-product'>Mackbook 14 Pro</h4>

          <div className='price-buy'>
            <strong className='price'>$899</strong>
            <button className='add-to-cart'>Add to Cart</button>
          </div>
        </div>

        <div className='product'>
          <div className='bg-image-products-category'>
            <span className='add-to-buy'>
              <i className='fa-solid fa-heart'></i>
            </span>

            <div className='image'>
              <img
                src='https://pngimg.com/d/keyboard_PNG101843.png'
                className='image-product'
              />
            </div>
          </div>

          <h4 className='name-product'>Mackbook 14 Pro</h4>

          <div className='price-buy'>
            <strong className='price'>$899</strong>
            <button className='add-to-cart'>Add to Cart</button>
          </div>
        </div>

        <div className='product'>
          <div className='bg-image-products-category'>
            <span className='add-to-buy'>
              <i className='fa-solid fa-heart'></i>
            </span>

            <div className='image'>
              <img
                src='https://m.media-amazon.com/images/I/81fypNGG2uL._AC_UF1000,1000_QL80_.jpg'
                className='image-product'
              />
            </div>
          </div>

          <h4 className='name-product'>Mackbook 14 Pro</h4>

          <div className='price-buy'>
            <strong className='price'>$899</strong>
            <button className='add-to-cart'>Add to Cart</button>
          </div>
        </div>

        <div className='product'>
          <div className='bg-image-products-category'>
            <span className='add-to-buy'>
              <i className='fa-solid fa-heart'></i>
            </span>

            <div className='image'>
              <img
                src='https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/ampere/rtx-3060-ti/Delta-Rtx-3060-Gaming-PC-kw-2.png'
                className='image-product'
              />
            </div>
          </div>

          <h4 className='name-product'>Mackbook 14 Pro</h4>

          <div className='price-buy'>
            <strong className='price'>$899</strong>
            <button className='add-to-cart'>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
