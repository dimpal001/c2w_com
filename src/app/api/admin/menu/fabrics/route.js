import { isAdmin } from '@/app/api/middleware/adminAuth'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import slugify from 'slugify'

const prisma = new PrismaClient()

// Add fabric
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

    const isExist = await prisma.productFabric.findUnique({
      where: {
        slug,
      },
    })

    if (isExist) {
      return NextResponse.json(
        { message: 'Fabric already exist' },
        { status: 409 }
      )
    }

    // Add the new Fabric to the database
    const fabrics = await prisma.productFabric.create({
      data: {
        name,
        slug,
      },
    })

    return NextResponse.json(
      fabrics,
      { message: 'Fabric added successfully' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { message: 'Error adding fabric' },
      { status: 500 }
    )
  }
}

// Get all fabrics
export async function GET() {
  try {
    const fabrics = await prisma.productFabric.findMany()
    return NextResponse.json(fabrics, { status: 200 })
  } catch {
    return NextResponse.json(
      { message: 'Error fetching fabrics' },
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

    const isExist = await prisma.productFabric.findUnique({
      where: {
        slug,
        NOT: {
          id,
        },
      },
    })

    if (isExist) {
      return NextResponse.json(
        { message: 'Fabric already exist' },
        { status: 409 }
      )
    }

    // Add the new Fabric to the database
    const fabric = await prisma.productFabric.update({
      where: {
        id,
      },
      data: {
        name,
        slug,
      },
    })

    return NextResponse.json(
      fabric,
      { message: 'Fabric updated successfully' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { message: 'Error adding fabric' },
      { status: 500 }
    )
  }
}

// Delete a fabric
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

    await prisma.productFabric.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Fabric deleted successfully' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { message: 'Error deleting fabric' },
      { status: 500 }
    )
  }
}
