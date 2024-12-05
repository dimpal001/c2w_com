/* eslint-disable no-undef */
import { isAuth } from '@/app/api/middleware/auth'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    if (!isAuth(request)) {
      return NextResponse.json(
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }
    const { couponCode, orderDetailsId, userId } = await request.json()

    // Validate input
    if (!couponCode || !orderDetailsId || !userId) {
      return NextResponse.json(
        {
          message: 'Missing coupon code',
        },
        { status: 400 }
      )
    }

    // Fetch order details
    const order = await prisma.orderDetails.findUnique({
      where: { id: orderDetailsId },
      include: { discount: true },
    })

    if (!order) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 })
    }

    if (order.userId !== userId) {
      return NextResponse.json(
        { message: 'Unauthorized access to this order' },
        { status: 403 }
      )
    }

    if (order.discount) {
      return NextResponse.json(
        { message: 'A discount is already applied to this order' },
        { status: 400 }
      )
    }

    // Fetch discount details
    const discount = await prisma.discount.findUnique({
      where: { code: couponCode },
    })

    if (!discount || !discount.isActive) {
      return NextResponse.json(
        { message: 'Invalid or inactive coupon code' },
        { status: 404 }
      )
    }

    // Validate discount conditions
    if (discount.minPrice && order.totalPrice < discount.minPrice) {
      return NextResponse.json(
        {
          message: `Order total must be at least ₹${discount.minPrice} to apply this coupon`,
        },
        { status: 400 }
      )
    }

    if (discount.maxPrice && order.totalPrice > discount.maxPrice) {
      return NextResponse.json(
        {
          message: `Order total must not exceed ${discount.maxPrice} to apply this coupon`,
        },
        { status: 400 }
      )
    }

    if (discount.isSpecial && !discount.userEmails.includes(userId)) {
      return NextResponse.json(
        {
          message: `You are not eligible for this discount!`,
        },
        { status: 400 }
      )
    }

    const completedOrdersCount = await prisma.orderDetails.count({
      where: {
        userId,
        status: 'DELIVERED',
      },
    })

    // Check if the discount has an `orders` value and validate it
    if (discount.orders && completedOrdersCount + 1 !== discount.orders) {
      return NextResponse.json(
        {
          message: `This discount is only available for your ${
            discount.orders === 1
              ? 'first'
              : `${discount.orders}${
                  ['th', 'st', 'nd', 'rd'][(discount.orders % 10) - 1] || 'th'
                }`
          } order!`,
        },
        { status: 400 }
      )
    }

    // Calculate discount amount
    const discountAmount =
      discount.type === 'PERCENTAGE'
        ? (order.totalPrice * discount.amount) / 100
        : Math.min(discount.amount, order.totalPrice)

    return NextResponse.json(
      {
        message: 'Coupon applied successfully',
        discountAmount,
        newTotalPrice: order.totalPrice - discountAmount,
        discount,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error applying coupon:', error)
    return NextResponse.json(
      { message: 'An error occurred while applying the coupon' },
      { status: 500 }
    )
  }
}
