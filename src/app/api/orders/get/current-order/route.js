import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { isAuth } from '../../../middleware/auth'

const prisma = new PrismaClient()

export async function GET(request) {
  const { searchParams } = new URL(request.url)

  const id = searchParams.get('id')
  const userId = searchParams.get('userId')

  try {
    if (!isAuth(request)) {
      return NextResponse.json(
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    if (!id || !userId) {
      return NextResponse.json(
        { message: 'Credentials are missing.' },
        { status: 400 }
      )
    }

    const order = await prisma.orderDetails.findUnique({
      where: { orderId: id, userId: userId },
      include: {
        orderItems: { include: { product: true } },
        paymentDetails: true,
      },
    })

    const user = await prisma.user.findUnique({
      where: { id: order.userId },
      select: {
        firstName: true,
        lastName: true,
        email: true,
      },
    })
    const orderWithUserDetails = {
      ...order,
      user,
    }

    return NextResponse.json(
      { orders: [orderWithUserDetails] },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error querying products:', error)
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  }
}