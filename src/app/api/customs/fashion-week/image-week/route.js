import { isAdmin } from '@/app/api/middleware/adminAuth'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// Add
export async function POST(request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    const { imageUrl, hyperLink } = await request.json()

    const imageWeek = await prisma.imageWeek.create({
      data: {
        imageUrl,
        hyperLink,
      },
    })

    return NextResponse.json(
      imageWeek,
      { message: 'Image Week added successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error adding Image Week:', error)
    return NextResponse.json(
      { message: 'Something went wrong, try again' },
      { status: 500 }
    )
  }
}

// Get
export async function GET(request) {
  const { searchParams } = new URL(request.url)

  const id = searchParams.get('id')
  try {
    if (id) {
      const imageWeek = await prisma.imageWeek.findUnique({
        where: { id },
      })
      return NextResponse.json(imageWeek, { status: 200 })
    }

    const imageWeek = await prisma.imageWeek.findMany()
    return NextResponse.json(imageWeek, { status: 200 })
  } catch (error) {
    console.error('Error fetching Image Week:', error)
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  }
}

// Update
export async function PATCH(request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    const { id, imageUrl, hyperLink } = await request.json()

    const imageWeek = await prisma.imageWeek.update({
      where: {
        id,
      },
      data: {
        imageUrl,
        hyperLink,
      },
    })

    return NextResponse.json(
      imageWeek,
      { message: 'Image Week updated successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error adding Image Week:', error)
    return NextResponse.json(
      { message: 'Something went wrong, try again' },
      { status: 500 }
    )
  }
}

// Delete
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

    await prisma.imageWeek.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Image Week deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting Image Week:', error)
    return NextResponse.json(
      { message: 'Something went wrong, try again' },
      { status: 500 }
    )
  }
}
