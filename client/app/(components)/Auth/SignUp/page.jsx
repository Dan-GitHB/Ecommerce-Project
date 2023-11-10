import Style from '../Auth.css'

const SignUp = () => {
  return (
    <div className='sign-up-parent'>
      <div className='sing-up-content'>
        <form className='form-sign-up'>
          <h3 className='header-content'>Register</h3>

          <input
            type='text'
            className='content-sign-up name-sign-up'
            name='name'
            id='name'
            placeholder='Name'
          />

          <input
            type='email'
            className='content-sign-up email-sign-up'
            name='email'
            id='email'
            placeholder='Email'
          />

          <input
            type='password'
            className='content-sign-up password-sign-up'
            name='password'
            id='password'
            placeholder='Password'
          />

          <input
            type='password'
            className='content-sign-up'
            name='confirm-password'
            id='confirm-password'
            placeholder='Confirm Password'
          />

          <button className='btn-signup' type='submit'>
            Sign Up
          </button>

          <p className='have-an-account'>
            Have an Account? <a href='LogIn'>Login Here</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignUp
