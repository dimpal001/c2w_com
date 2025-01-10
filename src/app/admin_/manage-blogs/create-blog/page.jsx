/* eslint-disable react/prop-types */
'use client'

import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import PostForm from '../components/PostForm'
import PreviewBlogPage from '../components/PreviewBlogPage'
import { enqueueSnackbar } from 'notistack'
import axios from 'axios'
import { blogApi } from '../../components/apis'

const page = () => {
  const [postData, setPostData] = useState({
    title: '',
    userId: '',
    thumbnailImage: '',
    content: '',
    tags: [],
    categories: [],
  })

  const [showPreviewPost, setShowPreviewPost] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    document.title = 'Create Blog Post || Clothes2wear'
  }, [])

  const handleSubmit = async () => {
    const storedData = JSON.parse(localStorage.getItem('user'))
    console.log(postData)
    const updatedData = {
      ...postData,
      userId: storedData.id,
    }

    try {
      setSubmitting(true)
      const response = await axios.post(
        `${blogApi}/posts`,
        {
          title: updatedData?.title,
          userId: storedData?.id,
          thumbnailImage: updatedData?.thumbnailImage,
          content: updatedData?.content,
          categories: updatedData?.categories,
          tags: updatedData?.tags,
        },
        {
          headers: {
            Authorization: `Bearer ${storedData?.token}`,
          },
        }
      )

      enqueueSnackbar(
        response?.data?.message ||
          'Blog post has been created! Ready to publish',
        { variant: 'success' }
      )
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Layout>
      <div className='p-6 bg-gray-100 min-h-[530px]'>
        <div className='flex items-center justify-between mb-5'>
          <h2 className='text-xl font-semibold text-blue-800'>Create Blog</h2>
        </div>
        <div className='flex flex-col relative h-[500px] gap-3 items-start'>
          <div className='flex items-center gap-3 pb-3'>
            <Button
              label={'Create'}
              loadingText={'Creating'}
              loading={submitting}
              onClick={handleSubmit}
            />
            <Button
              label={'Preview'}
              onClick={() => setShowPreviewPost(true)}
              variant='secondary'
            />
          </div>
          <PostForm postData={postData} setPostData={setPostData} />
        </div>
      </div>
      {showPreviewPost && (
        <PreviewBlogPage
          isOpen={true}
          onClose={() => setShowPreviewPost(false)}
          postData={postData}
        />
      )}
    </Layout>
  )
}

export default page
