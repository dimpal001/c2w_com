import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { isAuth } from '../../middleware/auth'

const prisma = new PrismaClient()

export async function DELETE(request) {
  const { cartItemId } = await request.json()

  if (!cartItemId) {
    return NextResponse.json(
      { message: 'Cart Item ID is required' },
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

    await prisma.cartItem.delete({
      where: { id: cartItemId },
    })
    return NextResponse.json(
      { message: 'Cart item removed successfully' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
