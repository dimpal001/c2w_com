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
        images: true,
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
      ({ size, mrp, price, stock, discount, minQuantity }) => ({
        price: parseFloat(price),
        mrp: parseFloat(mrp),
        stock: parseFloat(stock),
        discount: parseFloat(discount),
        minQuantity: parseInt(minQuantity),
        sizeId: size.id,
      })
    )

    console.log(images)

    // Start a transaction to update product details
    await prisma.$transaction([
      // Delete old images if new images are provided
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
          returnPolicy,
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
    console.error(error)
    return NextResponse.json({ message: error.message }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
