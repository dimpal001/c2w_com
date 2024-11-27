import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { isAuth } from '../../middleware/auth'

const prisma = new PrismaClient()

export async function DELETE(request) {
  const { userId, productId } = await request.json()

  if (!isAuth(request)) {
    return NextResponse.json(
      { message: 'Unauthorized access!' },
      { status: 401 }
    )
  }

  if (!userId || !productId) {
    return NextResponse.json(
      { message: 'User ID and Product ID are required' },
      { status: 400 }
    )
  }

  try {
    // Find the wishlist item to be removed
    const wishlistItem = await prisma.wishlistItem.findFirst({
      where: {
        userId,
        productId,
      },
    })

    if (!wishlistItem) {
      return NextResponse.json(
        { message: 'Product not found in wishlist' },
        { status: 404 }
      )
    }

    // Remove the product from the wishlist
    await prisma.wishlistItem.delete({
      where: {
        id: wishlistItem.id,
      },
    })

    return NextResponse.json(
      { message: 'Product removed from wishlist' },
      { status: 200 }
    )
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
