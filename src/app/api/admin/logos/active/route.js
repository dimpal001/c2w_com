import { isAdmin } from '@/app/api/middleware/adminAuth'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const logo = await prisma.logos.findFirst({ where: { isActive: true } })

    return NextResponse.json(logo, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong, try again' },
      { status: 500 }
    )
  }
}

export async function PATCH(request) {
  const { searchParams } = new URL(request.url)
  console.log(searchParams)
  const id = searchParams.get('id')
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    if (!id) {
      return NextResponse.json({ message: 'ID is required!' }, { status: 400 })
    }

    await prisma.logos.updateMany({ data: { isActive: false } })

    await prisma.logos.update({
      where: { id },
      data: {
        isActive: true,
      },
    })

    return NextResponse.json(
      { message: 'Logo has been activated.' },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong, try again' },
      { status: 500 }
    )
  }
}
