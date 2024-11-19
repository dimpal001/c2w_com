import { isAdmin } from '@/app/api/middleware/adminAuth'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function DELETE(request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorized access!' },
        { status: 401 }
      )
    }

    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ message: 'ID is required.' }, { status: 400 })
    }

    const heroSlider = await prisma.heroSliders.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Hero slider deleted successfully.', heroSlider },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'An error occurred while deleting the hero slider.' },
      { status: 500 }
    )
  }
}
