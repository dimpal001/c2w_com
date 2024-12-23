import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { isAdmin } from '../../middleware/adminAuth'
import { compare, hash } from 'bcryptjs'

const prisma = new PrismaClient()

const isValidPassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
  return passwordRegex.test(password)
}

export async function POST(request) {
  const { id, currentPassword, newPassword } = await request.json()

  if (!isAdmin(request)) {
    return NextResponse.json(
      { message: 'Unauthorized access' },
      { status: 400 }
    )
  }

  try {
    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) {
      return NextResponse.json({ message: 'Invalid user' }, { status: 400 })
    }

    const isCurrentPasswordValid = await compare(currentPassword, user.password)

    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { message: 'Current password is incorrect' },
        { status: 400 }
      )
    }
    if (!isValidPassword(newPassword)) {
      return NextResponse.json(
        {
          message:
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long.',
        },
        { status: 400 }
      )
    }

    const hashedNewPassword = await hash(newPassword, 10)

    await prisma.user.update({
      where: { id },
      data: { password: hashedNewPassword },
    })

    return NextResponse.json(
      { message: 'Password updated successfully' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
