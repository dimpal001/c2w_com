import { isAdmin } from '@/app/api/middleware/adminAuth'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorized access!' },
        { status: 401 }
      )
    }

    const { title, videoUrl, hyperLink, price, avatarUrl } =
      await request.json()

    const trendingProduct = await prisma.trending.create({
      data: {
        title,
        videoUrl,
        hyperLink,
        price,
        avatarUrl,
      },
    })

    return NextResponse.json(
      { message: 'Trending product has been added.', trendingProduct },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  }
}
