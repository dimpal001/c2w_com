/* eslint-disable react/prop-types */
'use client'

import { ArrowLeftCircle, ShoppingBag } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import SingleOrder from './SingleOrder'
import axios from 'axios'

const OrdersPage = () => {
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/users/orders')
      setOrders(response.data)
    } catch {
      // Empty
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const router = useRouter()
  return (
    <div className='container mx-auto p-6 md:max-w-5xl'>
      <div className='flex justify-between items-center mb-8'>
        <div className='flex items-center gap-4'>
          <ShoppingBag className='w-8 h-8 text-pink-600' />
          <h1 className='text-3xl max-sm:text-xl font-semibold'>My Orders</h1>
        </div>
        <button
          onClick={() => router.push('/')}
          className='text-lg text-blue-600 max-sm:text-sm max-sm:gap-1 hover:gap-4 transition-all duration-300 flex items-center gap-2'
        >
          <ArrowLeftCircle size={22} />
          Continue Shopping
        </button>
      </div>
      <div className='flex flex-col gap-5'>
        {orders?.length > 0 &&
          orders?.map((order, index) => (
            <SingleOrder key={index} order={order} />
          ))}
      </div>
    </div>
  )
}

export default OrdersPage
