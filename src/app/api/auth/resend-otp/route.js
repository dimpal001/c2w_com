/* eslint-disable no-undef */
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { generateOtp } from '@/lib/generateOtp'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function POST(request) {
  const { email } = await request.json()
  try {
    if (!email) {
      return NextResponse.json(
        { message: 'Email is required!' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({ where: { email } })

    const otpCode = generateOtp()
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000)

    await prisma.otp.deleteMany({ where: { userId: user.id } })

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
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  }
}
