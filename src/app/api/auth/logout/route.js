import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')

  try {
    await prisma.user.update({
      where: { email },
      data: { isLoggedIn: false },
    })

    const response = NextResponse.json(
      { message: 'Successfully logged out.' },
      {
        status: 200,
        headers: {
          'Set-Cookie': `token=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict`,
        },
      }
    )

    return response
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
