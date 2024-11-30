import React from 'react'
import RightArrowIcon from './RightArrowIcon'

const NewArrivalsSection = () => {
  return (
    <div className='container mx-auto pb-10 lg:px-3 max-sm:p-5'>
      <div className='flex items-center'>
        <div className='lg:w-[80%] max-sm:w-[75%] border border-black px-4'>
          <p className='lg:tracking-[5px] max-sm:tracking-[5px] max-sm:text-[21px] text-black lg:text-[45px] font-bold max-sm:font-extrabold'>
            NEW ARRIVALS
          </p>
        </div>
        <div className='lg:w-[20%] max-sm:w-[25%] max-sm:ps-3 flex justify-center'>
          <RightArrowIcon className={'lg:w-20 max-sm:w-10'} />
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default NewArrivalsSection
