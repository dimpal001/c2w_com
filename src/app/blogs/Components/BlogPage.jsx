import React from 'react'
import HeroProductSection from './HeroProductSection'
import SecondHeroProductSection from './SecondHeroProductSection'
import SideProductsSection from './SideProductsSection'

const BlogPage = () => {
  return (
    <div>
      <HeroProductSection />
      <div className='flex gap-2 px-5 py-2'>
        <div className='lg:w-[70%] w-full'>
          <SecondHeroProductSection />
        </div>
        <div className='lg:w-[30%] w-full'>
          <SideProductsSection />
        </div>
      </div>
    </div>
  )
}

export default BlogPage
