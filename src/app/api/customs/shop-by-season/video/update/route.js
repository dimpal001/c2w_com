import { isAdmin } from '@/app/api/middleware/adminAuth'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function PATCH(request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    const { id, videoUrl } = await request.json()

    const shopBySeasonVideo = await prisma.shopBySeason.update({
      where: { id },
      data: { videoUrl },
    })

    return NextResponse.json(
      { message: 'Video has been uploaded.', shopBySeasonVideo },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  }
}
