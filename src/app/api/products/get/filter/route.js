import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const searchQuery = searchParams.get('searchQuery')
  const sellerCode = searchParams.get('sellerCode')
  const categoryId = searchParams.get('categoryId')
  const subCategoryId = searchParams.get('subCategoryId')
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')
  const color = searchParams.get('color')
  const sortOption = searchParams.get('sortOption')
  const page = searchParams.get('page')
  try {
    // Pagination settings
    const itemsPerPage = 50
    const skip = (page - 1) * itemsPerPage

    const where = {}

    if (searchQuery) {
      where.title = {
        contains: searchQuery,
      }
    }

    if (sellerCode) {
      where.sellerCode = {
        contains: sellerCode,
      }
    }

    if (categoryId) {
      where.categories = {
        some: {
          id: categoryId,
        },
      }
    }

    if (subCategoryId) {
      where.subcategories = {
        some: {
          id: subCategoryId,
        },
      }
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
      where.displayPrice = {
        gte: parseInt(minPrice),
      }
    }

    if (maxPrice) {
      where.displayPrice = {
        ...where.displayPrice,
        lte: parseInt(maxPrice),
      }
    }

    const orderBy = []

    if (sortOption) {
      switch (sortOption) {
        case 'alphabet':
          orderBy.push({ title: 'asc' })
          break
        case 'newest':
          orderBy.push({ updatedAt: 'desc' })
          break
        case 'oldest':
          orderBy.push({ updatedAt: 'asc' })
          break
        default:
          break
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
      orderBy,
      select: {
        id: true,
        slug: true,
        displayPrice: true,
        summary: true,
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
        images: true,
        user: true,
      },
    })

    // Return the matched products along with pagination information
    return NextResponse.json({
      products: products.map((product) => ({
        id: product.id,
        slug: product.slug,
        title: product.title,
        summary: product.summary,
        styleId: product.styleId,
        isActive: product.isActive,
        displayPrice: product.displayPrice,
        thumbnailUrl: product.thumbnailUrl,
        images: product.images,
        user: product.user,
      })),
      currentPage: page,
      totalPages,
      totalProducts,
    })
  } catch {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
