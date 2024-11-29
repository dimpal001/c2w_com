import React from 'react'

const CouponSecion = () => {
  return (
    <div className='rounded-lg p-5 bg-pink-200'>
      <div className='flex justify-evenly gap-10 max-w-full overflow-x-scroll'>
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
      <p className='font-semibold text-xl'>25% OFF</p>
      <p className='text-base'>Discount</p>
      <p className='text-xs'>Wedding clothes for women</p>
    </div>
  )
}

export default CouponSecion
