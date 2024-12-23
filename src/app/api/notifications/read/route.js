// /api/notifications/read.js
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { isAdmin } from '../../middleware/adminAuth'

const prisma = new PrismaClient()

export async function PATCH(request) {
  const { notificationId } = await request.json()

  if (!notificationId) {
    return NextResponse.json(
      { message: 'Notification ID is required' },
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

    const updatedNotification = await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    })

    return NextResponse.json(updatedNotification, { status: 200 })
  } catch {
    return NextResponse.json(
      {
        message: 'Something went wrong while marking the notification as read',
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
