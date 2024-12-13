import { generateOtp } from '@/lib/generateOtp'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

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

    const otp = generateOtp()

    await prisma.otp.create({
      data: {
        userId: user.id,
        otp: otp,
      },
    })

    return NextResponse.json(
      { message: 'OTP has been sent to your registered email address!' },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  }
}
