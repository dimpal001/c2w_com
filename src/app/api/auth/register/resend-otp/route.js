/* eslint-disable no-undef */
import { NextResponse } from 'next/server'
import { generateOtp } from '@/lib/generateOtp'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { otpEmail } from '@/utils/email/otpEmail'

const prisma = new PrismaClient()

export async function POST(request) {
  const { email } = await request.json()

  const user = await prisma.user.findUnique({ where: { email } })

  await prisma.otp.deleteMany({ where: { userId: user.id } })

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
}
