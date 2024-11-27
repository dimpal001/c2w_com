/* eslint-disable no-undef */
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { isAuth } from '../../middleware/auth'

const prisma = new PrismaClient()

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_SECRET,
})

export async function POST(request) {
  try {
    if (!isAuth(request)) {
      return NextResponse.json(
        { message: 'Unauthorized access!' },
        { status: 401 }
      )
    }
    const { orderId, razorpay_order_id, razorpay_payment_id } =
      await request.json()

    if (!orderId || !razorpay_order_id || !razorpay_payment_id) {
      return NextResponse.json(
        {
          message:
            'Order ID, Razorpay order ID, and Razorpay payment ID are required.',
        },
        { status: 400 }
      )
    }

    // Fetch payment details from Razorpay
    const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id)

    if (!paymentDetails || paymentDetails.status !== 'captured') {
      return NextResponse.json(
        { message: 'Payment not captured or invalid payment details.' },
        { status: 400 }
      )
    }

    // Ensure payment matches order amount
    const order = await prisma.orderDetails.findUnique({
      where: { id: orderId },
    })

    if (!order || paymentDetails.amount / 100 !== order.totalPrice) {
      // Razorpay amount is in paise
      return NextResponse.json(
        { message: 'Payment amount does not match the order amount.' },
        { status: 400 }
      )
    }

    // Update order status and add payment details
    const updatedOrder = await prisma.orderDetails.update({
      where: { id: orderId },
      data: { status: 'PENDING' },
    })

    const paymentRecord = await prisma.paymentDetails.create({
      data: {
        orderId,
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
        amount: paymentDetails.amount / 100,
        currency: paymentDetails.currency,
        method: paymentDetails.method,
        bank: paymentDetails.bank,
        wallet: paymentDetails.wallet,
        upi: paymentDetails.vpa,
      },
    })

    return NextResponse.json(
      {
        message: 'Order has been placed successfully.',
        order: updatedOrder,
        paymentDetails: paymentRecord,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Something went wrong, please try again!' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
