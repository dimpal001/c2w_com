import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { isAuth } from '../../middleware/auth'

const prisma = new PrismaClient()

export async function GET(request) {
  const { searchParams } = new URL(request.url)

  const productId = searchParams.get('productId')

  if (!isAuth(request)) {
    return NextResponse.json(
      { message: 'Unauthorised access!' },
      { status: 401 }
    )
  }

  if (!productId) {
    return NextResponse.json(
      { message: 'Product ID is required' },
      { status: 400 }
    )
  }

  try {
    // Fetch product reviews based on productId
    const reviews = await prisma.productReview.findMany({
      where: { productId },
      include: {
        user: true,
      },
    })
    return NextResponse.json(reviews, { status: 200 })
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
