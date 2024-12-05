/* eslint-disable react/prop-types */
import React from 'react'

const SingleOrder = ({ order }) => {
  return (
    <div className='border rounded-xl bg-zinc-100 p-6'>
      <div className='flex lg:items-center gap-3 max-sm:flex-col'>
        <div className='lg:w-[50%] flex items-start gap-3'>
          <img
            src={order?.orderItems[0].product.thumbnailUrl}
            className='w-full h-full rounded-xl'
            alt=''
          />
          <div>
            <p>{order?.orderItems[0]?.product?.title}</p>
            <p>
              Estimated delivery date :{' '}
              {new Date(order?.createdAt).toDateString()}
            </p>
            {order?.orderItems.length > 1 && (
              <p>{order?.orderItems.length - 1} more</p>
            )}
          </div>
        </div>
        <div className='lg:w-[25%]'>
          <div className='bg-zinc-200 rounded-xl p-3'>
            <p>Address</p>
            <div>
              <p>{order?.address?.addressLine1}</p>
              {order?.address?.addressLine2 && (
                <p>{order?.address?.addressLine2}</p>
              )}
              <p>
                {order?.address?.state}, {order?.address?.zipCode},{' '}
                {order?.address?.country}
              </p>
            </div>
          </div>
        </div>
        <div className='lg:w-[25%]'></div>
      </div>
      <div></div>
    </div>
  )
}

export default SingleOrder
