import { isAdmin } from '@/app/api/middleware/adminAuth'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// Add
export async function POST(request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorized access!' },
        { status: 401 }
      )
    }

    const { title, imageUrl, hyperLink } = await request.json()

    const productWeek = await prisma.productWeek.create({
      data: {
        title,
        imageUrl,
        hyperLink,
      },
    })

    return NextResponse.json(
      productWeek,
      { message: 'Product Week added successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error adding productWeek:', error)
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
      const productWeek = await prisma.productWeek.findUnique({
        where: { id },
      })
      return NextResponse.json(productWeek, { status: 200 })
    }

    const productWeek = await prisma.productWeek.findMany()
    return NextResponse.json(productWeek, { status: 200 })
  } catch (error) {
    console.error('Error fetching Product Week:', error)
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
        { message: 'Unauthorized access!' },
        { status: 401 }
      )
    }

    const { id, title, imageUrl, hyperLink } = await request.json()

    const productWeek = await prisma.productWeek.update({
      where: {
        id,
      },
      data: {
        title,
        imageUrl,
        hyperLink,
      },
    })

    return NextResponse.json(
      productWeek,
      { message: 'Product Week updated successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error adding Product Week:', error)
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
        { message: 'Unauthorized access!' },
        { status: 401 }
      )
    }

    await prisma.productWeek.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Product week deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting Product week:', error)
    return NextResponse.json(
      { message: 'Something went wrong, try again' },
      { status: 500 }
    )
  }
}
