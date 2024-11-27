import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { isAuth } from '@/app/api/middleware/auth'

const prisma = new PrismaClient()

export async function DELETE(request) {
  const { addressId, userId } = request.query

  if (!isAuth(request)) {
    return NextResponse.json(
      { message: 'Unauthorized access!' },
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
    const addressToDelete = await prisma.userAddress.findUnique({
      where: { id: addressId },
    })

    if (!addressToDelete) {
      return NextResponse.json(
        { message: 'Address not found' },
        { status: 404 }
      )
    }

    const isDefaultAddress = addressToDelete.isDefault

    const deletedAddress = await prisma.userAddress.delete({
      where: { id: addressId },
    })

    if (isDefaultAddress) {
      const remainingAddresses = await prisma.userAddress.findMany({
        where: { userId },
        orderBy: { createdAt: 'asc' },
      })

      if (remainingAddresses.length > 0) {
        const firstRemainingAddress = remainingAddresses[0]
        await prisma.userAddress.update({
          where: { id: firstRemainingAddress.id },
          data: { isDefault: true },
        })
      }
    }

    return NextResponse.json(deletedAddress, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
