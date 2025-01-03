/* eslint-disable no-undef */
import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { generateOtp } from '@/lib/generateOtp'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { otpEmail } from '@/utils/email/otpEmail'

const prisma = new PrismaClient()

const isValidPassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
  return passwordRegex.test(password)
}

export async function POST(request) {
  const { email, password } = await request.json()

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return NextResponse.json(
      { message: 'User already exists' },
      { status: 409 }
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

  const hashedPassword = await hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  })

  // Generate an OTP
  const otpCode = generateOtp()
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000)

  // Save the OTP to the database
  const otp = await prisma.otp.create({
    data: {
      userId: user.id,
      code: otpCode,
      expiresAt,
    },
  })

  const token = jwt.sign(
    { userId: user.id, otp: otp.id },
    process.env.JWT_SECRET,
    {
      expiresIn: '10m',
    }
  )

  await otpEmail(email, otpCode)

  const response = NextResponse.json(
    {
      message: 'We have sent an OTP to your registered email address!',
    },
    { status: 200 }
  )

  response.cookies.set('otp_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 10 * 60,
  })

  return response
}
