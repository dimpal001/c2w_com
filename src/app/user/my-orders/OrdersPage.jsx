/* eslint-disable react/prop-types */
'use client'

import { ArrowLeftCircle, ShoppingBag } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import SingleOrder from './SingleOrder'

const OrdersPage = ({ orders }) => {
  const router = useRouter()
  return (
    <div className='container mx-auto p-6 lg:max-w-5xl'>
      <div className='flex justify-between items-center mb-8'>
        <div className='flex items-center gap-4'>
          <ShoppingBag className='w-8 h-8 text-pink-600' />
          <h1 className='text-3xl max-sm:text-2xl font-semibold'>My Orders</h1>
        </div>
        <button
          onClick={() => router.push('/')}
          className='text-lg text-blue-600 flex items-center gap-2'
        >
          <ArrowLeftCircle size={22} />
          Continue Shopping
        </button>
      </div>
      <div>
        {orders?.map((order, index) => (
          <SingleOrder key={index} order={order} />
        ))}
      </div>
    </div>
  )
}

export default OrdersPage
