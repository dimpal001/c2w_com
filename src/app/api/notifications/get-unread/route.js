// /api/notifications/unread.js
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { isAdmin } from '../../middleware/adminAuth'

const prisma = new PrismaClient()

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const { userId } = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json(
      { message: 'User ID is required' },
      { status: 400 }
    )
  }

  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    const unreadNotifications = await prisma.notification.findMany({
      where: {
        userId,
        isRead: false,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(unreadNotifications, { status: 200 })
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong while fetching unread notifications' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
