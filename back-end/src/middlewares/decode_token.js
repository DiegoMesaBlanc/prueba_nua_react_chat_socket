import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const decodeJwt = (token) => {
  return jwt.verify(token, TOKEN_SECRET, (err, decode) => {
    if (err) {
      return false
    }

    return decode
  })
}
