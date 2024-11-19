import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(request) {
  const { id, isActive } = await request.json()

  try {
    // Update the isActive field for the specified product
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        isActive,
      },
    })

    return NextResponse.json(
      {
        product: updatedProduct,
        message: `Product has been ${isActive ? 'activated' : 'deactivated'}.`,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
