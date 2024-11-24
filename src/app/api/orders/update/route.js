import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function PATCH(request) {
  try {
    const { id, status, trackingId, notes } = await request.json()

    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 })
    }

    const order = await prisma.orderDetails.update({
      where: { id },
      data: {
        status,
        trackingId,
        notes,
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    })

    return NextResponse.json(order, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong, try again' },
      { status: 500 }
    )
  }
}
