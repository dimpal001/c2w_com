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

    const { link } = await request.json()

    const collectionLink = await prisma.collectionLink.create({
      data: {
        link,
      },
    })

    return NextResponse.json(
      { message: 'Collection Link has been added.', collectionLink },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const collectionLink = await prisma.collectionLink.findMany()

    return NextResponse.json(collectionLink, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong, try again' },
      { status: 500 }
    )
  }
}

export async function PATCH(request) {
  const { id, link } = await request.json()
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

    const collectionLink = await prisma.collectionLink.update({
      where: { id },
      data: {
        link,
      },
    })

    return NextResponse.json(
      { message: 'Collection Link has been updated.', collectionLink },
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

    const collectionLink = await prisma.collectionLink.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Collection Link deleted successfully.', collectionLink },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong, try again.' },
      { status: 500 }
    )
  }
}
