import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function DELETE(request) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ message: 'Id is required' }, { status: 404 })
    }

    await prisma.shopBySeasonProduct.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Product has been deleted' },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something is wrong, try again!' },
      { status: 500 }
    )
  }
}
