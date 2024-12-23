import { isAdmin } from '@/app/api/middleware/adminAuth'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
const prisma = new PrismaClient()

export async function DELETE(request) {
  const { id } = await request.json()

  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    const cookies = request.cookies
    const token = cookies.get('token')

    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    await prisma.discount.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Discount deleted' }, { status: 200 })
  } catch {
    return NextResponse.json(
      { message: 'Server is not responding!' },
      { status: 500 }
    )
  }
}
