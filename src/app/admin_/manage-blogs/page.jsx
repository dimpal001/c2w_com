/* eslint-disable react/prop-types */
'use client'

import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Button from '../components/Button'
import { useRouter } from 'next/navigation'
import CategoryModal from './components/CategoryModal'
import ImageModal from './components/ImageModal'
import { enqueueSnackbar } from 'notistack'
import axios from 'axios'
import { blogApi } from '../components/apis'
import SingleBlogPost from './components/SingleBlogPost'

const Page = () => {
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [blogs, setBlogs] = useState([])
  const router = useRouter()

  useEffect(() => {
    document.title = 'Manage Blogs | Clothes2Wear'
  }, [])

  const fetchBlogs = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token
      const response = await axios.get(`${blogApi}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setBlogs(response?.data)
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.mesage || 'Something went wrong', {
        variant: 'error',
      })
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const handleDeleteComplete = (blog) => {
    const updatedBlogs = blogs.filter((item) => item?.id !== blog?.id)
    setBlogs(updatedBlogs)
  }

  const handleUpdateComplete = (blog, status) => {
    const updatedBlogs = blogs.map((item) =>
      item?.id === blog?.id ? { ...item, status: status } : item
    )
    setBlogs(updatedBlogs)
  }

  return (
    <Layout>
      <div className='p-6 bg-gray-100 min-h-[530px]'>
        <div className='flex items-center justify-between mb-5'>
          <h2 className='text-xl font-semibold text-blue-800'>Manage Blogs</h2>
          <div className='flex items-center gap-2'>
            <Button
              label={'Manage Images'}
              onClick={() => router.push('/admin_/manage-blogs/manage-images')}
            />
            <Button
              label={'Manage Categories'}
              onClick={() => setShowCategoryModal(true)}
            />
            <Button
              label={'Create a blog'}
              onClick={() => router.push('/admin_/manage-blogs/create-blog')}
            />
          </div>
        </div>
        <div className='grid grid-cols-3 gap-4'>
          {blogs.length > 0 &&
            blogs?.map((item, index) => (
              <SingleBlogPost
                key={index}
                blog={item}
                deleteComplete={handleDeleteComplete}
                updateComplete={handleUpdateComplete}
              />
            ))}
        </div>
        {showCategoryModal && (
          <CategoryModal
            isOpen={true}
            onClose={() => setShowCategoryModal(false)}
          />
        )}
        {showImageModal && (
          <ImageModal isOpen={true} onClose={() => setShowImageModal(false)} />
        )}
      </div>
    </Layout>
  )
}

export default Page
