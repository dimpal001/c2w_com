import { isAdmin } from '@/app/api/middleware/adminAuth'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function DELETE(request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ message: 'ID is required.' }, { status: 400 })
    }

    const showcase = await prisma.showcases.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Showcase deleted successfully.', showcase },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { message: 'An error occurred while deleting the showcase.' },
      { status: 500 }
    )
  }
}
