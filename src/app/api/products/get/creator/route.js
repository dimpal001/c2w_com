import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('id')
  try {
    const products = await prisma.product.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        title: true,
        images: true,
        isActive: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ products }, { status: 200 })
  } catch (error) {
    console.log(error.message)
    return NextResponse.json(
      { message: 'Something went wrong, try again' },
      { status: 500 }
    )
  }
}
