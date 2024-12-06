'use client'

/* eslint-disable react/prop-types */
import {
  Ban,
  CircleCheck,
  CircleDashed,
  PackageCheck,
  Truck,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const SingleOrder = ({ order }) => {
  const router = useRouter()
  return (
    <div className='border rounded-sm bg-white border-zinc-100 shadow-md p-5'>
      <div className='flex lg:items-start gap-3 max-sm:flex-col'>
        <div className='lg:w-[50%] max-sm:w-full flex items-start gap-3'>
          <img
            src={order?.orderItems[0]?.product?.thumbnailUrl}
            className='lg:w-[150px] lg:h-[150px] max-sm:w-[100px] max-sm:h-[140px] rounded-xl'
            alt=''
          />
          <div className='py-2 flex flex-col gap-1'>
            <p className='font-semibold max-sm:text-sm'>
              {order?.orderItems[0]?.product?.title}
            </p>
            <p className='text-xs max-sm:text-[10px] text-pink-500'>
              Estimated delivery date :{' '}
              {new Date(order?.createdAt).toDateString()}
            </p>
            {order?.orderItems.length > 1 && (
              <p className='text-neutral-500 max-sm:text-[10px]'>
                {' '}
                & {order?.orderItems.length - 1} more
              </p>
            )}
            <div
              className={`mt-2 text-sm max-sm:text-xs max-sm:mt-1 font-semibold capitalize 
                            ${order.status === 'PENDING' && 'text-yellow-600'} 
                            ${order.status === 'INCOMPLETE' && 'text-red-600'} 
                            ${order.status === 'CANCELLED' && 'text-red-600'} 
                            ${order.status === 'DELIVERED' && 'text-green-600'} 
                            ${order.status === 'APPROVED' && 'text-green-600'} 
                            ${order.status === 'SHIPPED' && 'text-blue-600'} 
                            ${order.status === 'INTRANSIT' && 'text-blue-600'} 
                            
                            `}
            >
              <p className='flex items-center gap-1'>
                {order.status}
                {order.status === 'DELIVERED' && (
                  <PackageCheck size={20} className='text-green-600' />
                )}
                {(order.status === 'INTRANSIT' ||
                  order.status === 'SHIPPED') && (
                  <Truck size={20} className='text-blue-800' />
                )}
                {order.status === 'CANCELLED' && (
                  <Ban size={20} className='text-red-600' />
                )}
                {order.status === 'APPROVED' && (
                  <CircleCheck size={20} className='text-green-600' />
                )}
                {order.status === 'PENDING' && (
                  <CircleDashed size={20} className='text-yellow-600' />
                )}
              </p>
            </div>
          </div>
        </div>
        <div className='lg:w-[25%]'>
          <div className='bg-neutral-100 rounded-sm p-3'>
            <p className='font-bold'>Address</p>
            <div className='text-sm mt-2'>
              <p>{order?.address?.addressLine1}</p>
              {order?.address?.addressLine2 && (
                <p>{order?.address?.addressLine2}</p>
              )}
              <p>
                {order?.address?.zipCode}, {order?.address?.state},{' '}
                {order?.address?.country}
              </p>
            </div>
          </div>
        </div>
        <div className='lg:w-[25%] max-sm:w-full flex flex-col items-center lg:justify-center'>
          <div className='flex flex-col lf:items-center w-full'>
            <p className='text-neutral-500 font-semibold max-sm:text-xs text-sm'>
              Order ID
            </p>
            <p className='font-bold italic max-sm:text-sm'>#{order?.orderId}</p>
          </div>
          <div className='flex flex-col gap-2 mt-2 max-sm:flex-row'>
            <button
              onClick={() => router.push(`/user/orders/invoice/${order.id}`)}
              className='bg-gradient-to-b from-pink-500 to-pink-200 text-white px-10 py-1 text-sm font-semibold rounded-[5px]'
            >
              Invoice
            </button>
            <button
              onClick={() => router.push(`/user/my-orders/${order.orderId}`)}
              className='bg-black text-white px-10 py-1 text-sm font-semibold rounded-[5px]'
            >
              Track Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleOrder
