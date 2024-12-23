/* eslint-disable no-undef */
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { isAuth } from '../../middleware/auth'

const prisma = new PrismaClient()

export async function GET(request) {
  const token = request.cookies.get('token')
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  const decoded = jwt.verify(token.value, process.env.JWT_SECRET)

  try {
    if (!isAuth(request)) {
      return NextResponse.json(
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    if (id) {
      const order = await prisma.orderDetails.findUnique({
        where: { id: id },
        include: {
          address: true,
          discount: true,
          user: true,
          orderItems: {
            select: {
              price: true,
              sizeId: true,
              quantity: true,
              product: {
                select: {
                  id: true,
                  title: true,
                  inventory: {
                    select: {
                      id: true,
                      size: true,
                      price: true,
                    },
                  },
                  thumbnailUrl: true,
                  slug: true,
                },
              },
            },
          },
        },
      })

      return NextResponse.json(order, { status: 200 })
    }

    const orders = await prisma.orderDetails.findMany({
      where: { userId: decoded.userId, status: { not: 'INCOMPLETE' } },
      include: {
        address: true,
        discount: true,
        user: true,
        orderItems: {
          select: {
            sizeId: true,
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(orders, { status: 200 })
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  }
}
