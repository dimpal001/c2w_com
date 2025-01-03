import { isAdmin } from '@/app/api/middleware/adminAuth'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import slugify from 'slugify'

const prisma = new PrismaClient()

// Add size
export async function POST(request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    const { name } = await request.json()

    // Generate slug
    const slug = slugify(name, { lower: true })

    const isExist = await prisma.productSize.findUnique({
      where: {
        slug,
      },
    })

    if (isExist) {
      return NextResponse.json(
        { message: 'Size already exist' },
        { status: 409 }
      )
    }

    // Add the new Size to the database
    const sizes = await prisma.productSize.create({
      data: {
        name,
        slug,
      },
    })

    return NextResponse.json(
      sizes,
      { message: 'Size added successfully' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json({ message: 'Error adding size' }, { status: 500 })
  }
}

// Get all sizes
export async function GET() {
  try {
    const sizes = await prisma.productSize.findMany()
    return NextResponse.json(sizes, { status: 200 })
  } catch {
    return NextResponse.json(
      { message: 'Error fetching sizes' },
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

    const { id, name } = await request.json()

    // Generate slug
    const slug = slugify(name, { lower: true })

    const isExist = await prisma.productSize.findUnique({
      where: {
        slug,
      },
    })

    if (isExist) {
      return NextResponse.json(
        { message: 'Size already exist' },
        { status: 409 }
      )
    }

    // Add the new Size to the database
    const size = await prisma.productSize.update({
      where: {
        id,
      },
      data: {
        name,
        slug,
      },
    })

    return NextResponse.json(
      size,
      { message: 'Size updated successfully' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json({ message: 'Error adding size' }, { status: 500 })
  }
}

// Delete a size
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

    await prisma.productSize.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Size deleted successfully' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { message: 'Error deleting size' },
      { status: 500 }
    )
  }
}
