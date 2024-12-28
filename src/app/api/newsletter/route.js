import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { isAdmin } from '../middleware/adminAuth'

const prisma = new PrismaClient()

// Add to Newsletter
export async function POST(request) {
  const { email } = await request.json()
  console.log(email)

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 })
  }

  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { message: 'Invalid email format' },
      { status: 400 }
    )
  }

  if (email.length < 5 || email.length > 100) {
    return NextResponse.json(
      { message: 'Email length must be between 5 and 100 characters' },
      { status: 400 }
    )
  }

  try {
    const existEmail = await prisma.newsletter.findFirst({ where: { email } })
    if (existEmail) {
      return NextResponse.json(
        { message: 'This email is already in our newsletter!' },
        { status: 400 }
      )
    }

    await prisma.newsletter.create({
      data: {
        email,
      },
    })

    return NextResponse.json(
      { message: 'You have successfully subscribed!' },
      { status: 200 }
    )
  } catch (error) {
    console.log(error.message)
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  }
}

// Get all Newsletter
export async function GET(request) {
  if (!isAdmin(request)) {
    return NextResponse.json(
      { message: 'Unauthorised access' },
      { status: 400 }
    )
  }

  try {
    const emails = await prisma.newsletter.findMany({})

    return NextResponse.json({ emails }, { status: 200 })
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  }
}

// Delete a Newsletter
export async function DELETE(request) {
  if (!isAdmin(request)) {
    return NextResponse.json(
      { message: 'Unauthorised access!' },
      { status: 400 }
    )
  }

  const { id } = await request.json()

  if (!id) {
    return NextResponse.json({ message: 'ID is required!' }, { status: 400 })
  }

  try {
    await prisma.newsletter.delete({ where: { id } })
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  }
}
