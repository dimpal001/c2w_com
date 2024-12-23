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

    const { occasionName, categoryHyperLinks } = await request.json()

    const occasion = await prisma.shopByOccasion.create({
      data: {
        occasionName,
        categoryHyperLinks,
      },
    })

    return NextResponse.json(
      { message: 'Occasion has been added.', occasion },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { message: 'Somethings went wrong, try again!' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const occasions = await prisma.shopByOccasion.findMany({
      include: { products: true },
    })

    return NextResponse.json(occasions, { status: 200 })
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, try again' },
      { status: 500 }
    )
  }
}

export async function PATCH(request) {
  const { id, occasionName, categoryHyperLinks } = await request.json()

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

    await prisma.shopByOccasion.update({
      where: { id },
      data: {
        occasionName,
        categoryHyperLinks,
      },
    })

    return NextResponse.json(
      { message: 'Occasion has been updated.' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, try again' },
      { status: 500 }
    )
  }
}

export async function DELETE(request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ message: 'ID is required.' }, { status: 400 })
    }

    await prisma.shopByOccasionProduct.deleteMany({
      where: { shopByOccasionId: id },
    })

    const occasion = await prisma.shopByOccasion.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Occasion deleted successfully.', occasion },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, try again.' },
      { status: 500 }
    )
  }
}
