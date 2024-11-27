import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { isAuth } from '@/app/api/middleware/auth'

const prisma = new PrismaClient()

// GET route to fetch user address
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const addressId = searchParams.get('addressId')

  if (!isAuth(request)) {
    return NextResponse.json(
      { message: 'Unauthorised access!' },
      { status: 401 }
    )
  }

  if (!userId) {
    return NextResponse.json(
      { message: 'User ID is required' },
      { status: 400 }
    )
  }

  try {
    if (addressId) {
      const userAddress = await prisma.userAddress.findUnique({
        where: { id: addressId },
        include: { user: true },
      })

      if (!userAddress) {
        return NextResponse.json(
          { message: 'Address not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({ address: userAddress }, { status: 200 })
    } else {
      const userAddresses = await prisma.userAddress.findMany({
        where: { userId },
      })

      return NextResponse.json({ addresses: userAddresses }, { status: 200 })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
