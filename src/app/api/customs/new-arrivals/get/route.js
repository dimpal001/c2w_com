import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const newArrivals = await prisma.newArrivals.findMany()

    return NextResponse.json({ newArrivals }, { status: 200 })
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, try again.' },
      { status: 500 }
    )
  }
}
