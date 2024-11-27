// /api/notifications/delete.js
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { isAdmin } from '../../middleware/adminAuth'

const prisma = new PrismaClient()

export async function DELETE(request) {
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

    await prisma.notification.delete({
      where: { id: notificationId },
    })

    return NextResponse.json(
      { message: 'Notification deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Something went wrong while deleting the notification' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
