import { isAdmin } from '@/app/api/middleware/adminAuth'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorized access!' },
        { status: 401 }
      )
    }

    const { shopByOccasionId, imageUrl, hyperLink } = await request.json()

    const product = await prisma.shopByOccasionProduct.create({
      data: {
        shopByOccasionId,
        imageUrl,
        hyperLink,
      },
    })

    return NextResponse.json(
      { message: 'Occasion product has been added.', product },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Somethings went wrong, try again!' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const products = await prisma.shopByOccasionProduct.findMany()

    return NextResponse.json(products, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong, try again' },
      { status: 500 }
    )
  }
}

export async function PATCH(request) {
  const { id, imageUrl, hyperLink } = await request.json()

  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorized access!' },
        { status: 401 }
      )
    }

    if (!id) {
      return NextResponse.json({ message: 'ID is required!' }, { status: 400 })
    }

    await prisma.shopByOccasionProduct.update({
      where: { id },
      data: {
        imageUrl,
        hyperLink,
      },
    })

    return NextResponse.json(
      { message: 'Occasion product has been updated.' },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong, try again' },
      { status: 500 }
    )
  }
}

export async function DELETE(request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { message: 'Unauthorized access!' },
        { status: 401 }
      )
    }

    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ message: 'ID is required.' }, { status: 400 })
    }

    const occasion = await prisma.shopByOccasionProduct.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Occasion product deleted successfully.', occasion },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong, try again.' },
      { status: 500 }
    )
  }
}
