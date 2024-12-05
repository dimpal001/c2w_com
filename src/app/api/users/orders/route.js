/* eslint-disable no-undef */
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { isAuth } from '../../middleware/auth'

const prisma = new PrismaClient()

export async function GET(request) {
  const token = request.cookies.get('token')

  const decoded = jwt.verify(token.value, process.env.JWT_SECRET)

  try {
    if (!isAuth(request)) {
      return NextResponse.json(
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    const orders = await prisma.orderDetails.findMany({
      where: { userId: decoded.userId },
      include: {
        address: true,
        discount: true,
        user: true,
        orderItems: true,
      },
    })

    return NextResponse.json(orders, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  }
}
