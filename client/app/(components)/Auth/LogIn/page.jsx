import Style from '../Auth.css'
const LogIn = () => {
  return (
    <div className='log-in-parent'>
      <div className='log-in-content'>
        <form className='form-log-in'>
          <h3 className='header-content'>LogIn</h3>

          <input
            type='email'
            className='content-log-in '
            name='email'
            id='email'
            placeholder='Email'
          />

          <input
            type='password'
            className='content-log-in'
            name='password'
            id='password'
            placeholder='Password'
          />

          <button className='btn-log-in '>LogIn</button>

          <p className='have-an-account'>
            Not a member? <a href='SignUp'>Sign Up Now</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LogIn
