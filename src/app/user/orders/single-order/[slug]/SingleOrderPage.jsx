'use client'

import React from 'react'
import { Truck, Edit, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const demoSingleOrder = {
  orderId: 'ORD001',
  date: '2024-11-10',
  status: 'Delivered',
  items: [
    { name: 'Laptop', quantity: 1, price: 50000 },
    { name: 'Wireless Mouse', quantity: 1, price: 1000 },
  ],
  totalAmount: 51000,
  shippingAddress: {
    line1: 'QTR No 82/A',
    line2: 'West Maligaon, Guwahati',
    pinCode: '781011',
    landmark: 'Near Railway HS School',
    area: 'Boripara Pandu',
  },
  paymentMethod: 'Credit Card',
  paymentStatus: 'Paid',
}

export default function SingleOrderPage() {
  const router = useRouter()

  const handleBackClick = () => {
    router.push('/user/orders')
  }

  return (
    <div className='container mx-auto p-6'>
      <button
        onClick={handleBackClick}
        className='flex items-center gap-1 text-blue-500 hover:gap-3 transition-all duration-300 mb-4'
      >
        <ArrowLeft className='w-5 h-5' /> Back to Orders
      </button>
      <h1 className='text-2xl font-bold mb-4'>
        Order Details - {demoSingleOrder.orderId}
      </h1>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <div className='flex justify-between'>
          <div>
            <p className='font-semibold'>Order ID: {demoSingleOrder.orderId}</p>
            <p className='text-gray-500'>Date: {demoSingleOrder.date}</p>
            <p className='text-gray-500'>Status: {demoSingleOrder.status}</p>
          </div>
          <div>
            <button className='flex items-center gap-2 text-green-500 hover:underline'>
              <Truck className='w-5 h-5' />
              {demoSingleOrder.status}
            </button>
          </div>
        </div>
        <div className='mt-4'>
          <h3 className='text-gray-600 font-medium'>Items:</h3>
          {demoSingleOrder.items.map((item, idx) => (
            <p key={idx}>
              {item.name} x{item.quantity} - ₹{item.price}
            </p>
          ))}
        </div>
        <p className='font-semibold mt-2'>
          Total: ₹{demoSingleOrder.totalAmount}
        </p>

        <div className='mt-6'>
          <h3 className='text-gray-600 font-medium'>Shipping Address:</h3>
          <p>{demoSingleOrder.shippingAddress.line1}</p>
          <p>{demoSingleOrder.shippingAddress.line2}</p>
          <p>{demoSingleOrder.shippingAddress.pinCode}</p>
          <p>{demoSingleOrder.shippingAddress.landmark}</p>
          <p>{demoSingleOrder.shippingAddress.area}</p>
        </div>

        <div className='mt-6'>
          <h3 className='text-gray-600 font-medium'>Payment Details:</h3>
          <p>Payment Method: {demoSingleOrder.paymentMethod}</p>
          <p>Payment Status: {demoSingleOrder.paymentStatus}</p>
        </div>

        <div className='mt-6'>
          <button className='flex items-center gap-2 text-blue-500 hover:underline'>
            <Edit className='w-5 h-5' /> Edit Order
          </button>
        </div>
      </div>
    </div>
  )
}
