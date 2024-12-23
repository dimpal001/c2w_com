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

    const { text } = await request.json()

    // Add the new announcement to the database
    const announcement = await prisma.announcements.create({
      data: {
        text,
      },
    })

    return NextResponse.json(
      announcement,
      { message: 'Announcement added successfully' },
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
      const announcement = await prisma.announcements.findUnique({
        where: { id },
      })
      return NextResponse.json(announcement, { status: 200 })
    }

    const announcements = await prisma.announcements.findMany()
    return NextResponse.json(announcements, { status: 200 })
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

    const { id, text } = await request.json()

    // Update announcement
    const size = await prisma.announcements.update({
      where: {
        id,
      },
      data: {
        text,
      },
    })

    return NextResponse.json(
      size,
      { message: 'Announcement updated successfully' },
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

    await prisma.announcements.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Announcement deleted successfully' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, try again' },
      { status: 500 }
    )
  }
}
