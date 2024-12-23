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
      { message: 'Unauthorised access!' },
      { status: 401 }
    )
  }

  try {
    // Pagination settings
    const itemsPerPage = 12
    const skip = (page - 1) * itemsPerPage

    const where = {}

    if (searchQuery) {
      const searchTerms = searchQuery.split(' ').filter(Boolean) // Split query into words

      if (searchTerms.length > 1) {
        // Handle multi-word search (e.g., "dimpal das")
        where.OR = [
          {
            AND: [
              { firstName: { contains: searchTerms[0] } },
              { lastName: { contains: searchTerms[1] } },
            ],
          },
          {
            AND: [
              { firstName: { contains: searchTerms[1] } },
              { lastName: { contains: searchTerms[0] } },
            ],
          },
        ]
      } else {
        // Handle single-word search
        where.OR = [
          { firstName: { contains: searchQuery } },
          { lastName: { contains: searchQuery } },
        ]
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
  } catch {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
