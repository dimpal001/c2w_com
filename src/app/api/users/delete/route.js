import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { isAdmin } from '../../middleware/adminAuth'

const prisma = new PrismaClient()

export async function POST(request) {
  const { id } = await request.json()

  if (!isAdmin(request)) {
    return NextResponse.json(
      { message: 'Unauthorised access!' },
      { status: 401 }
    )
  }

  try {
    console.log(id)

    if (!id) {
      return NextResponse.json({ message: 'ID is required!' }, { status: 404 })
    }

    await prisma.userAddress.deleteMany({
      where: { userId: id },
    })
    const user = await prisma.user.delete({ where: { id } })

    console.log(user)

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(
      { message: 'User has been deleted' },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  }
}
