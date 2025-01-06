/* eslint-disable react/prop-types */
import { CircleCheck, Info, LoaderCircle } from 'lucide-react'
import React from 'react'

const CouponCode = ({
  couponCode,
  setCouponCode,
  applyCoupon,
  message,
  applying = true,
  discountData,
  isSuccess,
}) => {
  return (
    <div className='bg-zinc-100 p-6 rounded-lg'>
      <h2 className='text-xl font-semibold mb-4'>Have a Coupon?</h2>
      <div className='flex items-center space-x-4'>
        <input
          type='text'
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder='Enter coupon code'
          className='w-full p-2 border placeholder:text-sm placeholder:capitalize uppercase rounded-lg'
        />
        <button
          onClick={applyCoupon}
          className='bg-pink-500 text-white p-2 rounded-lg hover:bg-pink-600'
        >
          {applying ? <LoaderCircle className='animate-spin' /> : 'Apply'}
        </button>
      </div>
      {message && (
        <div
          className={`text-xs flex items-center gap-1 mt-2 ${
            isSuccess ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {isSuccess ? <CircleCheck size={16} /> : <Info size={16} />}
          <p>{message}</p>
        </div>
      )}
      <div>
        {discountData && (
          <p className='p-3 border border-pink-300 rounded-lg text-sm mt-2 text-pink-600'>
            {discountData.description}
          </p>
        )}
      </div>
    </div>
  )
}

export default CouponCode
