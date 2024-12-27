import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import slugify from 'slugify'
import { isAdmin } from '../../middleware/adminAuth'
import { cdnPath } from '@/app/Components/cdnPath'

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
    sellerCode,
    tags,
    similarProducts,
    sizeChartId,
    fabricId,
  } = await request.json()

  if (!isAdmin(request)) {
    return NextResponse.json(
      { message: 'Unauthorised access!' },
      { status: 401 }
    )
  }

  try {
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

    const slug = slugify(
      title + '-' + new Date().toISOString().replace(/:/g, '-').slice(0, 19),
      {
        lower: true,
      }
    )

    const staticReturnPolicy = `<p>We appreciate your shopping with us! We are dedicated to providing high-quality clothing at great prices and aim to make the return process as straightforward as possible. If you need to return an item that doesn’t meet your expectations, please follow these steps: ensure the item is in its original, unworn condition with all tags attached, locate your receipt or order number, and initiate the return online through our website. For any questions or assistance, our customer service team is ready to help. Please adhere to the following steps to know our return policy correctly:</p><p></p><p><strong>How can I return an item that doesn't meet my expectations?</strong> Email us at <a target="_blank" rel="noopener noreferrer nofollow" class="text-first underline" href="mailto:contact@clothes2wear.com">contact@clothes2wear.com</a> for requesting a return. If you wish to ask for a replacement and after thorough verification if the replacement is accepted by the concerned team, you will receive a return mailing label and instructions on how to send your merchandise. The returned goods will not be accepted if the request for replacement is not done beforehand.</p><p></p><p><strong>What is the time frame allowed for returning items?</strong> Within five working days of delivery, items must be returned for exchange or a replacement. To qualify for a replacement, you must record an unboxing video upon receiving the product. The product must be in its original packaging, unworn, and undamaged.</p><p></p><p><strong>Condition of the Product</strong></p><p>-&gt; Please handle clothing items with care during try-ons and ensure they are returned in their original, unused condition, free from any marks, odors, or damage.</p><p>-&gt; Product tags or ticket attachments must be included when returning items in their original packaging.</p><p>-&gt; Since most of our items are hand-embroidered and delicate, occasional displacement of beads or sequins may occur. This is normal and not considered a fault.</p><p></p><p><strong>Product Care</strong></p><p>-&gt; For the initial wash, please make sure to use 'Dry Clean' only.</p><p>-&gt; Items with heavy embroidery must be dry-cleaned exclusively.</p><p>-&gt; Be aware that hand-dyeing methods may affect color permanence and are not guaranteed.</p><p></p><p><strong>NOTE:</strong> If the conditions mentioned above are not fulfilled, the product will not be considered eligible for return or replacement. When in doubt, opt for dry cleaning to maintain garment quality.</p>`

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
        ogImage: cdnPath + thumbnailUrl,
        displayPrice: parseFloat(displayPrice),
        summary,
        sellerCode: sellerCode ? sellerCode : null,
        fabricId: fabricId ? fabricId : null,
        sizeChartId: sizeChartId ? sizeChartId : null,
        customerTypeId,
        returnPolicy: staticReturnPolicy,
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
    console.log(error.message)
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  }
}
