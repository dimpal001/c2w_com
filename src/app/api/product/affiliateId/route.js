import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request) {
  const { searchParams } = new URL(request.url)

  const affiliateId = searchParams.get('affiliateId')

  try {
    let product = await prisma.product.findUnique({
      where: { affiliateId },
      include: {
        inventory: {
          select: {
            id: true,
            mrp: true,
            price: true,
            discount: true,
            stock: true,
            minQuantity: true,
            size: true,
          },
        },
        productReview: true,
        images: {
          select: {
            imageUrl: true,
            color: true,
            colorId: true,
          },
        },
        similarProducts: true,
        similarTo: true,
        discounts: true,
      },
    })

    return NextResponse.json(product)
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, please try again.' },
      { status: 500 }
    )
  }
}
