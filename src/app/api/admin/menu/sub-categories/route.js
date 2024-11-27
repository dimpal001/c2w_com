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
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    const { categoryId, name } = await request.json()

    // Generate slug
    const slug = slugify(name, { lower: true })

    const isExist = await prisma.subCategory.findFirst({
      where: {
        slug,
        categoryId,
      },
    })

    if (isExist) {
      return NextResponse.json(
        { message: 'Sub category already exist' },
        { status: 409 }
      )
    }

    // Add the new sub Category to the database
    const category = await prisma.subCategory.create({
      data: {
        categoryId,
        name,
        slug,
      },
    })

    return NextResponse.json(
      category,
      { message: 'Sub ategory added successfully' },
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

// Get sub categories
export async function GET() {
  try {
    const categories = await prisma.subCategory.findMany()
    return NextResponse.json(categories, { status: 200 })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { message: 'Error fetching categories' },
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

    const { categoryId, id, name } = await request.json()

    // Generate slug
    const slug = slugify(name, { lower: true })

    const isExist = await prisma.subCategory.findFirst({
      where: {
        slug,
        categoryId,
      },
    })

    if (isExist) {
      return NextResponse.json(
        { message: 'Sub Category already exist' },
        { status: 409 }
      )
    }

    // Add the new sub category to the database
    const size = await prisma.subCategory.update({
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
      { message: 'Cateogry updated successfully' },
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

// Delete a sub category
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

    await prisma.subCategory.delete({
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
