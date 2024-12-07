import { cdnPath } from '@/app/Components/cdnPath'
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
        inventory: true,
        productReview: true,
        images: true,
        similarProducts: true,
        similarTo: true,
        discounts: true,
      },
    })

    if (product) {
      product.ogImage = cdnPath + product.thumbnailUrl
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Something went wrong, please try again.' },
      { status: 500 }
    )
  }
}
