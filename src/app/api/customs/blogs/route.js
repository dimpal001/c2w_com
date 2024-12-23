import { isAdmin } from '@/app/api/middleware/adminAuth'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// Add announcement
export async function POST(request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    const { title, imageUrl, description, hyperLink } = await request.json()

    // Add the new announcement to the database
    const blogs = await prisma.blogs.create({
      data: {
        title,
        imageUrl,
        description,
        hyperLink,
      },
    })

    return NextResponse.json(
      blogs,
      { message: 'Blogs added successfully' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, try again' },
      { status: 500 }
    )
  }
}

// Get announcements
export async function GET(request) {
  const { searchParams } = new URL(request.url)

  const id = searchParams.get('id')
  try {
    if (id) {
      const blog = await prisma.blogs.findUnique({
        where: { id },
      })
      return NextResponse.json(blog, { status: 200 })
    }

    const blogs = await prisma.blogs.findMany()
    return NextResponse.json(blogs, { status: 200 })
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

    const { id, title, description, imageUrl, hyperLink } = await request.json()

    // Update announcement
    const blog = await prisma.blogs.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        imageUrl,
        hyperLink,
      },
    })

    return NextResponse.json(
      blog,
      { message: 'Blog updated successfully' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, try again' },
      { status: 500 }
    )
  }
}

// Delete an announcement
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

    await prisma.blogs.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Blog deleted successfully' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, try again' },
      { status: 500 }
    )
  }
}
