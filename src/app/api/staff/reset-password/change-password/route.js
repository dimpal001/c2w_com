import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

const isValidPassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
  return passwordRegex.test(password)
}

export async function POST(request) {
  const { email, otp, password } = await request.json()

  if (!email || !otp || !password) {
    return NextResponse.json(
      { message: 'All fields are required!' },
      { status: 400 }
    )
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json({ message: 'User not found!' }, { status: 400 })
    }

    const userOtp = await prisma.otp.findFirst({ where: { userId: user.id } })
    if (!userOtp) {
      return NextResponse.json({ message: 'OTP not found!' }, { status: 400 })
    }

    const otpExpiryTime = new Date(userOtp.createdAt)
    otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() + 5)
    if (new Date() > otpExpiryTime) {
      return NextResponse.json({ message: 'OTP has expired!' }, { status: 400 })
    }

    // Validate OTP match
    if (userOtp.otp !== otp) {
      return NextResponse.json({ message: 'Incorrect OTP!' }, { status: 400 })
    }

    // Validate password strength
    if (!isValidPassword(password)) {
      return NextResponse.json(
        {
          message:
            'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.',
        },
        { status: 400 }
      )
    }

    // Delete OTP after validation
    await prisma.otp.deleteMany({ where: { userId: user.id } })

    // Hash the new password and update the user
    const hashedPassword = await hash(password, 10)
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    })

    return NextResponse.json(
      { message: 'Password updated successfully!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error during password reset:', error)
    return NextResponse.json(
      { message: 'Something went wrong, please try again!' },
      { status: 500 }
    )
  }
}
