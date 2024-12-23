import { isAdmin } from '@/app/api/middleware/adminAuth'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import slugify from 'slugify'

const prisma = new PrismaClient()

// Add customer type
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

    const isExist = await prisma.customerType.findUnique({
      where: {
        slug,
      },
    })

    if (isExist) {
      return NextResponse.json(
        { message: 'Customer type already exist' },
        { status: 409 }
      )
    }

    // Add the new Customer type to the database
    const customerType = await prisma.customerType.create({
      data: {
        name,
        slug,
      },
    })

    return NextResponse.json(
      customerType,
      { message: 'Customer type added successfully' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { message: 'Error adding customer type' },
      { status: 500 }
    )
  }
}

// Get customer types
export async function GET() {
  try {
    const customerType = await prisma.customerType.findMany()
    return NextResponse.json(customerType, { status: 200 })
  } catch {
    return NextResponse.json(
      { message: 'Error fetching customer type' },
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

    const isExist = await prisma.customerType.findUnique({
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
    const size = await prisma.customerType.update({
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

// Delete a customer type
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

    await prisma.customerType.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Customer type deleted successfully' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { message: 'Error deleting Customer type' },
      { status: 500 }
    )
  }
}
