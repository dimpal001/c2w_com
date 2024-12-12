import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { isAuth } from '@/app/api/middleware/auth'

const prisma = new PrismaClient()

export async function PATCH(request) {
  const { id, firstName, lastName, mobileNumber, whatsAppNumber } =
    await request.json()

  if (!isAuth(request)) {
    return NextResponse.json(
      { message: 'Unauthorised access!' },
      { status: 401 }
    )
  }

  try {
    if (!id) {
      return NextResponse.json({ message: 'ID is required!' }, { status: 400 })
    }

    if (!firstName) {
      return NextResponse.json(
        { message: 'First name is required!' },
        { status: 400 }
      )
    }

    if (!lastName) {
      return NextResponse.json(
        { message: 'Last name is required!' },
        { status: 400 }
      )
    }

    if (mobileNumber && mobileNumber.length !== 10) {
      return NextResponse.json(
        { message: 'Mobile number must have exactly 10 digits!' },
        { status: 400 }
      )
    }

    if (whatsAppNumber && whatsAppNumber.length !== 10) {
      return NextResponse.json(
        { message: 'WhatsApp number must have exactly 10 digits!' },
        { status: 400 }
      )
    }

    // Update the isActive field for the specified product
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
        mobileNumber,
        whatsAppNumber,
      },
    })

    return NextResponse.json(
      {
        user: updatedUser,
        message: `User data has been updated!.`,
      },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
