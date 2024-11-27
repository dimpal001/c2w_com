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

    const { name, iconUrl, link } = await request.json()

    const button = await prisma.button.create({
      data: {
        name,
        iconUrl,
        link,
      },
    })

    return NextResponse.json(
      { message: 'Button has been added.', button },
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
    const buttons = await prisma.button.findMany()

    return NextResponse.json(buttons, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong, try again' },
      { status: 500 }
    )
  }
}

export async function PATCH(request) {
  const { id, name, iconUrl, link } = await request.json()
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

    const button = await prisma.button.update({
      where: { id },
      data: {
        name,
        iconUrl,
        link,
      },
    })

    return NextResponse.json(
      { message: 'Button has been updated.', button },
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
        { message: 'Unauthorized access!' },
        { status: 401 }
      )
    }

    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ message: 'ID is required.' }, { status: 400 })
    }

    const button = await prisma.button.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Button deleted successfully.', button },
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
