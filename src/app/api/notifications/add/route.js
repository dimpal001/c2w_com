import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { isAdmin } from '../../middleware/adminAuth'

const prisma = new PrismaClient()

export async function POST(request) {
  const { userId, title, message, hyperLink } = await request.json()

  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    await prisma.notification.create({
      data: {
        userId,
        title,
        message,
        hyperLink,
      },
    })

    return NextResponse.json(
      { message: 'Notification has been sent to the user.' },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Something went wrong while adding the notification' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
