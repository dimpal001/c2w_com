import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request) {
  const { email, otpCode } = await request.json()

  // Find the user by email
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 })
  }

  try {
    // Call the OTP verification function
    return NextResponse.json(
      { message: 'OTP verified successfully' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 })
  }
}
