import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    if (type === 'colors') {
      const colors = await prisma.productColor.findMany({
        orderBy: { name: 'asc' },
      })
      return NextResponse.json(colors, { status: 200 })
    } else if (type === 'sizes') {
      const sizes = await prisma.productSize.findMany({
        orderBy: { name: 'asc' },
      })
      return NextResponse.json(sizes, { status: 200 })
    } else if (type === 'categories') {
      const categories = await prisma.productCategory.findMany({
        include: {
          subcategories: true,
        },
        orderBy: { name: 'asc' },
      })
      return NextResponse.json(categories, { status: 200 })
    } else if (type === 'customer-types') {
      const types = await prisma.customerType.findMany({
        orderBy: { name: 'asc' },
      })
      return NextResponse.json(types, { status: 200 })
    }
  } catch (error) {
    console.error('Error fetching colors:', error)
    return NextResponse.json(
      { message: 'Error fetching colors' },
      { status: 500 }
    )
  }
}
