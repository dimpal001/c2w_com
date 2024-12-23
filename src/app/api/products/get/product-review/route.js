import { isAdmin } from '@/app/api/middleware/adminAuth'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request) {
  const { searchParams } = new URL(request.url)

  const styleId = searchParams.get('styleId')
  const id = searchParams.get('id')

  try {
    if (!styleId && !id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 404 })
    }

    let productReviews
    if (styleId) {
      productReviews = await prisma.product.findUnique({
        where: { styleId },
        include: {
          productReview: {
            include: {
              user: true,
            },
          },
        },
      })
    }

    if (id) {
      productReviews = await prisma.product.findUnique({
        where: { id },
        select: {
          id: true,
          productReview: true,
        },
      })
    }

    return NextResponse.json(productReviews, { status: 200 })
  } catch {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorised access' },
        { status: 401 }
      )
    }
    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 })
    }

    await prisma.productReview.delete({ where: { id } })

    return NextResponse.json({ message: 'Review deleted' }, { status: 200 })
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  }
}
