import { isAdmin } from '@/app/api/middleware/adminAuth'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function PATCH(request) {
  const { id, title, avatarUrl, videoUrl, hyperLink, price } =
    await request.json()
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    if (!id) {
      return NextResponse.json({ message: 'ID is required!' }, { status: 400 })
    }

    const trendingProduct = await prisma.trending.update({
      where: { id },
      data: {
        title,
        videoUrl,
        avatarUrl,
        hyperLink,
        price,
      },
    })

    return NextResponse.json(
      { message: 'Trending product has been updated.', trendingProduct },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, try again' },
      { status: 500 }
    )
  }
}
