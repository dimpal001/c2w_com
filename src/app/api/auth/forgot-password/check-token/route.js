/* eslint-disable no-undef */
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function POST(request) {
  const token = request.cookies.get('change_password_token')

  if (!token) {
    return NextResponse.json(
      { message: 'Token not provided or invalid.' },
      { status: 401 }
    )
  }

  try {
    jwt.verify(token.value, process.env.JWT_SECRET)

    return NextResponse.json(
      {
        message: 'Token is valid',
      },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { message: 'Invalid or expired token.' },
      { status: 401 }
    )
  }
}
