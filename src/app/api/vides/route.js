import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { isAdmin } from '../middleware/adminAuth'

const prisma = new PrismaClient()

export async function POST(request) {
  const { videoUrl, title, description, hyperLink, price } =
    await request.json()

  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    const vide = await prisma.vides.create({
      data: {
        title,
        description,
        videoUrl,
        hyperLink,
        price: parseFloat(price),
      },
    })

    return NextResponse.json(
      vide,
      { message: 'Vide uploaded!' },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: '' }, { status: 500 })
  }
}

export async function PATCH(request) {
  const { videoUrl, title, description, hyperLink, id, price } =
    await request.json()

  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    await prisma.vides.update({
      where: { id },
      data: {
        title,
        description,
        videoUrl,
        hyperLink,
        price: parseFloat(price),
      },
    })

    return NextResponse.json({ message: 'Vide updated!' }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: '' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const vides = await prisma.vides.findMany({})

    return NextResponse.json(vides, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: '' }, { status: 500 })
  }
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    await prisma.vides.delete({ where: { id } })

    return NextResponse.json({ message: 'Vide deleted' }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: '' }, { status: 500 })
  }
}
