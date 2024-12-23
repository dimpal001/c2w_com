import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { isAdmin } from '../../middleware/adminAuth'

const prisma = new PrismaClient()

export async function GET(request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    const totalOrders = await prisma.orderDetails.count()
    const totalProducts = await prisma.product.count()
    const totalRevenue = await prisma.orderDetails.aggregate({
      _sum: {
        totalPrice: true,
      },
      where: { status: 'DELIVERED' },
    })
    const totalCustomers = await prisma.user.count({
      where: {
        role: 'BUYER',
      },
    })

    const status = {
      totalOrders,
      totalProducts,
      totalRevenue: totalRevenue._sum.totalPrice || 0,
      totalCustomers,
    }

    return NextResponse.json({ status: status }, { status: 200 })
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, please try again.' },
      { status: 500 }
    )
  }
}
