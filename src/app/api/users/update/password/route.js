import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { isAuth } from '@/app/api/middleware/auth'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function PATCH(request) {
  const { id, currentPassword, password } = await request.json()

  if (!isAuth(request)) {
    return NextResponse.json(
      { message: 'Unauthorised access!' },
      { status: 401 }
    )
  }

  try {
    if (!id) {
      return NextResponse.json({ message: 'ID is required!' }, { status: 400 })
    }

    if (!currentPassword || !password) {
      return NextResponse.json(
        { message: 'Current password and new password are required!' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      return NextResponse.json({ message: 'User not found!' }, { status: 404 })
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    )

    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { message: 'Current password is incorrect!' },
        { status: 400 }
      )
    }

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
    if (!passwordPattern.test(password)) {
      return NextResponse.json(
        {
          message:
            'Password must have at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a symbol.',
        },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        password: hashedPassword,
      },
    })

    return NextResponse.json(
      {
        user: updatedUser,
        message: 'Password updated successfully!',
      },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
