import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const shopBySeasonVideo = await prisma.shopBySeason.findMany({
      include: {
        products: true,
      },
    })

    return NextResponse.json(shopBySeasonVideo, { status: 200 })
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  }
}
