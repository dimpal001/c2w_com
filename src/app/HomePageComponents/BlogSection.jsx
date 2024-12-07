/* eslint-disable react/prop-types */
import React from 'react'
import RightArrowIcon from './RightArrowIcon'
import { cdnPath } from '../Components/cdnPath'
import Link from 'next/link'

const BlogSection = ({ blogs }) => {
  return (
    <div>
      <div className='flex py-7 max-sm:flex-col max-sm:gap-4'>
        {blogs.length > 0 &&
          blogs.slice(0, 2).map((blog, index) => (
            <Link
              href={blog.hyperLink}
              target='_blank'
              key={index}
              className='cursor-pointer group lg:w-[50%]'
            >
              <img
                src={cdnPath + blog.imageUrl}
                className='w-full'
                alt={blog.title}
              />
              <h3 className='text-4xl max-sm:text-xl group-hover:underline font-bold'>
                {blog.title}
              </h3>
              <p className='text-xl max-sm:text-sm lg:pe-3 text-neutral-500'>
                {blog.description}
              </p>
            </Link>
          ))}
      </div>
      <div className='flex justify-end lg:px-5'>
        <div className='p-4 px-10 bg-black flex items-center justify-center gap-4 text-3xl max-sm:text-xl font-semibold text-white'>
          <p>Our Blogs</p>
          <RightArrowIcon className={'w-10 max-sm:w-6'} fill={'white'} />
        </div>
      </div>
    </div>
  )
}

export default BlogSection
