import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { isAdmin } from '../../middleware/adminAuth'

const prisma = new PrismaClient()

export async function DELETE(request) {
  const { reviewId } = request.json()

  if (!isAdmin(request)) {
    return NextResponse.json(
      { message: 'Unauthorized access!' },
      { status: 401 }
    )
  }

  if (!reviewId) {
    return NextResponse.json(
      { message: 'Review ID is required' },
      { status: 400 }
    )
  }

  try {
    // Delete the review based on the provided reviewId
    const deletedReview = await prisma.productReview.delete({
      where: { id: reviewId },
    })
    return NextResponse.json(deletedReview, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something is wrong, try again!' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
