import React from 'react'

const CouponSecion = () => {
  return (
    <div className='rounded-lg p-5 bg-pink-200'>
      <div className='flex justify-evenly gap-10 max-w-full scrollbar-hide overflow-x-scroll'>
        <CouponCard />
        <CouponCard />
        <CouponCard />
        <CouponCard />
        <CouponCard />
      </div>
    </div>
  )
}

const CouponCard = () => {
  return (
    <div>
      <p className='font-semibold text-xl max-sm:text-base max-sm:w-[100px]'>
        25% OFF
      </p>
      <p className='text-base max-sm:text-sm'>Discount</p>
      <p className='text-xs max-sm:text-[10px]'>Wedding clothes for women</p>
    </div>
  )
}

export default CouponSecion
