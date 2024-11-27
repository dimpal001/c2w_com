import { isAdmin } from '@/app/api/middleware/adminAuth'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    const { imageUrl, hyperLink, categoryHyperLink, price, mrp } =
      await request.json()

    const exclusiveCollections = await prisma.exclusiveCollection.create({
      data: {
        imageUrl,
        hyperLink,
        categoryHyperLink,
        price,
        mrp,
      },
    })

    return NextResponse.json(
      {
        message: 'New exclusive collection product has been added.',
        exclusiveCollections,
      },
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
