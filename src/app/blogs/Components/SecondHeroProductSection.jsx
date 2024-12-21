import { ArrowRight } from 'lucide-react'
import React from 'react'

const SecondHeroProductSection = () => {
  return (
    <div className='w-full relative md:h-[400px] h-[300px] rounded-lg rounded-tr-[90px]'>
      <img
        src='https://picsum.photos/531/638'
        alt=''
        className='w-full h-full rounded-lg rounded-tr-[100px] object-cover'
      />
      <div className='absolute rounded-lg left-0 p-7 text-white flex-col justify-end right-0 flex items-end bottom-0 h-[75%] from-5% to-95% bg-gradient-to-b from-transparent to-black'>
        <p className='md:text-2xl text-xl font-semibold'>
          {' '}
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor
          excepturi quae molestiae iusto.
        </p>
        <div className='flex justify-end'>
          <div className='flex items-center gap-5 justify-end'>
            <p>Read more</p>
            <div>
              <ArrowRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecondHeroProductSection
