import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { isAuth } from '../../middleware/auth'

const prisma = new PrismaClient()

export async function POST(request) {
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
    // Check if the product already exists in the user's wishlist
    const existingWishlistItem = await prisma.wishlistItem.findFirst({
      where: {
        userId,
        productId,
      },
    })

    if (existingWishlistItem) {
      // If the product is already in the wishlist, remove it
      await prisma.wishlistItem.delete({
        where: {
          id: existingWishlistItem.id,
        },
      })

      return NextResponse.json(
        { message: 'Product removed from wishlist' },
        { status: 201 }
      )
    } else {
      // If not, add the product to the wishlist
      const wishlistItem = await prisma.wishlistItem.create({
        data: {
          userId,
          productId,
        },
      })

      return NextResponse.json(
        { message: 'Product added to wishlist', wishlistItem },
        { status: 200 }
      )
    }
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
