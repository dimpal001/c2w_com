import React from 'react'
import HeroProductSection from './HeroProductSection'
import SecondHeroProductSection from './SecondHeroProductSection'
import SideProductsSection from './SideProductsSection'

const BlogPage = () => {
  return (
    <div>
      <HeroProductSection />
      <div className='flex gap-2'>
        <div className='lg:w-[60%] w-full'>
          <SecondHeroProductSection />
        </div>
        <div className='lg:w-[40%] w-full'>
          <SideProductsSection />
        </div>
      </div>
    </div>
  )
}

export default BlogPage
