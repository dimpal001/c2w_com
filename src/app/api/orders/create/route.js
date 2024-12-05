/* eslint-disable no-undef */
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()
import { isAuth } from '../../middleware/auth'

async function generateOrderId() {
  let orderId = 'OI' + Math.floor(Math.random() * 9000000 + 1000000)

  const existingOrder = await prisma.orderDetails.findUnique({
    where: { orderId },
  })

  while (existingOrder) {
    orderId = 'OI' + Math.floor(Math.random() * 9000000 + 1000000)
    await prisma.orderDetails.findUnique({
      where: { orderId },
    })
  }

  return orderId
}

export async function POST(request) {
  try {
    if (!isAuth(request)) {
      return NextResponse.json(
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { userId, totalPrice, orderItems } = body

    if (!userId || !totalPrice || !orderItems || orderItems.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const orderId = await generateOrderId()

    // Reduce stock for each ordered product
    for (const item of orderItems) {
      const inventoryRecord = await prisma.productInventory.findFirst({
        where: {
          productId: item.productId,
          sizeId: item.sizeId,
        },
      })

      if (!inventoryRecord || inventoryRecord.stock < item.quantity) {
        throw new Error(
          `Insufficient stock for product ID: ${item.productId}, size ID: ${item.sizeId}`
        )
      }

      await prisma.productInventory.update({
        where: { id: inventoryRecord.id },
        data: {
          stock: inventoryRecord.stock - item.quantity,
        },
      })
    }

    const newOrder = await prisma.orderDetails.create({
      data: {
        userId,
        orderId,
        totalPrice,
        status: 'INCOMPLETE',
        orderItems: {
          create: orderItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            sizeId: item.sizeId,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    })

    return NextResponse.json(
      {
        orderId: newOrder.orderId,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  }
}
