import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  try {
    let productDetails = []

    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 404 })
    }

    productDetails = await prisma.product.findUnique({
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

    return NextResponse.json(productDetails, { status: 200 })
  } catch (error) {
    console.error('Error querying products:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
