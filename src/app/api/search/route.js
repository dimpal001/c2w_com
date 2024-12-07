import { cdnPath } from '@/app/Components/cdnPath'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req) {
  const url = new URL(req.url)
  const slug = url.searchParams.get('categorySlug')
  const colorsParam = JSON.parse(url.searchParams.get('colors') || '[]')
  const sizesParam = JSON.parse(url.searchParams.get('sizes') || '[]')
  const minPrice = parseFloat(url.searchParams.get('minPrice')) || 0
  const maxPrice = parseFloat(url.searchParams.get('maxPrice')) || 0
  const page = parseInt(url.searchParams.get('page')) || 1
  const pageSize = parseInt(url.searchParams.get('pageSize')) || 16
  const searchQuery = url.searchParams.get('searchQuery') || ''

  try {
    const whereConditions = {
      AND: [],
    }

    if (searchQuery) {
      whereConditions.AND.push({
        OR: [
          {
            title: {
              contains: searchQuery,
            },
          },
          {
            categories: {
              some: {
                OR: [
                  {
                    slug: {
                      contains: searchQuery,
                    },
                  },
                  {
                    name: {
                      contains: searchQuery,
                    },
                  },
                ],
              },
            },
          },
          {
            tags: {
              array_contains: searchQuery,
            },
          },
        ],
      })
    }

    if (slug) {
      whereConditions.AND.push({
        categories: {
          some: {
            slug: slug,
          },
        },
      })
    }

    if (minPrice || maxPrice) {
      whereConditions.AND.push({
        displayPrice: {
          gte: minPrice,
          lte: maxPrice,
        },
      })
    }

    if (colorsParam.length > 0) {
      whereConditions.AND.push({
        images: {
          some: {
            color: {
              slug: {
                in: colorsParam.map((color) => color.slug),
              },
            },
          },
        },
      })
    }

    if (sizesParam.length > 0) {
      whereConditions.AND.push({
        inventory: {
          some: {
            size: {
              slug: {
                in: sizesParam.map((size) => size.slug),
              },
            },
          },
        },
      })
    }

    const totalProducts = await prisma.product.count({
      where: whereConditions.AND.length > 0 ? whereConditions : undefined,
    })

    const totalPages = Math.ceil(totalProducts / pageSize)
    const skip = (page - 1) * pageSize

    const products = await prisma.product.findMany({
      where: whereConditions.AND.length > 0 ? whereConditions : undefined,
      skip,
      take: pageSize,
      include: {
        images: {
          include: {
            color: true,
          },
        },
        inventory: {
          include: {
            size: true,
          },
        },
        categories: true,
        subcategories: true,
        similarProducts: true,
        user: true,
        productReview: true,
      },
    })

    // Modify each product to include additional fields
    const modifiedProducts = products.map((product) => {
      return {
        ...product,
        ogImage: cdnPath + product.thumbnailUrl,
      }
    })

    return new Response(
      JSON.stringify({
        totalProducts,
        currentPage: page,
        totalPages,
        products: modifiedProducts,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error(error)
    return new Response('Error occurred while fetching products.', {
      status: 500,
    })
  }
}
