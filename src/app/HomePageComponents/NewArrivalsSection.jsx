import React from 'react'
import RightArrowIcon from './RightArrowIcon'

const NewArrivalsSection = () => {
  return (
    <div className='container mx-auto pb-10 lg:px-3'>
      <div className='flex items-center'>
        <div className='lg:w-[80%] border border-black px-4'>
          <p className='lg:tracking-[5px] text-black lg:text-[45px] font-bold'>
            NEW ARRIVALS
          </p>
        </div>
        <div className='lg:w-[20%] flex justify-center'>
          <RightArrowIcon className={'lg:w-20'} />
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default NewArrivalsSection
