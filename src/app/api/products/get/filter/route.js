import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const searchQuery = searchParams.get('searchQuery')
  const categoryId = searchParams.get('categoryId')
  const customerTypeId = searchParams.get('customerTypeId')
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')
  const color = searchParams.get('color')
  const page = searchParams.get('page')
  try {
    // Pagination settings
    const itemsPerPage = 12
    const skip = (page - 1) * itemsPerPage

    const where = {}

    if (searchQuery) {
      where.title = {
        contains: searchQuery,
      }
    }

    if (categoryId) {
      where.categories = {
        some: {
          id: categoryId,
        },
      }
    }

    if (customerTypeId) {
      where.customerTypeId = customerTypeId
    }

    if (color) {
      where.images = {
        some: {
          colorId: color,
        },
      }
    }

    const inventoryWhere = {}

    if (minPrice) {
      inventoryWhere.price = {
        gte: parseInt(minPrice),
      }
    }

    if (maxPrice) {
      inventoryWhere.price = {
        ...inventoryWhere.price,
        lte: parseInt(maxPrice),
      }
    }

    const totalProducts = await prisma.product.count({
      where: {
        ...where,
        inventory: {
          some: inventoryWhere,
        },
      },
    })

    const totalPages = Math.ceil(totalProducts / itemsPerPage)

    const products = await prisma.product.findMany({
      where: {
        ...where,
        inventory: {
          some: inventoryWhere,
        },
      },
      skip,
      take: itemsPerPage,
      select: {
        id: true,
        slug: true,
        displayPrice: true,
        title: true,
        styleId: true,
        isActive: true,
        thumbnailUrl: true,
        inventory: {
          where: inventoryWhere,
          select: {
            price: true,
            mrp: true,
          },
        },
      },
    })

    // Return the matched products along with pagination information
    return NextResponse.json({
      products: products.map((product) => ({
        id: product.id,
        slug: product.slug,
        title: product.title,
        styleId: product.styleId,
        isActive: product.isActive,
        displayPrice: product.displayPrice,
        thumbnailUrl: product.thumbnailUrl,
      })),
      currentPage: page,
      totalPages,
      totalProducts,
    })
  } catch (error) {
    console.error('Error querying products:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
