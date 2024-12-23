/* eslint-disable no-undef */
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import jwt, { verify } from 'jsonwebtoken'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

const isValidPassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
  return passwordRegex.test(password)
}

export async function POST(request) {
  try {
    const { password } = await request.json()

    const token = request.cookies.get('change_password_token')

    const decoded = verify(token.value, process.env.JWT_SECRET)

    if (!password) {
      return NextResponse.json(
        { message: 'Password is required' },
        { status: 400 }
      )
    }

    if (!isValidPassword(password)) {
      return NextResponse.json(
        {
          message:
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long.',
        },
        { status: 400 }
      )
    }

    const hashPassword = await hash(password, 10)

    const user = await prisma.user.update({
      where: { id: decoded.userId },
      data: { password: hashPassword, isLoggedIn: true },
      include: {
        wishlist: true,
        cartItems: true,
        reviews: true,
      },
    })

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    const response = NextResponse.json(
      {
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          fullName: user.firstName + ' ' + user.lastName,
          cartItems: user.cartItems,
          wishlistItem: user.wishlist,
          reviews: user.reviews,
        },
      },
      { status: 200 }
    )

    const newToken = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '14d' }
    )

    response.cookies.set('token', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
    })

    return response
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
