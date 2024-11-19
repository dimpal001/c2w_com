import { isAdmin } from '@/app/api/middleware/adminAuth'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const searchQuery = searchParams.get('searchQuery')
  const userRole = searchParams.get('userRole')
  const page = searchParams.get('page')

  if (!isAdmin(request)) {
    return NextResponse.json(
      { message: 'Unauthorized access!' },
      { status: 401 }
    )
  }

  try {
    // Pagination settings
    const itemsPerPage = 12
    const skip = (page - 1) * itemsPerPage

    const where = {}

    if (searchQuery) {
      where.firstName = {
        contains: searchQuery,
      }
    }

    if (userRole) {
      where.role = userRole
    }

    const totalUsers = await prisma.user.count({
      where,
    })

    const totalPages = Math.ceil(totalUsers / itemsPerPage)

    const users = await prisma.user.findMany({
      where,
      skip,
      take: itemsPerPage,
    })

    // Return the matched products along with pagination information
    return NextResponse.json({
      users: users,
      currentPage: page,
      totalPages,
      totalUsers,
    })
  } catch (error) {
    console.error('Error querying products:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
