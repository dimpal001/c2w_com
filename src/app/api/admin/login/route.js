import { PrismaClient } from '@prisma/client'
import { compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    // Get the JSON data from the incoming request
    const { email, password } = await request.json()

    // Validate the input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: { UserPrivilege: { select: { privilege: true } } },
    })

    if (!user) {
      return NextResponse.json({ message: 'Admin not found' }, { status: 404 })
    }

    if (user.role !== 'ADMIN') {
      if (user.role !== 'STAFF') {
        return NextResponse.json(
          { message: 'Unauthorised access!' },
          { status: 401 }
        )
      }
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
        firstName: user.firstName,
        mobileNumber: user.mobileNumber,
        lastName: user.lastName,
        role: user.role,
        privileges: user.UserPrivilege,
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
      { message: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
