import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { isAuth } from '@/app/api/middleware/auth'

const prisma = new PrismaClient()

export async function PATCH(request) {
  const { addressId, userId } = await request.json()

  if (!isAuth(request)) {
    return NextResponse.json(
      { message: 'Unauthorised access!' },
      { status: 401 }
    )
  }

  if (!addressId || !userId) {
    return NextResponse.json(
      { message: 'Address ID and User ID are required' },
      { status: 400 }
    )
  }

  try {
    await prisma.userAddress.updateMany({
      where: { userId, isDefault: true },
      data: { isDefault: false },
    })

    const updatedAddress = await prisma.userAddress.update({
      where: { id: addressId },
      data: { isDefault: true },
    })

    return NextResponse.json(updatedAddress, { status: 200 })
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
