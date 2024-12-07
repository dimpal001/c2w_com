import { cdnPath } from '@/app/Components/cdnPath'
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
        inventory: true,
        productReview: true,
        images: true,
        similarProducts: true,
        similarTo: true,
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
          inventory: true,
          productReview: true,
          images: true,
          similarProducts: true,
          similarTo: true,
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
              inventory: true,
              productReview: true,
              images: true,
              similarProducts: true,
              similarTo: true,
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

    if (product) {
      product.ogImage = cdnPath + product.thumbnailUrl
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Something went wrong, please try again.' },
      { status: 500 }
    )
  }
}
