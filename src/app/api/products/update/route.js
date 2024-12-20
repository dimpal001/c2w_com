import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(request) {
  const {
    productId,
    title,
    categories,
    subcategories,
    longTailKeyword,
    inventory,
    summary,
    sellerCode,
    description,
    displayPrice,
    discounts,
    estimatedDeliveryDay,
    images,
    isReturnable = false,
    customerTypeId,
    returnPolicy,
    userId,
    tags,
    similarProducts,
    sizeChartId,
  } = await request.json()

  try {
    // Fetch existing product details
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        inventory: true,
        categories: true,
        images: true,
      },
    })

    if (!existingProduct) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      )
    }

    if (!title) {
      return NextResponse.json(
        { message: 'Please provide a title for the product.' },
        { status: 400 }
      )
    }

    if (categories.length === 0) {
      return NextResponse.json(
        { message: 'At least one category must be selected.' },
        { status: 400 }
      )
    }

    if (inventory.length === 0) {
      return NextResponse.json(
        { message: 'Please add inventory details for the product.' },
        { status: 400 }
      )
    }

    if (!summary) {
      return NextResponse.json(
        { message: 'A summary of the product is required.' },
        { status: 400 }
      )
    }

    if (!description) {
      return NextResponse.json(
        { message: 'A brief description of the product is required.' },
        { status: 400 }
      )
    }

    if (images.length === 0) {
      return NextResponse.json(
        { message: 'Please upload at least one image of the product.' },
        { status: 400 }
      )
    }

    if (!displayPrice) {
      return NextResponse.json(
        { message: 'Display price of the product is required.' },
        { status: 400 }
      )
    }

    // Update or replace inventory
    const newInventory = inventory.map(
      ({ size, mrp, price, stock, discount, minQuantity }) => ({
        price: parseFloat(price),
        mrp: parseFloat(mrp),
        stock: parseFloat(stock),
        discount: parseFloat(discount),
        minQuantity: parseInt(minQuantity),
        sizeId: size.id,
      })
    )

    // Start a transaction to update product details
    await prisma.$transaction([
      prisma.productImage.deleteMany({
        where: { productId },
      }),

      // Update the product with new data
      prisma.product.update({
        where: { id: productId },
        data: {
          title,
          estimatedDeliveryDay,
          longTailKeyword,
          isReturnable,
          description,
          displayPrice: parseFloat(displayPrice),
          summary,
          customerTypeId,
          userId,
          sellerCode,
          returnPolicy,
          sizeChartId,
          tags,
          images:
            images && images.length > 0
              ? {
                  create: images.map(({ imageUrl, color, altText }) => ({
                    imageUrl,
                    colorId: color,
                    altText: altText,
                  })),
                }
              : undefined,
          categories: {
            connect: categories.map((category) => ({ id: category.id })),
          },
          subcategories: {
            connect: subcategories.map((subcategory) => ({
              id: subcategory.id,
            })),
          },
          discounts: {
            connect: discounts.map((discount) => ({ id: discount.id })),
          },
          inventory: {
            deleteMany: { productId },
            createMany: {
              data: newInventory,
            },
          },
          similarProducts: {
            connect: similarProducts.map((product) => ({ id: product.id })),
          },
        },
      }),
    ])

    return NextResponse.json(
      { message: 'Product updated successfully!' },
      { status: 200 }
    )
  } catch (error) {
    console.log(error.message || 'Something went wrong')
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
