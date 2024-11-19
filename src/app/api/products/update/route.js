import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(request) {
  const {
    productId,
    title,
    categories,
    inventory,
    summary,
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
  } = await request.json()

  try {
    // Fetch existing product details
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        inventory: true,
        categories: true,
      },
    })

    if (!existingProduct) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      )
    }

    console.log(inventory)

    // Update or replace inventory
    const newInventory = inventory.map(
      ({ size, mrp, price, stock, minQuantity }) => ({
        price: parseInt(price),
        mrp: parseInt(mrp),
        stock: parseInt(stock),
        minQuantity: parseInt(minQuantity),
        sizeId: size.id,
      })
    )

    // Start a transaction to update product details
    await prisma.product.update({
      where: { id: productId },
      data: {
        title,
        estimatedDeliveryDay,
        isReturnable,
        description,
        displayPrice: parseFloat(displayPrice),
        summary,
        customerTypeId,
        userId,
        returnPolicy,
        tags,
        images:
          images.length > 0
            ? {
                create: images.map(({ imageUrl, color }) => ({
                  imageUrl,
                  colorId: color,
                })),
              }
            : undefined,
        categories: {
          connect: categories.map((category) => ({ id: category.id })),
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
    })

    return NextResponse.json(
      { message: 'Product updated successfully!' },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: error.message }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
