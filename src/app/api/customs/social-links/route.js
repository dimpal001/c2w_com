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

    const { imageUrl, hyperLink } = await request.json()

    // Add the new announcement to the database
    const socialLinks = await prisma.socialLinks.create({
      data: {
        imageUrl,
        hyperLink,
      },
    })

    return NextResponse.json(
      socialLinks,
      { message: 'Social Links added successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error adding Social Links:', error)
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
      const socialLink = await prisma.socialLinks.findUnique({
        where: { id },
      })
      return NextResponse.json(socialLink, { status: 200 })
    }

    const socialLinks = await prisma.socialLinks.findMany()
    return NextResponse.json(socialLinks, { status: 200 })
  } catch (error) {
    console.error('Error fetching social links:', error)
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

    const { id, imageUrl, hyperLink } = await request.json()

    // Update announcement
    const socialLink = await prisma.socialLinks.update({
      where: {
        id,
      },
      data: {
        imageUrl,
        hyperLink,
      },
    })

    return NextResponse.json(
      socialLink,
      { message: 'Social Link updated successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error adding social link:', error)
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

    await prisma.socialLinks.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Social link deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting Social link:', error)
    return NextResponse.json(
      { message: 'Something went wrong, try again' },
      { status: 500 }
    )
  }
}
