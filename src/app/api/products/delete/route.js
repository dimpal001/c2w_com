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
    await prisma.productImage.deleteMany({
      where: { productId: id },
    })

    // Delete the product by its ID
    await prisma.product.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Product has been deleted.' },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    if (error.code === 'P2025') {
      // Prisma error code for not found
      return NextResponse.json(
        { message: 'Product not found.' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
