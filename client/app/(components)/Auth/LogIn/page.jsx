'use client'
import { useState, useEffect } from 'react'
import Style from '../Auth.css'
import axios from 'axios'
const LogIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [token, setToken] = useState('')
  const [userAccount, setUserAccount] = useState([])

  const [errorBoolean, setErrorBoolean] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

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
        giveData,
        {
          headers: {
            Authorization: 'Bearer   ',
          },
        }
      )

      localStorage.setItem('token', response.data.token)

      localStorage.setItem('userAccount', JSON.stringify(response.data.user))

      setToken(response.data.token)
      setUserAccount(response.data.user)
      window.location.href = '/'
    } catch (error) {
      setErrorBoolean(true)
      setErrorMsg(error.response.data.message)
    }
  }

  if (token !== undefined && token !== '' && token !== null) {
    axios.defaults.headers.post['Authorization'] = `Bearer ${token}`
  }

  return (
    <div className='log-in-parent'>
      <div className='log-in-content'>
        {errorBoolean && (
          <div className='error-display'>
            <p className='error-header'>{errorMsg}</p>
          </div>
        )}
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
        </form>
      </div>
    </div>
  )
}

export default LogIn
