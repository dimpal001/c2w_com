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

    const { imageUrl, hyperLink, categoryHyperLink } = await request.json()

    const newAriivals = await prisma.newAriivals.create({
      data: {
        imageUrl,
        hyperLink,
        categoryHyperLink,
      },
    })

    return NextResponse.json(
      { message: 'New Arrival product has been added.', newAriivals },
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
