/* eslint-disable react/prop-types */
'use client'

import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import PostForm from '../components/PostForm'

const page = () => {
  const [postData, setPostData] = useState({
    title: '',
    userId: '',
    thumbnailImage: '',
    content: '',
    tags: [],
    categories: [],
  })

  useEffect(() => {
    document.title = 'Create blog post'
  }, [])

  return (
    <Layout>
      <div className='p-6 bg-gray-100 min-h-[530px]'>
        <div className='flex items-center justify-between mb-5'>
          <h2 className='text-xl font-semibold text-blue-800'>Create Blog</h2>
          <div className='flex items-center gap-2'></div>
        </div>
        <div className='flex flex-col gap-3 items-start'>
          <PostForm postData={postData} setPostData={setPostData} />
          <Button label={'Save'} />
        </div>
        <div className='mt-2 text-base'></div>
      </div>
    </Layout>
  )
}

export default page
