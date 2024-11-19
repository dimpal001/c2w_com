import { isAdmin } from '@/app/api/middleware/adminAuth'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import slugify from 'slugify'

const prisma = new PrismaClient()

// Add categories
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

    const isExist = await prisma.productCategory.findUnique({
      where: {
        slug,
      },
    })

    if (isExist) {
      return NextResponse.json(
        { message: 'Category already exist' },
        { status: 409 }
      )
    }

    // Add the new Category to the database
    const category = await prisma.productCategory.create({
      data: {
        name,
        slug,
      },
    })

    return NextResponse.json(
      category,
      { message: 'Category added successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error adding category:', error)
    return NextResponse.json(
      { message: 'Error adding category' },
      { status: 500 }
    )
  }
}

// Get categories
export async function GET() {
  try {
    const categories = await prisma.productCategory.findMany()
    return NextResponse.json(categories, { status: 200 })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { message: 'Error fetching categories' },
      { status: 500 }
    )
  }
}

// Delete a category
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

    console.log(id)

    await prisma.productCategory.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Category deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting Category:', error)
    return NextResponse.json(
      { message: 'Error deleting Category' },
      { status: 500 }
    )
  }
}
