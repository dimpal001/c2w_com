/* eslint-disable no-undef */
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const data = searchParams.get('data')

  const page = parseInt(searchParams.get('page')) || 1
  const itemsPerPage = 10

  try {
    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 })
    }

    if (data === 'cart') {
      const skip = (page - 1) * itemsPerPage

      const totalItems = await prisma.cartItem.count({
        where: { userId: id },
      })

      const totalPages = Math.ceil(totalItems / itemsPerPage)

      // Fetch paginated cart items
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          cartItems: {
            orderBy: { createdAt: 'desc' },
            skip,
            take: itemsPerPage,
            select: {
              id: true,
              quantity: true,
              updatedAt: true,
              color: true,
              product: {
                select: {
                  id: true,
                  title: true,
                  slug: true,
                  thumbnailUrl: true,
                  displayPrice: true,
                  inventory: {
                    select: {
                      id: true,
                      productId: true,
                      mrp: true,
                      price: true,
                      size: true,
                      stock: true,
                      minQuantity: true,
                    },
                  },
                  discounts: true,
                },
              },
            },
          },
        },
      })

      if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 })
      }

      return NextResponse.json(
        {
          user,
          currentPage: page,
          totalPages,
          totalItems,
        },
        { status: 200 }
      )
    }

    if (data === 'wishlist') {
      const skip = (page - 1) * itemsPerPage

      const totalItems = await prisma.cartItem.count({
        where: { userId: id },
      })

      const totalPages = Math.ceil(totalItems / itemsPerPage)

      // Fetch paginated cart items
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          wishlist: {
            orderBy: { createdAt: 'desc' },
            skip,
            take: itemsPerPage,
            select: {
              product: {
                select: {
                  id: true,
                  title: true,
                  slug: true,
                  thumbnailUrl: true,
                  displayPrice: true,
                },
              },
            },
          },
        },
      })

      if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 })
      }

      return NextResponse.json(
        {
          user,
          currentPage: page,
          totalPages,
          totalItems,
        },
        { status: 200 }
      )
    }

    if (data === 'reviews') {
      const skip = (page - 1) * itemsPerPage

      const totalItems = await prisma.cartItem.count({
        where: { userId: id },
      })

      const totalPages = Math.ceil(totalItems / itemsPerPage)

      // Fetch paginated cart items
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          reviews: {
            orderBy: { createdAt: 'desc' },
            skip,
            take: itemsPerPage,
            select: {
              rating: true,
              review: true,
              createdAt: true,
              product: {
                select: {
                  id: true,
                  title: true,
                  thumbnailUrl: true,
                },
              },
            },
          },
        },
      })

      if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 })
      }

      return NextResponse.json(
        {
          user,
          currentPage: page,
          totalPages,
          totalItems,
        },
        { status: 200 }
      )
    }

    if (data === 'orders') {
      const skip = (page - 1) * itemsPerPage

      const totalItems = await prisma.cartItem.count({
        where: { userId: id },
      })

      const totalPages = Math.ceil(totalItems / itemsPerPage)

      // Fetch paginated cart items
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          orders: {
            orderBy: { createdAt: 'desc' },
            skip,
            take: itemsPerPage,
            select: {
              id: true,
              orderId: true,
              totalPrice: true,
              status: true,
              createdAt: true,
              updatedAt: true,
              trackingId: true,
            },
          },
        },
      })

      if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 })
      }

      return NextResponse.json(
        {
          user,
          currentPage: page,
          totalPages,
          totalItems,
        },
        { status: 200 }
      )
    }

    if (data === 'search-query') {
      const totalItems = await prisma.searchQuery.count({
        where: { userId: id },
      })

      // Fetch paginated cart items
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          searchQueries: {
            orderBy: { createdAt: 'desc' },
            select: {
              id: true,
              query: true,
              createdAt: true,
            },
          },
        },
      })

      if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 })
      }

      return NextResponse.json(
        {
          user,
          totalItems,
        },
        { status: 200 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        addresses: true,
        status: true,

        cartItems: {
          orderBy: { createdAt: 'desc' },
          take: 5,
          select: {
            quantity: true,
            product: {
              select: {
                id: true,
                title: true,
                thumbnailUrl: true,
              },
            },
          },
        },

        wishlist: {
          orderBy: { createdAt: 'desc' },
          take: 5,
          select: {
            product: {
              select: {
                id: true,
                title: true,
                thumbnailUrl: true,
              },
            },
          },
        },

        orders: {
          orderBy: { createdAt: 'desc' },
          take: 5,
          select: {
            id: true,
            orderId: true,
            totalPrice: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            trackingId: true,
          },
        },

        reviews: {
          orderBy: { createdAt: 'desc' },
          take: 5,
          select: {
            rating: true,
            review: true,
            createdAt: true,
            product: {
              select: {
                id: true,
                title: true,
                thumbnailUrl: true,
              },
            },
          },
        },

        searchQueries: true,
      },
    })

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ user }, { status: 200 })
  } catch {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
