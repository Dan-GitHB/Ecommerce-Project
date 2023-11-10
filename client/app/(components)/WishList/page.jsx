'use client'
import Style from './WishList.css'
import { useContext } from 'react'
import { PropsContext } from '@/app/actions/consumProps'

const WishList = () => {
  const { product, setProduct } = useContext(PropsContext)

  const removeProductFromWishList = (productId) => {
    const updatedProducts = product.filter(
      (item) => item && item._id === productId
    )
    setProduct(updatedProducts)
  }

  console.log(product)

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

        {product && product.length > 0
          ? product.map((item) =>
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
                      <p>Added on: {item.addedDate}</p>
                      <button>Add to Cart</button>
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
