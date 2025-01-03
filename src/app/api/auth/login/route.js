/* eslint-disable no-undef */
import { generateOtp } from '@/lib/generateOtp'
import { otpEmail } from '@/utils/email/otpEmail'
import { PrismaClient } from '@prisma/client'
import { compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { cartItems: true, wishlist: true, reviews: true },
    })

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    if (user.status === 'BANNED') {
      return NextResponse.json(
        {
          message: 'Your account has been banned! Please contact administrator',
        },
        { status: 400 }
      )
    }

    if (user && user.role !== 'BUYER') {
      return NextResponse.json(
        {
          message: 'Unauthorized access',
        },
        { status: 401 }
      )
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    if (!user.isVerified) {
      const otpCode = generateOtp()

      const otp = await prisma.otp.create({
        data: {
          userId: user.id,
          code: otpCode,
          expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        },
      })

      await otpEmail(email, otpCode)

      const token = jwt.sign(
        { userId: user.id, otp: otp.id },
        process.env.JWT_SECRET,
        {
          expiresIn: '10m',
        }
      )

      const response = NextResponse.json(
        {
          message: 'We have sent an OTP to your registered email address!',
        },
        { status: 301 }
      )

      response.cookies.set('otp_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 10 * 60,
      })

      return response
    }

    const newToken = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '14d' }
    )

    await prisma.user.update({ where: { email }, data: { isLoggedIn: true } })

    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        fullName: user.firstName + ' ' + user.lastName,
        cartItems: user.cartItems,
        wishlistItem: user.wishlist,
        reviews: user.reviews,
      },
    })

    response.cookies.set('token', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
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
