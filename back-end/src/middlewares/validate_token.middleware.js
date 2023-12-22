import { decodeJwt } from './decode_token.js'

export const authRequired = (req, res, next) => {
  const { token } = req.cookies

  if (!token) return res.status(401).json({ message: 'Invalid token' })

  const data = decodeJwt(token)

  if (!data) {
    return res.status(403).json({ message: 'Authorization denied' })
  }

  req.decode = data
  next()
}
