import React from 'react'

const AnimationSection = () => {
  return (
    <div>
      <div>
        <div className='h-3 bg-pink-500 w-[52%]'></div>
        <div className='h-3 bg-black w-[44%]'></div>
      </div>
      <div className='flex flex-col py-5 justify-center items-center p-3'>
        <p className='text-5xl max-sm:text-3xl font-extrabold'>Clothes2Wear</p>
        <p className='text-xl max-sm:text-sm font-semibold'>
          Shop without looking at your pocket
        </p>
      </div>
      <div className='flex flex-col items-end'>
        <div className='h-3 bg-pink-500 w-[52%]'></div>
        <div className='h-3 bg-black w-[44%]'></div>
      </div>
    </div>
  )
}

export default AnimationSection
