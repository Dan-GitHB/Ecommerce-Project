'use client'
import { useState, useEffect } from 'react'
import Style from '../../../../styles/Auth.css'
import axios from 'axios'
const LogIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [storedToken, setStoredToken] = useState('')
  const [userAccount, setUserAccount] = useState([])

  const [errorBoolean, setErrorBoolean] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successBoolean, setSuccessBoolean] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    setStoredToken(localStorage.getItem('token'))
  }, [storedToken])

  const handleEmail = (event) => {
    setEmail(event.target.value)
  }
  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const submitForm = async () => {
    event.preventDefault()
    try {
      const giveData = { email, password }
      const response = await axios.post(
        'http://localhost:8000/auth/login',
        giveData
      )

      localStorage.setItem('userAccount', JSON.stringify(response.data.user))
      localStorage.setItem('token', response.data.token)

      setUserAccount(response.data.user)
      setErrorBoolean(false)
      setSuccessBoolean(true)
      setSuccessMsg('You logged in successfully')

      setTimeout(() => {
        window.location.href = '/'
      }, 1500)
    } catch (error) {
      setErrorBoolean(true)
      setErrorMsg(error.response.data.message)
    }
  }

  const logInWithGoogleAccount = () => {
    localStorage.setItem('userAccount', JSON.stringify('User'))
    localStorage.setItem('token', JSON.stringify('userToken'))

    window.location.href = 'http://localhost:8000/auth/login/google'
    return false
  }

  if (storedToken) {
    axios.defaults.headers.post['Authorization'] = `Bearer ${storedToken}`
  }

  return (
    <div className='log-in-parent'>
      <div className='log-in-content'>
        {errorBoolean && (
          <div className='error-display'>
            <p className='error-header'>{errorMsg}</p>
          </div>
        )}

        {successBoolean && (
          <div className='success-display'>
            <p className='success-header'>{successMsg}</p>
          </div>
        )}

        <div className='form-logic'>
          <form
            className='form-log-in'
            onSubmit={() => {
              submitForm()
            }}
          >
            <h3 className='header-content'>LogIn</h3>

            <input
              type='email'
              className='content-log-in '
              name='email'
              id='email'
              placeholder='Email'
              value={email}
              onChange={handleEmail}
            />

            <input
              type='password'
              className='content-log-in'
              name='password'
              id='password'
              placeholder='Password'
              value={password}
              onChange={handlePassword}
            />

            <button className='btn-log-in' type='submit'>
              LogIn
            </button>

            <p className='have-an-account'>
              Not a member?
              <a href='SignUp' style={{ color: 'red', fontWeight: 400 }}>
                Sign Up Now
              </a>
            </p>

            <a className='btn-google' onClick={logInWithGoogleAccount}>
              <img
                src='https://www.drupal.org/files/issues/2020-01-26/google_logo.png'
                className='sign-with-google'
              />
            </a>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LogIn
