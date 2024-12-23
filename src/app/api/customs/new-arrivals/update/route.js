import { isAdmin } from '@/app/api/middleware/adminAuth'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function PATCH(request) {
  const { id, imageUrl, hyperLink, title, price, mrp, description } =
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

    const newArrivals = await prisma.newArrivals.update({
      where: { id },
      data: {
        imageUrl,
        title,
        price,
        mrp,
        description,
        hyperLink,
      },
    })

    return NextResponse.json(
      { message: 'New arrival has been updated.', newArrivals },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, try again' },
      { status: 500 }
    )
  }
}
