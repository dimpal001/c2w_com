import { isAdmin } from '@/app/api/middleware/adminAuth'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorized access!' },
        { status: 401 }
      )
    }

    const showcases = await prisma.showcases.findMany()

    return NextResponse.json({ showcases }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}
