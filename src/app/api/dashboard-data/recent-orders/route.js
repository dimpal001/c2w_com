import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { isAdmin } from '../../middleware/adminAuth'

const prisma = new PrismaClient()

// Route to fetch the last 6 orders
export async function GET(request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorized access!' },
        { status: 401 }
      )
    }

    const recentOrders = await prisma.orderDetails.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 6,
      select: {
        id: true,
        orderId: true,
        totalPrice: true,
        status: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    })

    // Transform the data to include full customer name
    const formattedOrders = recentOrders.map((order) => ({
      id: order.id,
      orderId: order.orderId,
      totalPrice: order.totalPrice,
      status: order.status,
      customerName: `${order.user.firstName} ${order.user.lastName}`,
      userId: order.user.id,
    }))

    return NextResponse.json(formattedOrders, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong, please try again.' },
      { status: 500 }
    )
  }
}
