import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import slugify from 'slugify'
import { isAdmin } from '../../middleware/adminAuth'

const prisma = new PrismaClient()

async function generateUniqueStyleId() {
  let styleId = 'C2W' + Math.floor(Math.random() * 900000 + 100000)

  const existingProduct = await prisma.product.findUnique({
    where: { styleId },
  })

  while (existingProduct) {
    styleId = 'C2W' + Math.floor(Math.random() * 900000 + 100000)
    await prisma.product.findUnique({
      where: { styleId },
    })
  }

  return styleId
}

async function generateUniqueAffiliateId() {
  let uniqueId = generateRandomId()

  let existingProduct = await prisma.product.findUnique({
    where: { affiliateId: uniqueId },
  })

  while (existingProduct) {
    uniqueId = generateRandomId()
    existingProduct = await prisma.product.findUnique({
      where: { affiliateId: uniqueId },
    })
  }

  return uniqueId
}

function generateRandomId() {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let id = ''
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    id += characters[randomIndex]
  }
  return id
}

export async function POST(request) {
  const {
    title,
    categories,
    subcategories,
    longTailKeyword,
    inventory,
    summary,
    description,
    discounts,
    displayPrice,
    estimatedDeliveryDay,
    images = [],
    isReturnable = false,
    customerTypeId,
    userId,
    returnPolicy,
    tags,
    similarProducts,
  } = await request.json()

  if (!isAdmin(request)) {
    return NextResponse.json(
      { message: 'Unauthorised access!' },
      { status: 401 }
    )
  }

  try {
    const slug = slugify(title + '-' + new Date().toISOString().slice(0, 10), {
      lower: true,
    })

    const styleId = await generateUniqueStyleId()
    const affiliateId = await generateUniqueAffiliateId()

    const thumbnailUrl = images.length > 0 ? images[0].imageUrl : ''

    const newProduct = await prisma.product.create({
      data: {
        title,
        slug,
        affiliateId,
        styleId,
        thumbnailUrl,
        longTailKeyword,
        estimatedDeliveryDay: parseInt(estimatedDeliveryDay),
        isActive: false,
        isReturnable,
        description,
        displayPrice: parseFloat(displayPrice),
        summary,
        customerTypeId,
        returnPolicy,
        userId,
        tags,
        images:
          images.length > 0
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
          connect: subcategories.map((subcategory) => ({ id: subcategory.id })),
        },
        discounts: {
          connect: discounts.map((item) => ({ id: item.id })),
        },
        inventory: inventory.length > 0 && {
          create: inventory.map(
            ({ size, mrp, price, stock, discount, minQuantity }) => ({
              price: parseFloat(price),
              mrp: parseFloat(mrp),
              stock: parseFloat(stock),
              discount: parseFloat(discount),
              minQuantity: parseInt(minQuantity),
              sizeId: size.id,
            })
          ),
        },
        similarProducts: {
          connect: similarProducts.map((product) => ({ id: product.id })),
        },
      },
    })

    return NextResponse.json(
      { product: newProduct, message: 'The product has been added.' },
      { status: 201 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  }
}
