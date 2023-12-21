import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import { createAccessToken } from '../libs/jwt.js'

export const login = async (req, res) => {
  const { password, email } = req.body

  try {
    const userFound = await User.findOne({ email })

    if (!userFound) return res.status(400).json({ message: 'User not found' })

    const passFound = await bcrypt.compare(password, userFound.password)

    if (!passFound) {
      return res.status(400).json({ message: 'User or password incorrect ' })
    }

    const token = await createAccessToken({ id: userFound._id })

    res.cookie('token', token)
    res.json(userFound)
  } catch (error) {
    console.log(error)
  }
}

export const register = async (req, res) => {
  const { username, password, email } = req.body

  try {
    const passHash = await bcrypt.hash(password, 10)

    const newUser = new User({
      username,
      email,
      password: passHash
    })

    const userSaved = await newUser.save()
    const token = await createAccessToken({ id: userSaved._id })

    res.cookie('token', token)
    res.json(userSaved)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const logout = (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0)
  })

  return res.sendStatus(200)
}

export const profile = async (req, res) => {
  const userFound = await User.findById(req.decode.id)

  if (!userFound) res.status(400).json({ message: 'User not found' })

  return res.json(userFound)
}
