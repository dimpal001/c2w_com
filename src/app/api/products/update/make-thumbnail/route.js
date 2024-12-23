import { isAdmin } from '@/app/api/middleware/adminAuth'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function PATCH(request) {
  const { id, imageUrl } = await request.json()

  if (!isAdmin(request)) {
    return NextResponse.json(
      { message: 'Unauthorised access!' },
      { status: 401 }
    )
  }

  try {
    if (!id) {
      return NextResponse.json({ message: 'ID is required!' }, { status: 400 })
    }

    await prisma.product.update({
      where: { id },
      data: { thumbnailUrl: imageUrl },
    })

    return NextResponse.json(
      { message: 'Thumbnail image has been changed!' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { message: 'Something is wrong, try again!' },
      { status: 500 }
    )
  }
}
