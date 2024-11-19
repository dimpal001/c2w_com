import { isAdmin } from '@/app/api/middleware/adminAuth'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request) {
  const { code, amount, type, description, minPrice, isSpecial, userEmail } =
    await request.json()
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorized access!' },
        { status: 401 }
      )
    }

    if (userEmail) {
      const user = await prisma.user.findUnique({ where: { email: userEmail } })

      if (!user) {
        return NextResponse.json(
          {
            message: 'Email that you have enterd is not registered!',
          },
          { status: 400 }
        )
      }

      if (user && user.role !== 'BUYER') {
        return NextResponse.json(
          {
            message: 'Not a valid user!',
          },
          { status: 400 }
        )
      }
    }

    if (!code || !amount || !type || !description) {
      return NextResponse.json(
        { message: 'All fields are required!' },
        { status: 403 }
      )
    }

    const isExist = await prisma.discount.findUnique({ where: { code } })

    if (isExist) {
      return NextResponse.json(
        { message: 'This coupon code is already exist!' },
        { status: 400 }
      )
    }

    const newDiscount = await prisma.discount.create({
      data: {
        code,
        amount,
        type,
        isSpecial,
        userEmail,
        description,
        minPrice,
      },
    })

    return NextResponse.json({ discount: newDiscount }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Server is not responding.' },
      { status: 500 }
    )
  }
}
