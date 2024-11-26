/* eslint-disable no-undef */
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()
import Razorpay from 'razorpay'
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
  const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
    key_secret: process.env.NEXT_PUBLIC_RAZORPAY_SECRET,
  })

  try {
    if (!isAuth(request)) {
      return NextResponse.json(
        { message: 'Unauthorized access!' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { userId, totalPrice, orderItems, discountId, paymentMethod } = body

    if (!userId || !totalPrice || !orderItems || orderItems.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const orderId = await generateOrderId()

    const newOrder = await prisma.orderDetails.create({
      data: {
        userId,
        orderId,
        totalPrice,
        status: 'INCOMPLETE',
        discountId,
        paymentMethod,
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

    // Reduce stock for each ordered product
    for (const item of orderItems) {
      const product = await prisma.productInventory.findUnique({
        where: { productId: item.productId },
      })

      if (!product || product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product ID: ${item.productId}`)
      }

      await prisma.productInventory.update({
        where: { productId: item.productId },
        data: {
          stock: product.stock - item.quantity,
        },
      })
    }

    const order = await razorpay.orders.create({
      amount: parseFloat(totalPrice) * 100,
      currency: 'INR',
      receipt: 'receipt_' + Math.random().toString(36).substring(7),
    })

    return NextResponse.json(
      {
        razorpayOrderId: order.id,
        orderId: newOrder.id,
        amount: totalPrice,
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
