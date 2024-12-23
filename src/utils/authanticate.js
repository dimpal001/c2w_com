/* eslint-disable no-undef */
import jwt from 'jsonwebtoken'

export function authenticate(request) {
  const token = request.cookies.get('token')

  if (!token) {
    return null
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET)
    return decoded
  } catch {
    return null
  }
}
