import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { isAuth } from '../../middleware/auth'

const prisma = new PrismaClient()

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json(
      { message: 'User ID is required' },
      { status: 400 }
    )
  }

  try {
    if (!isAuth(request)) {
      return NextResponse.json(
        { message: 'Unauthorized access!' },
        { status: 401 }
      )
    }

    const cartItems = await prisma.cartItem.findMany({
      where: {
        userId,
      },
      include: {
        product: true,
      },
    })

    return NextResponse.json({ cartItems }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
