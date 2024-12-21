import React from 'react'
import HeroProductSection from './HeroProductSection'
import SecondHeroProductSection from './SecondHeroProductSection'
import SideProductsSection from './SideProductsSection'
import BlogCard from './BlogCard'

const BlogPage = () => {
  return (
    <div className='bg-gray-50'>
      <HeroProductSection />
      <div className='flex max-sm:flex-col gap-2 px-5 py-2'>
        <div className='md:w-[70%] w-full'>
          <SecondHeroProductSection />
        </div>
        <div className='md:w-[30%] w-full'>
          <SideProductsSection />
        </div>
      </div>

      {/* Seasonal Blogs Section  */}
      <div className='p-4'>
        <div className='p-2 py-7'>
          <h3 className='text-3xl font-semibold'>Seasonal Blogs</h3>
          <p className='text-sm font-semibold text-stone-400'>
            We post seasonal blogs for you only
          </p>
        </div>
        <div className='grid md:grid-cols-4 grid-cols-1 gap-4'>
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </div>
  )
}

export default BlogPage
