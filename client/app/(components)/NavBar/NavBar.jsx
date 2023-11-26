'use client'
import { useState, useContext, useEffect } from 'react'
import Style from './NavBar.css'
import ecommerceLogo from '../../../public/images/logo-ecommerce.png'

import Link from 'next/link'

const NavBar = () => {
  const [existUser, setExistUser] = useState([])
  const [userName, setUserName] = useState('')

  useEffect(() => {
    setExistUser(localStorage.getItem('userAccount'))
    setUserName(JSON.parse(localStorage.getItem('userAccount'))?.name || '')
  }, [existUser])

  const [showMenu, setShowMenu] = useState(false)

  const handleMouseOver = () => {
    setShowMenu(true)
  }

  const handleMouseOut = () => {
    setShowMenu(false)
  }

  const logOutUser = () => {
    localStorage.removeItem('userAccount')
    localStorage.removeItem('token')

    window.location.href = '/'
  }

  return (
    <div className='navbar-parent'>
      <div className='logo-navbar'>
        <h3>
          E-commerce <i className='fa-solid fa-money-check-dollar'></i>
        </h3>
      </div>

      <div className='navbar-components'>
        <ul>
          <Link href={'/'}>
            <li>Home </li>
          </Link>

          <Link href={'/CategoriesProducts'}>
            <li>Categories</li>
          </Link>

          <Link href={'/WishList'}>
            <li>Wish List</li>
          </Link>

          <Link href={'/Cart'}>
            <li>
              Cart
              <i className='fa-solid fa-cart-shopping'></i>
            </li>
          </Link>
        </ul>
      </div>

      <div className='auth-components'>
        {existUser ? (
          <ul>
            <li>{userName}</li>
            <li
              className='img-user'
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <img src='https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg' />

              {showMenu && (
                <div className='user-menu'>
                  <button onClick={logOutUser}>LogOut</button>
                </div>
              )}
            </li>
          </ul>
        ) : (
          <ul>
            <Link href={'/Auth/SignUp'}>
              <li>SignUp</li>
            </Link>

            <Link href={'/Auth/LogIn'}>
              <li>Log In</li>
            </Link>
          </ul>
        )}
      </div>
    </div>
  )
}

export default NavBar
