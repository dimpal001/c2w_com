import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { isAuth } from '../../middleware/auth'

const prisma = new PrismaClient()

export async function PUT(request) {
  const { cartItemId, quantity } = await request.json()

  if (!cartItemId || quantity < 1) {
    return NextResponse.json(
      { message: 'Cart Item ID and valid quantity are required' },
      { status: 400 }
    )
  }

  try {
    if (!isAuth(request)) {
      return NextResponse.json(
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    const updatedCartItem = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    })
    return NextResponse.json({ cartItem: updatedCartItem }, { status: 200 })
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
