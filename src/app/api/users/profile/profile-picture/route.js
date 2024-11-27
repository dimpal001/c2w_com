import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { isAuth } from '@/app/api/middleware/auth'

const prisma = new PrismaClient()

export async function POST(request) {
  const { profileUrl, id } = await request.json()

  if (!isAuth(request)) {
    return NextResponse.json(
      { message: 'Unauthorised access!' },
      { status: 401 }
    )
  }

  try {
    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { profileUrl },
    })

    return NextResponse.json(updatedUser, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

export async function DELETE(request) {
  const { id } = await request.json()

  if (!isAuth(request)) {
    return NextResponse.json(
      { message: 'Unauthorised access!' },
      { status: 401 }
    )
  }

  try {
    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { profileUrl: '' },
    })

    return NextResponse.json(updatedUser, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
