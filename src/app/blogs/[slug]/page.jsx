import React from 'react'
import Header from '@/app/Components/Header'
import SinglePostPage from './SinglePostPage'
import { blogApi } from '@/app/admin_/components/apis'
import { cdnPath } from '@/app/Components/cdnPath'
import Link from 'next/link'

export async function generateMetadata({ params }) {
  const { slug } = params

  try {
    const response = await fetch(`${blogApi}/posts/post/${slug}`)
    if (!response.ok) {
      throw new Error('Failed to fetch the post')
    }

    const post = await response.json()

    return {
      title: post.title || 'Blog Post',
      description: 'Read our latest blog post.',
      openGraph: {
        title: post?.title || '',
        description: 'Read our latest blog post.',
        url: `https://www.clothes2wear.com/blogs/${slug}`,
        images: [
          {
            url: cdnPath + post?.thumbnailImage || '',
            alt: post.title,
          },
        ],
        type: 'article',
      },
    }
  } catch (error) {
    console.error('Error fetching metadata:', error)
    return {
      title: 'Blog Post',
      description: 'Read our latest blog post.',
    }
  }
}

const PostPage = async ({ params }) => {
  const { slug } = params

  try {
    const response = await fetch(`${blogApi}/posts/post/${slug}`)

    if (!response.ok) {
      throw new Error('Failed to fetch the post')
    }

    const post = await response.json()

    return (
      <div>
        <Header />
        <SinglePostPage post={post} />
      </div>
    )
  } catch (error) {
    console.error('Error fetching post:', error)
    return (
      <div>
        <Header />
        <div className='flex items-center flex-col gap-3 justify-center w-full h-[480px]'>
          <p>Failed to load the blog post. Please try again later.</p>
          <Link href={'/'}>
            <button className='w-64 p-3 rounded-md bg-pink-500 text-white'>
              Back to home
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default PostPage
