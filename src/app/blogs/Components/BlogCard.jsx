import React from 'react'

const BlogCard = () => {
  return (
    <div className='bg-white rounded-lg p-2 shadow-lg'>
      <img
        src='https://picsum.photos/454/747'
        className='lg:w-[343px] lg:h-[280px] w-[344px] h-[240px] object-cover rounded-lg'
        alt=''
      />
      <div className='pt-3 pb-1 max-sm:p-3'>
        <p className='text-xl font-semibold hover:underline cursor-pointer hover:text-pink-500'>
          Lorem ipsum dolor sit amet consectetur.
        </p>
        <p className='text-sm text-stone-400 text-end'>12 hours ago</p>
      </div>
    </div>
  )
}

export default BlogCard
