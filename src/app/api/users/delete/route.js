import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { isAdmin } from '../../middleware/adminAuth'

const prisma = new PrismaClient()

export async function DELETE(request) {
  const { id } = await request.json()

  if (!isAdmin(request)) {
    return NextResponse.json(
      { message: 'Unauthorised access!' },
      { status: 401 }
    )
  }

  try {
    // Delete the product by its ID
    const deletedUser = await prisma.user.delete({
      where: { id },
    })

    if (!deletedUser) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 })
    }

    return NextResponse.json(
      { message: 'User has been deleted.', product: deletedUser },
      { status: 200 }
    )
  } catch (error) {
    if (error.code === 'P2025') {
      // Prisma error code for not found
      return NextResponse.json({ message: 'User not found.' }, { status: 404 })
    }
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
