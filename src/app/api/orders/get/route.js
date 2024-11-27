import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { isAuth } from '../../middleware/auth'
import { isAdmin } from '../../middleware/adminAuth'

const prisma = new PrismaClient()

export async function GET(request) {
  const { searchParams } = new URL(request.url)

  const id = searchParams.get('id')
  let page = searchParams.get('page')
  let orderStatus = searchParams.get('orderStatus')

  page = parseInt(page, 10)
  if (isNaN(page) || page < 1) {
    page = 1
  }

  const itemsPerPage = 12
  const skip = (page - 1) * itemsPerPage

  let order
  try {
    if (id) {
      if (!isAuth(request)) {
        return NextResponse.json(
          { message: 'Unauthorized access!' },
          { status: 401 }
        )
      }
      order = await prisma.orderDetails.findUnique({
        where: { orderId: id },
        include: {
          orderItems: { include: { product: true } },
          paymentDetails: true,
        },
      })

      if (!order) {
        return NextResponse.json(
          { message: 'No order found on this ID', orders: [] },
          { status: 200 }
        )
      }
    }

    if (id) {
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
    }

    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorized access!' },
        { status: 401 }
      )
    }

    const where = {}

    if (orderStatus) {
      where.status = orderStatus
    }

    const totalOrders = await prisma.orderDetails.count({
      where: where,
    })

    const totalPages = Math.ceil(totalOrders / itemsPerPage)

    const orders = await prisma.orderDetails.findMany({
      where: where,
      skip,
      take: itemsPerPage,
    })

    // Fetch user details for each order
    const ordersWithUserDetails = await Promise.all(
      orders.map(async (order) => {
        const user = await prisma.user.findUnique({
          where: { id: order.userId },
          select: {
            firstName: true,
            lastName: true,
            id: true,
          },
        })
        return {
          ...order,
          user,
        }
      })
    )

    return NextResponse.json(
      {
        orders: ordersWithUserDetails,
        currentPage: page,
        totalPages,
        totalOrders,
      },
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
