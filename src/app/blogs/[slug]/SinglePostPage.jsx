/* eslint-disable react/prop-types */
import { cdnPath } from '@/app/Components/cdnPath'
import { Skeleton } from '@nextui-org/skeleton'
import { Facebook, Instagram, Youtube } from 'lucide-react'
import React from 'react'

const SinglePostPage = ({ post }) => {
  return (
    <div className='min-h-screen'>
      <main className='max-w-7xl relative max-h-screen scrollbar-hide overflow-scroll mx-auto p-6 flex gap-6'>
        {/* Main Content */}
        <div className='flex-1'>
          <div className='mb-6'>
            <Skeleton isLoaded={post?.thumbnailImage} className='rounded-lg'>
              <img
                src={cdnPath + post?.thumbnailImage}
                alt={post?.title}
                className='w-full object-cover aspect-video rounded-lg shadow-md'
              />
            </Skeleton>
            <div className='absolute top-4 left-4 bg-white text-pink-500 text-sm px-3 py-1 rounded-full shadow-md'>
              {post?.tags[0]}
            </div>
          </div>

          <Skeleton isLoaded={post?.title} className='rounded-lg'>
            <h1 className='text-5xl text-[#242424] font-extrabold font-serif mb-2'>
              {post?.title}
            </h1>
          </Skeleton>
          <Skeleton isLoaded={post?.createdAt} className='rounded-lg my-2'>
            <div className='flex items-center text-gray-500 text-sm my-5'>
              <span>{new Date(post?.createdAt).toDateString()}</span>
              <span className='mx-2'>•</span>
              <span>{post?.readTime}</span>
            </div>
          </Skeleton>

          <Skeleton isLoaded={post?.content}>
            {post?.content && (
              <article className='prose lg:prose-lg mb-12'>
                <div
                  className='editor-content text-[#2b2424] text-2xl font-serif'
                  dangerouslySetInnerHTML={{ __html: post?.content }}
                />
              </article>
            )}
          </Skeleton>
        </div>

        {/* Sidebar */}
        <aside className='w-80 sticky top-0 space-y-6'>
          {/* Newsletter Box */}
          <div className='bg-pink-500 text-white shadow-md rounded-lg p-6'>
            <h2 className='text-xl font-bold mb-4'>
              Subscribe to our Newsletter
            </h2>
            <p className='text-gray-50 mb-4'>
              Get the latest posts delivered straight to your inbox!
            </p>
            <form>
              <input
                type='email'
                placeholder='Enter your email'
                className='w-full px-4 py-2 border rounded-md mb-4'
              />
              <button
                type='submit'
                className='w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition'
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className='bg-white shadow-lg rounded-lg p-6'>
            <h2 className='text-xl font-bold mb-4'>Social Connect</h2>
            <div className='flex flex-wrap gap-3'>
              <Instagram className='w-9 h-9 cursor-pointer hover:text-pink-500' />
              <Facebook className='w-9 h-9 cursor-pointer hover:text-pink-500' />
              <Youtube className='w-9 h-9 cursor-pointer hover:text-pink-500' />
            </div>
          </div>

          <div className='bg-white shadow-lg rounded-lg p-6'>
            <h2 className='text-xl font-bold mb-4'>Tags</h2>
            <div className='flex flex-wrap gap-2'>
              {post?.tags?.map((tag, index) => (
                <span
                  key={index}
                  className='bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm shadow-sm'
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  )
}

export default SinglePostPage
