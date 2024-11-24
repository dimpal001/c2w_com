import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function DELETE(request) {
  const { id } = await request.json()
  try {
    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 404 })
    }
    const order = await prisma.orderDetails.findUnique({
      where: { id },
    })

    if (
      order.status === 'PENDING' ||
      order.status === 'INCOMPLETE' ||
      order.status === 'SHIPPED' ||
      order.status === 'APPROVED'
    ) {
      return NextResponse.json({
        message: `The order cannot be deleted as its current status is '${order.status}'.`,
      })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  }
}
