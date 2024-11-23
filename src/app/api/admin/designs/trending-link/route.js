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

    const trendingLink = await prisma.trendingLink.create({
      data: {
        link,
      },
    })

    return NextResponse.json(
      { message: 'Trending Link has been added.', trendingLink },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error }, { status: 500 })
  }
}

export async function GET() {
  try {
    const trendingLink = await prisma.trendingLink.findMany()

    return NextResponse.json(trendingLink, { status: 200 })
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

    const trendingLink = await prisma.trendingLink.update({
      where: { id },
      data: {
        link,
      },
    })

    return NextResponse.json(
      { message: 'Trending Link has been updated.', trendingLink },
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

    const trendingLink = await prisma.trendingLink.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Trending Link deleted successfully.', trendingLink },
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
