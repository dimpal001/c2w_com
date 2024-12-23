import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { isAuth } from '../../middleware/auth'

const prisma = new PrismaClient()

export async function PUT(request) {
  const { cartItemId, mode = 'increase' } = await request.json()

  if (!cartItemId) {
    return NextResponse.json(
      { message: 'Cart Item ID is required!' },
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

    // Fetch the current cart item to check its quantity
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
    })

    if (!cartItem) {
      return NextResponse.json(
        { message: 'Cart Item not found!' },
        { status: 404 }
      )
    }

    let newQuantity = cartItem.quantity
    if (mode === 'increase') {
      newQuantity += 1
    } else if (mode === 'decrease') {
      newQuantity = Math.max(1, newQuantity - 1)
    } else {
      return NextResponse.json(
        { message: 'Invalid mode! Use "increase" or "decrease".' },
        { status: 400 }
      )
    }

    const updatedCartItem = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: newQuantity },
    })

    return NextResponse.json({ cartItem: updatedCartItem }, { status: 200 })
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
