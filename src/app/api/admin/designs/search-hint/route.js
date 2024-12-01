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

    const { text } = await request.json()

    const searchHint = await prisma.searchHint.create({
      data: {
        text,
      },
    })

    return NextResponse.json(
      { message: 'Search hint has been added.', searchHint },
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

export async function GET() {
  try {
    const searchHint = await prisma.searchHint.findMany()

    return NextResponse.json(searchHint, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong, try again' },
      { status: 500 }
    )
  }
}

export async function PATCH(request) {
  const { id, text } = await request.json()
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

    const searchHint = await prisma.searchHint.update({
      where: { id },
      data: {
        text,
      },
    })

    return NextResponse.json(
      { message: 'Search Hint has been updated.', searchHint },
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

    const searchHint = await prisma.searchHint.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Search Hint deleted successfully.', searchHint },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'An error occurred while deleting the showcase.' },
      { status: 500 }
    )
  }
}
