import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { isAuth } from '../../middleware/auth'

const prisma = new PrismaClient()

export async function POST(request) {
  const { userId, productId, rating, review, images } = await request.json()

  if (!isAuth(request)) {
    return NextResponse.json(
      { message: 'Unauthorised access!' },
      { status: 401 }
    )
  }

  if (!userId || !productId || !rating) {
    return NextResponse.json(
      { message: 'User ID, Product ID, and Rating are required' },
      { status: 400 }
    )
  }

  if (rating > 5) {
    return NextResponse.json(
      { message: 'Rating is not valid' },
      { status: 400 }
    )
  }

  if (review && review.length > 600) {
    return NextResponse.json({ message: 'Review is too long' }, { status: 400 })
  }

  if (images && images.length > 3) {
    return NextResponse.json(
      { message: 'You can upload up to 3 images only' },
      { status: 400 }
    )
  }

  try {
    const newReview = await prisma.productReview.create({
      data: {
        userId,
        productId,
        rating,
        review,
        images: images || [],
      },
    })

    return NextResponse.json(
      { newReview, message: 'Review submitted.' },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
