import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const month = parseInt(searchParams.get('month'), 10)
    const year = parseInt(searchParams.get('year'), 10)

    if (!month || !year) {
      return NextResponse.json(
        { message: 'Month and year are required.' },
        { status: 400 }
      )
    }

    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0, 23, 59, 59)

    // Fetch orders for the given month and year
    const reviews = await prisma.productReview.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        product: {
          select: {
            title: true,
            id: true,
            slug: true,
            thumbnailUrl: true,
          },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            profileUrl: true,
            id: true,
          },
        },
      },
    })

    return NextResponse.json({
      reviews,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Something went wrong, please try again later.' },
      { status: 500 }
    )
  }
}
