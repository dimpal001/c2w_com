/* eslint-disable no-undef */
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request) {
  const { email, otp } = await request.json()

  const user = await prisma.user.findUnique({ where: { email } })

  const otpRecord = await prisma.otp.findFirst({
    where: { userId: user.id },
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

  try {
    await prisma.otp.deleteMany({ where: { userId: user.is } })
    return NextResponse.json(
      {
        message: 'Email verified successfully!',
      },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something is wrong, try again!' },
      { status: 500 }
    )
  }
}
