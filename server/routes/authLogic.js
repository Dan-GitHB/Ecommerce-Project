import express, { json } from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import passport from 'passport'
import dotenv from 'dotenv'
import { default as GoogleStrategy } from 'passport-google-oauth20'

import { Users } from '../models/User.js'

const router = express.Router()
dotenv.config()

export function verifyToken(req, res, next) {
  let token = ''

  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return res.status(401).json({
      message: 'A problem occur. Make sure you are logged into your account',
    })
  }
  if (token.length < 20) {
    return next()
  }

  try {
    let secretKey = process.env.SECRET_KEY_JWT
    const decodedToken = jwt.verify(token, secretKey)
    req.decodedToken = decodedToken

    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({ message: 'Invalid or expired token' })
  }
}

router.post('/signup', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  try {
    let secretKey = process.env.SECRET_KEY_JWT

    if (!(name, email, password, confirmPassword))
      return res
        .status(400)
        .json({ status: 'error', message: 'Please fill all the fields ' })

    if (name.length < 3)
      return res
        .status(400)
        .json({ message: 'The name must to contain atleast 3 letters' })

    const nameAlreadyExist = await Users.findOne({ name: name })
    const emailAlreadyExist = await Users.findOne({ email: email })

    if (emailAlreadyExist)
      return res.status(409).json({
        status: 'error',
        message:
          'The User already exist with this email . Please go to login page',
      })

    if (nameAlreadyExist)
      return res.status(409).json({
        status: 'error',
        message:
          'The User already exist with this name . Please go to login page',
      })

    if (confirmPassword !== password)
      return res.status(400).json({
        status: 'error',
        message:
          'Please be sure that password and confirmPassword are the same',
      })

    const encryptPassword = await bcrypt.hash(password, 10)
    const encryptConfirmPassword = await bcrypt.hash(password, 10)

    const newUser = new Users({
      name: name,
      email: email,
      password: encryptPassword,
      confirmPassword: encryptConfirmPassword,
    })

    await newUser.save()
    const payloadToken = {
      userId: newUser._id,
      email: newUser.email,
      name: newUser.name,
    }
    let token = jwt.sign(payloadToken, secretKey, { expiresIn: '1h' })

    return res.status(201).json({
      message: 'User was created',
      newUser,
      token,
    })
  } catch (error) {
    console.log(error)
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    let secretKey = process.env.SECRET_KEY_JWT

    const user = await Users.findOne({ email: email })

    if (!user)
      return res.status(401).json({
        message: 'The email or password is not correct. Please try once again',
      })

    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword)
      return res.status(401).json({
        message: 'The email or password is not correct. Please try once again',
      })

    const payloadToken = {
      userId: user._id,
      email: user.email,
      name: user.name,
    }

    let token = jwt.sign(payloadToken, secretKey, { expiresIn: '1h' })

    return res.status(201).json({
      message: 'User here',
      user,
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Invalid token or stuff like that' })
  }
})

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '353905428359-fqpbstf5rmho7me70ne0urh8orpldhhd.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/',
      scope: ['profile'],
    },
    async function verify(accessToken, refreshToken, profile, cb) {
      try {
        let user = await Users.findOne({ googleId: profile.id })

        if (!user) {
          // Dacă utilizatorul nu există, creează-l
          user = new Users({
            name: profile.displayName,
          })
          await user.save()
        }

        const responseToClient = {
          user,
          googleDisplayName: profile.displayName,
        }

        return cb(null, responseToClient)
      } catch (error) {
        return cb(error, null)
      }
    }
  )
)

router.get(
  '/login/google',
  passport.authenticate('google', { scope: ['profile'] })
)

router.get(
  '/oauth2/redirect/google',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/',
    failureRedirect: 'http://localhost:3000/cancel',
  }),
  (req, res) => {
    res.json(req.user)
  }
)

export { router as UsersRoute }
