import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
const prisma = new PrismaClient()

export async function GET() {
  try {
    const discounts = await prisma.discount.findMany()

    return NextResponse.json({ discounts }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Server is not responding!' },
      { status: 500 }
    )
  }
}
