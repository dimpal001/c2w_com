import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// Search product route with pagination
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')
  const id = searchParams.get('id')
  const page = parseInt(searchParams.get('page')) || 1
  const limit = parseInt(searchParams.get('limit')) || 20

  const color = searchParams.get('color')
  const size = searchParams.get('size')
  const minPrice = parseInt(searchParams.get('minPrice')) || 0
  const maxPrice =
    parseInt(searchParams.get('maxPrice')) || Number.MAX_SAFE_INTEGER
  const sort = searchParams.get('sort') || 'low-to-high'

  if (!query) {
    return NextResponse.json(
      { message: 'Query parameter is missing.' },
      { status: 400 }
    )
  }

  try {
    if (query === '') {
      return NextResponse.json({ message: 'Query is missing' }, { status: 400 })
    }

    if (id) {
      await storeSearchQuery(id, query)
    }

    const where = {
      AND: [
        {
          OR: [
            {
              title: {
                contains: query,
              },
            },
            {
              tags: {
                some: {
                  name: {
                    contains: query,
                  },
                },
              },
            },
            {
              categories: {
                some: {
                  name: {
                    contains: query,
                  },
                },
              },
            },
            {
              customerType: {
                name: {
                  contains: query,
                },
              },
            },
            {
              images: {
                some: {
                  color: {
                    name: {
                      contains: query,
                    },
                  },
                },
              },
            },
          ],
        },
        color
          ? {
              images: {
                some: {
                  color: {
                    slug: {
                      contains: color,
                    },
                  },
                },
              },
            }
          : {},
        size
          ? {
              inventory: {
                some: {
                  size: {
                    slug: {
                      contains: size,
                    },
                  },
                },
              },
            }
          : {},
        {
          inventory: {
            some: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
          },
        },
      ],
    }

    const orderBy =
      sort === 'high-to-low'
        ? { displayPrice: 'desc' }
        : { displayPrice: 'asc' }

    const products = await prisma.product.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy,
      select: {
        id: true,
        title: true,
        thumbnailUrl: true,
        inventory: {
          take: 1,
        },
        categories: { select: { name: true } },
        images: { select: { color: true } },
        tags: { select: { name: true } },
      },
    })

    const totalProducts = products.length

    if (products.length === 0) {
      const mostViewedProduct = await prisma.product.findFirst({
        orderBy: { views: 'desc' },
        select: {
          id: true,
          title: true,
          description: true,
          views: true,
          categories: { select: { name: true } },
          tags: { select: { name: true } },
          customerType: { select: { name: true } },
        },
      })

      if (!mostViewedProduct) {
        return NextResponse.json(
          {
            message: 'No products found and no most viewed product available.',
          },
          { status: 404 }
        )
      }

      return NextResponse.json(
        {
          currentPage: page,
          totalPages: 1,
          totalProducts: 1,
          products: [mostViewedProduct],
        },
        { status: 200 }
      )
    }

    const totalPages = Math.ceil(totalProducts / limit)

    return NextResponse.json(
      {
        currentPage: page,
        totalPages,
        totalProducts,
        products,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Something went wrong, please try again.' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

// Function to store the search query
export async function storeSearchQuery(userId, query) {
  try {
    const searchQuery = await prisma.searchQuery.create({
      data: {
        query,
        user: {
          connect: { id: userId },
        },
      },
    })
    console.log('Search query saved:', searchQuery)
  } catch (error) {
    console.error('Error saving search query:', error)
  }
}
