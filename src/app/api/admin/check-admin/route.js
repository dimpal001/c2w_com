import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const token = request.cookies.get('token')

  if (!token) {
    return NextResponse.json(
      { message: 'Access denied, no token provided' },
      { status: 401 }
    )
  }

  try {
    // eslint-disable-next-line no-undef
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET)

    // Check if the role is admin
    if (decoded.role !== 'ADMIN') {
      if (decoded.role !== 'STAFF') {
        return NextResponse.json(
          { message: 'Forbidden: Not an admin' },
          { status: 403 }
        )
      }
    }

    // If everything is valid, grant access
    return NextResponse.json({ message: 'Access granted' }, { status: 200 })
  } catch (error) {
    // Check if the error is because of expired token
    if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json({ message: 'Session expired' }, { status: 401 })
    }

    // For any other errors (e.g., invalid token)
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }
}
