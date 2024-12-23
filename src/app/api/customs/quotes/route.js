import { isAdmin } from '@/app/api/middleware/adminAuth'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// Add quote
export async function POST(request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    const { text = '', imageUrl, hyperLink } = await request.json()

    // Add the new announcement to the database
    const blogs = await prisma.quotes.create({
      data: {
        text,
        imageUrl,
        hyperLink,
      },
    })

    return NextResponse.json(
      blogs,
      { message: 'Quote added successfully' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, try again' },
      { status: 500 }
    )
  }
}

// Get quote
export async function GET(request) {
  const { searchParams } = new URL(request.url)

  const id = searchParams.get('id')
  try {
    if (id) {
      const quote = await prisma.quotes.findUnique({
        where: { id },
      })
      return NextResponse.json(quote, { status: 200 })
    }

    const quotes = await prisma.quotes.findMany()

    return NextResponse.json(quotes, { status: 200 })
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

    const { id, text, imageUrl, hyperLink } = await request.json()

    // Update announcement
    const quote = await prisma.quotes.update({
      where: {
        id,
      },
      data: {
        text,
        imageUrl,
        hyperLink,
      },
    })

    return NextResponse.json(
      quote,
      { message: 'Quote updated successfully' },
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

    await prisma.quotes.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Quote deleted successfully' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, try again' },
      { status: 500 }
    )
  }
}
