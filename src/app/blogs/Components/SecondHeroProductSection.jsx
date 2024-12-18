import { ArrowRight } from 'lucide-react'
import React from 'react'

const SecondHeroProductSection = () => {
  return (
    <div className='w-full relative lg:h-[200px]'>
      <img src='' alt='' className='w-full h-full' />
      <div className='absolute left-0 p-3 right-0 bottom-0 h-[60%] bg-gradient-to-b from-transparent to-black'>
        <p>
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
