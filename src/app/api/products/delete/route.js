import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { isAdmin } from '../../middleware/adminAuth'

const prisma = new PrismaClient()

export async function DELETE(request) {
  const { id } = await request.json()

  if (!isAdmin(request)) {
    return NextResponse.json(
      { message: 'Unauthorized access!' },
      { status: 401 }
    )
  }

  try {
    // await prisma.productImage.deleteMany({
    //   where: { productId: id },
    // })

    // Delete the product by its ID
    const deletedProduct = await prisma.product.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Product has been deleted.', product: deletedProduct },
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
    return NextResponse.json({ message: error.message }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
