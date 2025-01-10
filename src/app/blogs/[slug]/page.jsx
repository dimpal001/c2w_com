import React from 'react'
import Header from '@/app/Components/Header'
import SinglePostPage from './SinglePostPage'
import { blogApi } from '@/app/admin_/components/apis'

const PostPage = async ({ params }) => {
  const { slug } = await params

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
        <p>Failed to load the blog post. Please try again later.</p>
      </div>
    )
  }
}

export default PostPage
