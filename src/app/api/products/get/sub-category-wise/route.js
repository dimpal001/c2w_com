import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const categorySlug = searchParams.get('categorySlug')

  if (!categorySlug) {
    return NextResponse.json(
      { message: 'Category slug is required!' },
      { status: 400 }
    )
  }

  try {
    const category = await prisma.productCategory.findUnique({
      where: { slug: categorySlug },
      include: {
        subcategories: {
          include: {
            products: {
              take: 1,
              select: {
                id: true,
                title: true,
                thumbnailUrl: true,
                slug: true,
              },
            },
          },
        },
      },
    })

    if (!category) {
      return NextResponse.json(
        { message: 'Category not found!' },
        { status: 404 }
      )
    }

    const result = category.subcategories.map((subcategory) => {
      return {
        subcategory: {
          id: subcategory.id,
          name: subcategory.name,
          slug: subcategory.slug,
          imageUrl: subcategory.imageUrl,
        },
        product:
          subcategory.products.length > 0 ? subcategory.products[0] : null,
      }
    })

    return NextResponse.json({ products: result }, { status: 200 })
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  }
}
