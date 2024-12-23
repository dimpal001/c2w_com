/* eslint-disable no-undef */
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

import { isAuth } from '../../middleware/auth'

export async function POST(request) {
  try {
    if (!isAuth(request)) {
      return NextResponse.json(
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    const body = await request.json()
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

    await prisma.orderDetails.update({
      where: { orderId },
      data: {
        orderId,
        addressId,
        finalPrice,
        discountId,
        status: 'PENDING',
        paymentMethod,
      },
    })

    return NextResponse.json(
      {
        message: 'Order has been placed',
      },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  }
}
