import { isAdmin } from '@/app/api/middleware/adminAuth'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function PATCH(request) {
  const { id, imageUrl, categoryHyperLink, hyperLink } = await request.json()
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorized access!' },
        { status: 401 }
      )
    }

    if (!id) {
      return NextResponse.json({ message: 'ID is required!' }, { status: 400 })
    }

    const exclusiveCollection = await prisma.exclusiveCollection.update({
      where: { id },
      data: {
        imageUrl,
        categoryHyperLink,
        hyperLink,
      },
    })

    return NextResponse.json(
      {
        message: 'Exclusive collection has been updated.',
        exclusiveCollection,
      },
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