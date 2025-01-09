'use client'

import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Button from '../components/Button'
import { useRouter } from 'next/navigation'
import CategoryModal from './components/CategoryModal'
import ImageModal from './components/ImageModal'

const Page = () => {
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    document.title = 'Manage Blogs | Clothes2Wear'
  }, [])

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
            {/* <Button
              label={'Add a Blog'}
              onClick={() => setShowForm(!showForm)}
            /> */}
          </div>
        </div>
        <div></div>
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
