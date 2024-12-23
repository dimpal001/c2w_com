import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  try {
    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 404 })
    }

    // Fetch product details
    const productDetails = await prisma.product.findUnique({
      where: { id },
      include: {
        categories: true,
        subcategories: true,
        inventory: {
          include: {
            size: {
              select: {
                id: true,
                slug: true,
                name: true,
              },
            },
          },
        },
        images: {
          include: {
            color: {
              select: {
                code: true,
              },
            },
          },
        },
        similarProducts: {
          include: {
            categories: true,
            inventory: {
              include: {
                size: {
                  select: {
                    id: true,
                    slug: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
        discounts: true,
        productReview: {
          include: {
            user: true,
          },
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        _count: {
          select: {
            cartItems: true,
            wishlistItems: true,
            orderItems: true,
          },
        },
      },
    })

    // If the product is not found, return a 404 response
    if (!productDetails) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      )
    }

    // Fetch sizeChart data if sizeChartId exists
    let sizeChartData = null
    if (productDetails.sizeChartId) {
      sizeChartData = await prisma.sizeChart.findUnique({
        where: { id: productDetails.sizeChartId },
        select: {
          id: true,
          title: true,
          imageUrl: true,
        },
      })
    }

    // Return the product details and sizeChart data together
    return NextResponse.json(
      { ...productDetails, sizeChart: sizeChartData },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
