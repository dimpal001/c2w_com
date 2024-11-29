import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req) {
  const url = new URL(req.url)
  const colorsParam = JSON.parse(url.searchParams.get('colors') || '[]')
  const sizesParam = JSON.parse(url.searchParams.get('sizes') || '[]')
  const minPrice = parseFloat(url.searchParams.get('minPrice')) || 0
  const maxPrice = parseFloat(url.searchParams.get('maxPrice')) || 0

  try {
    const whereConditions = {
      AND: [],
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

    const products = await prisma.product.findMany({
      where: whereConditions.AND.length > 0 ? whereConditions : undefined,
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

    console.log(products.length)

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error(error)
    return new Response('Error occurred while fetching products.', {
      status: 500,
    })
  }
}
