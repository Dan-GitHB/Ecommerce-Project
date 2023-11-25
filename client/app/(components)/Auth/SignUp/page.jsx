'use client'
import { useState } from 'react'
import Style from '../Auth.css'
import axios from 'axios'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorBoolean, setErrorBoolean] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successBoolean, setSuccessBoolean] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  const handleName = () => {
    setName(event.target.value)
  }

  const handleEmail = () => {
    setEmail(event.target.value)
  }

  const handlePassword = () => {
    setPassword(event.target.value)
  }

  const handleConfirmPassword = () => {
    setConfirmPassword(event.target.value)
  }

  const handleSubmit = async () => {
    event.preventDefault()
    try {
      const giveData = {
        name,
        email,
        password,
        confirmPassword,
      }
      const response = await axios.post(
        'http://localhost:8000/auth/signup',
        giveData
      )

      setErrorBoolean(false)
      setSuccessBoolean(true)
      setSuccessMsg('The account was created successfully')

      setTimeout(() => {
        window.location.href = '/Auth/LogIn'
      }, 1500)
    } catch (error) {
      setErrorBoolean(true)
      setErrorMsg(error.response.data.message)
    }
  }

  return (
    <div className='sign-up-parent'>
      <div className='sing-up-content'>
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

        <form className='form-sign-up' onSubmit={handleSubmit}>
          <h3 className='header-content'>Register</h3>

          <input
            type='text'
            className='content-sign-up name-sign-up'
            name='name'
            id='name'
            placeholder='Name'
            value={name}
            onChange={handleName}
          />

          <input
            type='email'
            className='content-sign-up email-sign-up'
            name='email'
            id='email'
            placeholder='Email'
            required
            value={email}
            onChange={handleEmail}
          />

          <input
            type='password'
            className='content-sign-up password-sign-up'
            name='password'
            id='password'
            placeholder='Password'
            value={password}
            onChange={handlePassword}
          />

          <input
            type='password'
            className='content-sign-up'
            name='confirm-password'
            id='confirm-password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={handleConfirmPassword}
          />

          <button className='btn-signup'>Sign Up</button>

          <p className='have-an-account'>
            Have an Account?{' '}
            <a href='LogIn' style={{ color: 'red', fontWeight: 400 }}>
              Login Here
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignUp
