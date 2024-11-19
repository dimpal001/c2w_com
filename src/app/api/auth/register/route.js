import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { generateOtp } from '@/lib/generateOtp'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request) {
  const { email, password, name } = await request.json()

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

  // Hash the password
  const hashedPassword = await hash(password, 10)

  // Create new user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  })

  // Generate an OTP
  const otpCode = generateOtp()
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000)

  // Save the OTP to the database
  await prisma.otp.create({
    data: {
      userId: user.id,
      code: otpCode,
      expiresAt,
    },
  })

  // Send OTP to user's email

  return NextResponse.json(
    {
      user,
      message:
        'Registration successful, please verify your email with the OTP sent.',
    },
    { status: 201 }
  )
}
