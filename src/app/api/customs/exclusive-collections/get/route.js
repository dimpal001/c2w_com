import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const exclusiveCollections = await prisma.exclusiveCollection.findMany()

    return NextResponse.json({ exclusiveCollections }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong, try again.' },
      { status: 500 }
    )
  }
}
