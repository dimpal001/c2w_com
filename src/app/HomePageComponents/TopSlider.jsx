import { TruckIcon } from 'lucide-react'
import React from 'react'

const TopSlider = () => {
  return (
    <div className='bg-black p-2 text-white flex justify-center items-center gap-5'>
      <TruckIcon className='' />
      <p className='text-sm'>
        Special 25% Discount on First Order. Use - CW52481
      </p>
    </div>
  )
}

export default TopSlider
