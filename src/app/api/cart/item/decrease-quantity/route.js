import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { isAuth } from '@/app/api/middleware/auth'

const prisma = new PrismaClient()

export async function POST(request) {
  const { userId, productId } = await request.json()

  try {
    if (!isAuth(request)) {
      return NextResponse.json(
        { message: 'Unauthorized access!' },
        { status: 401 }
      )
    }

    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        userId: userId,
        productId: productId,
      },
    })

    if (!existingCartItem) {
      return NextResponse.json(
        { message: 'Item not found in cart' },
        { status: 404 }
      )
    }

    let updatedCartItem

    if (existingCartItem.quantity > 1) {
      updatedCartItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity - 1 },
      })
    } else {
      await prisma.cartItem.delete({
        where: { id: existingCartItem.id },
      })
      updatedCartItem = { message: 'Item removed from cart' }
    }

    return NextResponse.json(updatedCartItem, { status: 200 })
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
