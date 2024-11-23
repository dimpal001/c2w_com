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

    const { link } = await request.json()

    const arrivalsLink = await prisma.arrivalsLink.create({
      data: {
        link,
      },
    })

    return NextResponse.json(
      { message: 'Arrivals Link has been added.', arrivalsLink },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error }, { status: 500 })
  }
}

export async function GET() {
  try {
    const arrivalsLink = await prisma.arrivalsLink.findMany()

    return NextResponse.json(arrivalsLink, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something is wrong, try again' },
      { status: 500 }
    )
  }
}

export async function PATCH(request) {
  const { id, link } = await request.json()
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

    const arrivalsLink = await prisma.arrivalsLink.update({
      where: { id },
      data: {
        link,
      },
    })

    return NextResponse.json(
      { message: 'Arrivals Link has been updated.', arrivalsLink },
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

    const arrivalsLink = await prisma.arrivalsLink.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Arrivals Link deleted successfully.', arrivalsLink },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something is wrong, try again.' },
      { status: 500 }
    )
  }
}
