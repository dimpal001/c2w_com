/* eslint-disable react/prop-types */
import React from 'react'

const PaymentSelector = ({ paymentMode, setPaymentMode }) => {
  return (
    <div className='bg-zinc-100 p-6 rounded-lg'>
      <h2 className='text-xl font-semibold mb-4'>Select Payment Method</h2>
      <div className='space-y-4'>
        <label className='flex items-center gap-2 cursor-pointer'>
          <input
            type='radio'
            name='payment'
            value='COD'
            checked={paymentMode === 'COD'}
            onChange={() => setPaymentMode('COD')}
            className='accent-pink-500'
          />
          <span className='text-gray-700'>Cash on Delivery</span>
        </label>

        <label className='flex items-center gap-2 cursor-pointer'>
          <input
            type='radio'
            name='payment'
            value='ONLINE'
            checked={paymentMode === 'ONLINE'}
            onChange={() => setPaymentMode('ONLINE')}
            className='accent-pink-500'
          />
          <span className='text-gray-700'>Online Payment</span>
        </label>
      </div>
    </div>
  )
}

export default PaymentSelector
