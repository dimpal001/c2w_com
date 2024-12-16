/* eslint-disable no-undef */
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function POST(request) {
  const token = request.cookies.get('full_name_token')
  const { email, firstName, lastName } = await request.json()

  console.log(token)

  if (!token) {
    return NextResponse.json(
      { message: 'Unauthorised access!.' },
      { status: 401 }
    )
  }

  try {
    const user = await prisma.user.update({
      where: { email },
      data: { firstName, lastName, isLoggedIn: true },
      include: { cartItems: true, wishlist: true, reviews: true },
    })

    const response = NextResponse.json({
      message: 'Your name has been updated',
      user: {
        id: user.id,
        email: user.email,
        fullName: user.firstName + ' ' + user.lastName,
        cartItems: user.cartItems,
        wishlistItem: user.wishlist,
        reviews: user.reviews,
      },
    })

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '14d' }
    )

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
    })

    return response
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Invalid or expired token.' },
      { status: 500 }
    )
  }
}
