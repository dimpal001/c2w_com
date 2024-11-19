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
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ message: 'Admin not found' }, { status: 404 })
    }

    if (user.status === 'BANNED') {
      return NextResponse.json(
        {
          message: 'Your account has been banned! Please contact administrator',
        },
        { status: 400 }
      )
    }
    if (user.isVerified === false) {
      return NextResponse.json(
        {
          message: 'We have sent an OTP to your registered email address!',
        },
        { status: 301 }
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

    // Verify the password using bcrypt
    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Return success response
    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })

    // Create a JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      // eslint-disable-next-line no-undef
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    response.cookies.set('token', token, {
      httpOnly: true,
      // eslint-disable-next-line no-undef
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
    })

    return response
  } catch (error) {
    console.error('Error during admin login:', error)
    return NextResponse.json(
      { message: 'Something is wrong, try again!' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
