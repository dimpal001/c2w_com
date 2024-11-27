// /api/notifications/get.js
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

    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(notifications, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Something went wrong while fetching notifications' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
