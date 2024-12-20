'use client'

import React from 'react'
import { Truck } from 'lucide-react'
import { useRouter } from 'next/navigation'

const demoOrders = [
  {
    orderId: 'ORD001',
    date: '2024-11-10',
    status: 'Delivered',
    items: [
      { name: 'Laptop', quantity: 1, price: 50000 },
      { name: 'Wireless Mouse', quantity: 1, price: 1000 },
    ],
    totalAmount: 51000,
  },
  {
    orderId: 'ORD002',
    date: '2024-11-12',
    status: 'Pending',
    items: [
      { name: 'Smartphone', quantity: 1, price: 25000 },
      { name: 'Headphones', quantity: 1, price: 3000 },
    ],
    totalAmount: 28000,
  },
  {
    orderId: 'ORD003',
    date: '2024-11-15',
    status: 'Shipped',
    items: [
      { name: 'Smart Watch', quantity: 1, price: 5000 },
      { name: 'Charger', quantity: 1, price: 500 },
    ],
    totalAmount: 5500,
  },
]

export default function OrdersPage() {
  const router = useRouter()

  const handleOrderClick = (orderId) => {
    router.push(`/user/orders/single-order/${orderId}`)
  }

  return (
    <div className='container mx-auto p-6 md:max-w-5xl'>
      <h1 className='text-3xl max-sm:text-2xl font-bold mb-4'>My Orders</h1>
      {demoOrders.map((order, index) => (
        <div
          key={index}
          className='bg-white p-4 rounded-lg shadow-md mb-4 cursor-pointer hover:bg-gray-50'
          onClick={() => handleOrderClick(order.orderId)}
        >
          <div className='flex justify-between items-center'>
            <div>
              <p className='font-semibold'>Order ID: {order.orderId}</p>
              <p className='text-gray-500'>Date: {order.date}</p>
              <p className='text-gray-500'>Status: {order.status}</p>
            </div>
            <div>
              <button className='flex items-center gap-2 text-blue-500 hover:underline'>
                <Truck className='w-5 h-5' />
                {order.status}
              </button>
            </div>
          </div>
          <div className='mt-2'>
            <h3 className='text-gray-600 font-medium'>Items:</h3>
            {order.items.map((item, idx) => (
              <p key={idx}>
                {item.name} x{item.quantity} - ₹{item.price}
              </p>
            ))}
          </div>
          <p className='font-semibold mt-2'>Total: ₹{order.totalAmount}</p>
        </div>
      ))}
    </div>
  )
}
