import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const newAriivals = await prisma.newAriivals.findMany()

    return NextResponse.json({ newAriivals }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something is wrong, try again.' },
      { status: 500 }
    )
  }
}
