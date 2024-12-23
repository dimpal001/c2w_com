import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { isAuth } from '@/app/api/middleware/auth'

const prisma = new PrismaClient()

export async function POST(request) {
  const { userId, productId } = await request.json()

  try {
    if (!isAuth(request)) {
      return NextResponse.json(
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        userId,
        productId,
      },
    })

    let updatedCartItem

    updatedCartItem = await prisma.cartItem.update({
      where: { id: existingCartItem.id },
      data: { quantity: existingCartItem.quantity + 1 },
    })

    return NextResponse.json(updatedCartItem, { status: 200 })
  } catch {
    return NextResponse.json(
      { message: 'Server is not responding.' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
