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
  } catch {
    return NextResponse.json(
      { message: 'Error adding category' },
      { status: 500 }
    )
  }
}

// Get categories
export async function GET(request) {
  const { searchParams } = new URL(request.url)

  const id = searchParams.get('id')
  try {
    if (id) {
      const category = await prisma.productCategory.findUnique({
        where: { id },
        include: {
          subcategories: true,
        },
      })
      return NextResponse.json(category, { status: 200 })
    }

    const categories = await prisma.productCategory.findMany({
      include: {
        subcategories: true,
      },
    })
    return NextResponse.json(categories, { status: 200 })
  } catch {
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

    const { id, name } = await request.json()

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

    // Add the new Size to the database
    const size = await prisma.productCategory.update({
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
  } catch {
    return NextResponse.json(
      { message: 'Error adding category' },
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
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    await prisma.subCategory.deleteMany({ where: { categoryId: id } })

    await prisma.productCategory.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Category deleted successfully' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { message: 'Error deleting Category' },
      { status: 500 }
    )
  }
}
