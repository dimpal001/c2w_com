import { isAdmin } from '@/app/api/middleware/adminAuth'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    const { seasonId, imageUrl, hyperLink, description } = await request.json()

    const shopBySeasonProduct = await prisma.shopBySeasonProduct.create({
      data: {
        seasonId,
        imageUrl,
        hyperLink,
        description,
      },
    })

    return NextResponse.json(
      {
        message: 'Product has been added to the Shop by Season category.',
        shopBySeasonProduct,
      },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  }
}
