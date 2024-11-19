import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request) {
  const { searchParams } = new URL(request.url)

  const styleId = searchParams.get('styleId')

  try {
    console.log(styleId)
    if (!styleId) {
      return NextResponse.json({ message: 'ID is required' }, { status: 404 })
    }

    const productReviews = await prisma.product.findUnique({
      where: { styleId },
      include: {
        productReview: {
          include: {
            user: true,
          },
        },
      },
    })

    return NextResponse.json(productReviews, { status: 200 })
  } catch (error) {
    console.error('Error querying products:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
