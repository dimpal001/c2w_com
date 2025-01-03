import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json(
      { message: 'User ID is missing!' },
      { status: 400 }
    )
  }
  try {
    const isViewed = await prisma.user.findUnique({
      where: { id },
    })

    return NextResponse.json({ isViewed }, { status: 200 })
  } catch (error) {
    console.log(error.message)
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  }
}

export async function PATCH(request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  try {
    await prisma.user.update({
      where: { id },
      data: { isViewed: true },
    })

    return NextResponse.json({ message: 'Success!' }, { status: 200 })
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  }
}
