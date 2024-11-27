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

    const { imageUrl, hyperLink, title, price, mrp, description } =
      await request.json()

    const newArrivals = await prisma.newArrivals.create({
      data: {
        imageUrl,
        hyperLink,
        title,
        price,
        mrp,
        description,
      },
    })

    return NextResponse.json(
      { message: 'New Arrival product has been added.', newArrivals },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong, try again' },
      { status: 500 }
    )
  }
}
