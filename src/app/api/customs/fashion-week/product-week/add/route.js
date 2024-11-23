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

    const { title, imageUrl, hyperLink } = await request.json()

    const productWeek = await prisma.productWeek.create({
      data: {
        title,
        imageUrl,
        hyperLink,
      },
    })

    return NextResponse.json(
      { message: 'Product Week has been added.', productWeek },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something is wrong, try again' },
      { status: 500 }
    )
  }
}
