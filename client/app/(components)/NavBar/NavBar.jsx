import Style from './NavBar.css'
import ecommerceLogo from '../../../public/images/logo-ecommerce.png'
import Link from 'next/link'
const NavBar = () => {
  return (
    <div className='navbar-parent'>
      <div className='logo-navbar'>
        <h3>
          E-commerce <i className='fa-solid fa-money-check-dollar'></i>{' '}
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
              <i className='fa-solid fa-cart-shopping'>
                <span></span>
              </i>
            </li>
          </Link>

          <Link href={'/Auth/SignUp'}>
            <li>SignUp</li>
          </Link>

          <Link href={'/Auth/LogIn'}>
            <li>Log In</li>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default NavBar
