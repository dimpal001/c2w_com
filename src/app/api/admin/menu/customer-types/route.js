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
        { message: 'Unauthorized access!' },
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
  } catch (error) {
    console.error('Error adding customer type:', error)
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
  } catch (error) {
    console.error('Error fetching customer type:', error)
    return NextResponse.json(
      { message: 'Error fetching customer type' },
      { status: 500 }
    )
  }
}

// Delete a customer type
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

    await prisma.customerType.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Customer type deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting Customer type:', error)
    return NextResponse.json(
      { message: 'Error deleting Customer type' },
      { status: 500 }
    )
  }
}
