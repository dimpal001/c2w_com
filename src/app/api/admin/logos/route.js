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

    const { logoUrl, altText } = await request.json()

    const logo = await prisma.logos.create({
      data: {
        logoUrl,
        altText,
      },
    })

    return NextResponse.json(
      { message: 'Logo has been uoloaded.', logo },
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
    const logos = await prisma.logos.findMany()

    return NextResponse.json(logos, { status: 200 })
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, try again' },
      { status: 500 }
    )
  }
}

export async function PATCH(request) {
  const { id, logoUrl, altText } = await request.json()

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

    const logo = await prisma.logos.update({
      where: { id },
      data: {
        logoUrl,
        altText,
      },
    })

    return NextResponse.json(
      { message: 'Logo has been updated.', logo },
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

    const logo = await prisma.logos.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Logo deleted successfully.', logo },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, try again.' },
      { status: 500 }
    )
  }
}
