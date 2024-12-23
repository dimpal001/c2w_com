import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { isAdmin } from '../middleware/adminAuth'

const prisma = new PrismaClient()

export async function GET(request) {
  if (!isAdmin(request)) {
    return NextResponse.json(
      { message: 'Unauthorized access!' },
      { status: 401 }
    )
  }

  try {
    const privileges = await prisma.privilege.findMany()

    return NextResponse.json({ privileges }, { status: 200 })
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, please try again.' },
      { status: 500 }
    )
  }
}
