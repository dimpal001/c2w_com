/* eslint-disable no-undef */
import { generateOtp } from '@/lib/generateOtp'
import { otpEmail } from '@/utils/email/otpEmail'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

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
      { status: 200 }
    )

    response.cookies.set('otp_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 10 * 60,
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
