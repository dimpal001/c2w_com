import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { isAuth } from '@/app/api/middleware/auth'

const prisma = new PrismaClient()

export async function PATCH(request) {
  const { id, status } = await request.json()

  if (!isAuth(request)) {
    return NextResponse.json(
      { message: 'Unauthorized access!' },
      { status: 401 }
    )
  }

  try {
    // Update the isActive field for the specified product
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        status,
      },
    })

    return NextResponse.json(
      {
        product: updatedUser,
        message: `User has been ${status}.`,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
