import { isAdmin } from '@/app/api/middleware/adminAuth'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function PATCH(request) {
  const {
    id,
    code,
    amount,
    type,
    description,
    minPrice,
    isSpecial,
    isWebAvailable,
    userEmails,
    orders,
  } = await request.json()

  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    if (!id) {
      return NextResponse.json({ message: 'ID is required!' }, { status: 404 })
    }

    let userEmailArray = []

    if (userEmails) {
      userEmailArray = userEmails
        .split(',')
        .map((email) => email.trim())
        .filter((email) => email !== '')

      for (const email of userEmailArray) {
        const user = await prisma.user.findUnique({
          where: { email },
        })

        if (!user) {
          return NextResponse.json(
            { message: `Email ${email} is not registered!` },
            { status: 400 }
          )
        }

        if (user.role !== 'BUYER') {
          return NextResponse.json(
            { message: `User with email ${email} is not a valid buyer!` },
            { status: 400 }
          )
        }
      }
    }

    if (!code || !amount || !type || !description) {
      return NextResponse.json(
        { message: 'All fields are required!' },
        { status: 403 }
      )
    }

    const newDiscount = await prisma.discount.update({
      where: {
        id,
      },
      data: {
        code,
        orders,
        amount,
        type,
        isSpecial,
        isWebAvailable,
        userEmails: userEmailArray,
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
