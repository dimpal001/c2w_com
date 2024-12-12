import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request) {
  const { userId, productId, quantity } = await request.json()

  if (!userId || !productId || quantity < 1) {
    return NextResponse.json(
      { message: 'User ID, Product ID, and valid quantity are required' },
      { status: 400 }
    )
  }

  try {
    const existingCartItem = await prisma.cartItem.findFirst({
      where: { userId, productId },
    })

    if (existingCartItem) {
      return NextResponse.json(
        { message: 'Item is already added' },
        { status: 200 }
      )
    } else {
      const cartItem = await prisma.cartItem.create({
        data: { userId, productId, quantity },
      })
      return NextResponse.json(
        { cartItem, message: 'Item has been added' },
        { status: 201 }
      )
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Server is not responding' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
