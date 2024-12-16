/* eslint-disable no-undef */
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function POST(request) {
  const { email, otp } = await request.json()

  const token = request.cookies.get('otp_token')

  if (!token) {
    return NextResponse.json(
      { message: 'Unauthorised access' },
      { status: 401 }
    )
  }

  const decoded = jwt.verify(token.value, process.env.JWT_SECRET)

  const user = await prisma.user.findUnique({ where: { email } })

  const otpRecord = await prisma.otp.findUnique({
    where: { id: decoded.otp },
  })

  if (!otpRecord) {
    return NextResponse.json(
      { message: 'User not found or OTP not generated' },
      { status: 404 }
    )
  }

  const currentTime = new Date()
  if (currentTime > otpRecord.expiresAt) {
    return NextResponse.json({ message: 'OTP has expired' }, { status: 400 })
  }

  if (otp !== otpRecord.code) {
    return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 })
  }

  await prisma.user.update({
    where: { id },
    data: { isLoggedIn: true, isVerified: true },
  })

  try {
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

    await prisma.otp.delete({ where: { id: decoded.otp } })
    await prisma.user.update({
      where: { id: user.id },
      data: { isVerified: true },
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
      maxAge: 60 * 60 * 24 * 14,
    })

    response.cookies.delete('otp_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })

    return response
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Somethin gis wrong, try again!' },
      { status: 500 }
    )
  }
}
