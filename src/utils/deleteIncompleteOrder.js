import { PrismaClient } from '@prisma/client'
import cron from 'node-cron'

const prisma = new PrismaClient()

const deleteIncompleteOrders = async () => {
  try {
    const oldIncompleteOrders = await prisma.orderDetails.findMany({
      where: {
        status: 'INCOMPLETE',
        createdAt: {
          lt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
      include: {
        orderItems: true,
      },
    })

    for (const order of oldIncompleteOrders) {
      for (const item of order.orderItems) {
        await prisma.productInventory.update({
          where: {
            productId_sizeId: {
              productId: item.productId,
              sizeId: item.sizeId || null,
            },
          },
          data: {
            stock: {
              increment: item.quantity,
            },
          },
        })
      }

      await prisma.orderDetails.delete({
        where: {
          id: order.id,
        },
      })
    }
  } catch {
    // Empty
  } finally {
    await prisma.$disconnect()
  }
}

cron.schedule('0 0 * * *', deleteIncompleteOrders)
