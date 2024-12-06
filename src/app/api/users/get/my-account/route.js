/* eslint-disable no-undef */
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request) {
  const token = await request.cookies.get('token')

  try {
    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorised access!' },
        { status: 401 }
      )
    }

    const decoded = jwt.verify(token.value, process.env.JWT_SECRET)

    const id = decoded.userId

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        addresses: true,
      },
    })

    if (!user || !user.isLoggedIn) {
      const expiredResponse = NextResponse.json(
        { message: 'User not logged in or session expired!' },
        { status: 401 }
      )
      expiredResponse.cookies.set('token', '', {
        expires: new Date(0),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })
      return expiredResponse
    }

    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    console.error('Error querying user:', error)

    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  }
}
