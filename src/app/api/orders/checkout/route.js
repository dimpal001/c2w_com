/* eslint-disable no-undef */
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()
import Razorpay from 'razorpay'
import { isAuth } from '../../middleware/auth'

export async function POST(request) {
  const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
    key_secret: process.env.NEXT_PUBLIC_RAZORPAY_SECRET,
  })

  try {
    if (!isAuth(request)) {
      return NextResponse.json(
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    const body = await request.json()
    console.log(body)
    const { orderId, finalPrice, discountId, paymentMethod, addressId } = body

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is missing!' },
        { status: 400 }
      )
    }

    if (!finalPrice) {
      return NextResponse.json({ error: 'Amount is missing!' }, { status: 400 })
    }

    if (!paymentMethod) {
      return NextResponse.json(
        { error: 'Payment method is missing!' },
        { status: 400 }
      )
    }

    if (!addressId) {
      return NextResponse.json(
        { error: 'Address is missing!' },
        { status: 400 }
      )
    }

    const updatedOrder = await prisma.orderDetails.update({
      where: { orderId },
      data: {
        orderId,
        addressId,
        finalPrice,
        discountId,
        paymentMethod,
      },
    })

    const order = await razorpay.orders.create({
      amount: parseFloat(finalPrice) * 100,
      currency: 'INR',
      receipt: 'receipt_' + Math.random().toString(36).substring(7),
    })

    return NextResponse.json(
      {
        razorpayOrderId: order.id,
        orderId: updatedOrder.id,
        amount: finalPrice,
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
