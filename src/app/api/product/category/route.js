import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request) {
  const { searchParams } = new URL(request.url)

  const id = searchParams.get('id')

  try {
    if (!id) {
      return NextResponse.json(
        { message: 'ID is not provided' },
        { status: 404 }
      )
    }

    const products = await prisma.product.findMany({
      where: {
        categories: {
          some: { id },
        },
      },
      include: { categories: true },
      take: 20,
    })

    return NextResponse.json({ products }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Something went wrong, please try again.' },
      { status: 500 }
    )
  }
}
