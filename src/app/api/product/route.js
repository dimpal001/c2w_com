import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request) {
  const { searchParams } = new URL(request.url)

  const slug = searchParams.get('slug')

  try {
    let product = await prisma.product.findUnique({
      where: { slug },
      include: {
        inventory: {
          select: {
            id: true,
            mrp: true,
            price: true,
            stock: true,
            discount: true,
            minQuantity: true,
            size: true,
          },
        },
        productReview: true,
        images: {
          select: {
            imageUrl: true,
            color: true,
            colorId: true,
          },
        },
        similarProducts: true,
        categories: true,
        discounts: true,
      },
    })

    if (!product) {
      const slugWords = slug.split('-')

      product = await prisma.product.findFirst({
        where: {
          title: {
            contains: slugWords[0],
          },
        },
        include: {
          inventory: {
            select: {
              id: true,
              mrp: true,
              price: true,
              discount: true,
              stock: true,
              minQuantity: true,
              size: true,
            },
          },
          productReview: true,
          images: {
            select: {
              imageUrl: true,
              color: true,
              colorId: true,
            },
          },
          similarProducts: true,
          categories: true,
          discounts: true,
        },
      })

      if (!product) {
        for (let i = 1; i < slugWords.length; i++) {
          product = await prisma.product.findFirst({
            where: {
              title: {
                contains: slugWords[i],
              },
            },
            include: {
              inventory: {
                select: {
                  id: true,
                  mrp: true,
                  price: true,
                  discount: true,
                  stock: true,
                  minQuantity: true,
                  size: true,
                },
              },
              productReview: true,
              images: {
                select: {
                  imageUrl: true,
                  color: true,
                  colorId: true,
                },
              },
              similarProducts: true,
              categories: true,
              discounts: true,
            },
          })

          if (product) {
            break
          }
        }
      }

      if (!product) {
        return NextResponse.json(
          { message: 'No product found.' },
          { status: 404 }
        )
      }
    }

    return NextResponse.json(product)
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, please try again.' },
      { status: 500 }
    )
  }
}
