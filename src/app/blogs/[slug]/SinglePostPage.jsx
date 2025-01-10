/* eslint-disable react/prop-types */
import { cdnPath } from '@/app/Components/cdnPath'
import { Skeleton } from '@nextui-org/skeleton'
import { Facebook, Instagram, Youtube } from 'lucide-react'
import React from 'react'
import NewsletterBox from './NewsletterBox'

const SinglePostPage = ({ post }) => {
  return (
    <div className='min-h-screen'>
      <main className='max-w-7xl relative max-h-screen scrollbar-hide overflow-scroll mx-auto p-6 flex max-sm:flex-col gap-6'>
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
          </div>

          <Skeleton isLoaded={post?.title} className='rounded-lg'>
            <h1 className='text-5xl max-sm:text-3xl max-sm:leading-8 text-[#242424] font-extrabold font-serif mb-2'>
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
        <aside className='w-80 max-sm:w-full sticky top-0 space-y-6'>
          <Skeleton isLoaded={post} className='rounded-lg'>
            <NewsletterBox />
          </Skeleton>

          <Skeleton isLoaded={post} className='rounded-lg'>
            <div className='bg-white shadow-lg rounded-lg p-6'>
              <h2 className='text-xl font-bold mb-4'>Social Connect</h2>
              <div className='flex flex-wrap max-sm:justify-center gap-3 max-sm:gap-5'>
                <Instagram className='w-9 h-9 cursor-pointer hover:text-pink-500' />
                <Facebook className='w-9 h-9 cursor-pointer hover:text-pink-500' />
                <Youtube className='w-9 h-9 cursor-pointer hover:text-pink-500' />
              </div>
            </div>
          </Skeleton>

          <Skeleton isLoaded={post} className='rounded-lg'>
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
          </Skeleton>
        </aside>
      </main>
    </div>
  )
}

export default SinglePostPage
