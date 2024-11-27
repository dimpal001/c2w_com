import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { isAuth } from '../../middleware/auth'

const prisma = new PrismaClient()

export async function POST(request) {
  const { userId, productId } = await request.json()

  if (!isAuth(request)) {
    return NextResponse.json(
      { message: 'Unauthorised access!' },
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
      // If the product is already in the wishlist, return a message
      return NextResponse.json(
        { message: 'Product is already in the wishlist' },
        { status: 400 }
      )
    }

    // If not, add the product to the wishlist
    const wishlistItem = await prisma.wishlistItem.create({
      data: {
        userId,
        productId,
      },
    })

    return NextResponse.json(
      { message: 'Product added to wishlist', wishlistItem },
      { status: 201 }
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
