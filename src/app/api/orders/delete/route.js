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
      order.status === 'SHIPPED' ||
      order.status === 'INTRANSIT' ||
      order.status === 'APPROVED'
    ) {
      return NextResponse.json(
        {
          message: `The order cannot be deleted as its current status is '${order.status}'.`,
        },
        { status: 400 }
      )
    }

    await prisma.orderDetails.delete({ where: { id } })

    return NextResponse.json(
      { message: 'Order has been deleted!' },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  }
}
