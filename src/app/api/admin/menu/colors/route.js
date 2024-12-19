import { isAdmin } from '@/app/api/middleware/adminAuth'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import slugify from 'slugify'

const prisma = new PrismaClient()

// Add color
export async function POST(request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    const { name, code } = await request.json()

    // Generate slug
    const slug = slugify(name, { lower: true })

    const isExist = await prisma.productColor.findUnique({
      where: {
        slug,
      },
    })

    if (isExist) {
      return NextResponse.json(
        { message: 'Color already exist' },
        { status: 409 }
      )
    }

    // Add the new color to the database
    const color = await prisma.productColor.create({
      data: {
        name,
        code,
        slug,
      },
    })

    return NextResponse.json(
      { message: 'Color added successfully', color },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error adding color:', error)
    return NextResponse.json({ message: 'Error adding color' }, { status: 500 })
  }
}

// Get colors s
export async function GET() {
  try {
    const colors = await prisma.productColor.findMany()
    return NextResponse.json(colors, { status: 200 })
  } catch (error) {
    console.error('Error fetching colors:', error)
    return NextResponse.json(
      { message: 'Error fetching colors' },
      { status: 500 }
    )
  }
}

// Delete a color
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

    await prisma.productColor.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Color deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting color:', error)
    return NextResponse.json(
      { message: 'Error deleting color' },
      { status: 500 }
    )
  }
}

// Update color
export async function PATCH(request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    const { id, name, code } = await request.json()

    // Generate slug
    const slug = slugify(name, { lower: true })

    const color = await prisma.productColor.update({
      where: {
        id,
      },
      data: {
        name,
        code,
        slug,
      },
    })

    return NextResponse.json(
      { message: 'Color added successfully', color },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error adding color:', error)
    return NextResponse.json({ message: 'Error adding color' }, { status: 500 })
  }
}
