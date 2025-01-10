/* eslint-disable react/prop-types */
import { cdnPath } from '@/app/Components/cdnPath'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Button from '../../components/Button'
import PreviewBlogPage from './PreviewBlogPage'
import { enqueueSnackbar } from 'notistack'
import axios from 'axios'
import { blogApi } from '../../components/apis'
import DeleteModal from '@/app/Components/DeleteModal'
import { CircleCheck } from 'lucide-react'

const SingleBlogPost = ({ blog, deleteComplete, updateComplete }) => {
  const [showPreview, setShowPreview] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleting, setDeleteing] = useState(false)
  const router = useRouter()

  const [buttonLabel, setButtonLabel] = useState('Copy Link')

  const handleCopyLink = async () => {
    const url = `https://www.clothes2wear.com/blogs/${blog?.slug}`
    try {
      await navigator.clipboard.writeText(url)
      setButtonLabel('Link Copied!')

      setTimeout(() => {
        setButtonLabel('Copy Link')
      }, 2000)
    } catch (error) {
      console.error('Failed to copy link:', error)
    }
  }

  const handleDelete = async () => {
    try {
      setDeleteing(true)
      const token = JSON.parse(localStorage.getItem('user'))?.token
      await axios.delete(`${blogApi}/posts/${blog?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      deleteComplete(blog)
      setShowDeleteModal(false)
      enqueueSnackbar('Blog has been deleted', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || 'Unable to delete blog, try again!',
        { variant: 'error' }
      )
    } finally {
      setDeleteing(false)
    }
  }

  const handleUpdateStatus = async (status) => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token
      const response = await axios.put(
        `${blogApi}/posts/${status}/${blog?.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      enqueueSnackbar(response?.data?.mesage || `Post has been updated`, {
        variant: 'success',
      })

      updateComplete(blog, status === 'active' ? 'ACTIVE' : 'INACTIVE')
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.mesage, { variant: 'error' })
    }
  }

  return (
    <div className='relative border border-slate-500 group overflow-hidden'>
      <img
        src={cdnPath + blog?.thumbnailImage}
        className='object-cover aspect-video'
        alt=''
      />
      <div className='absolute translate-y-full transition-all group-hover:translate-y-0 group-hover:bg-opacity-50 bg-black bg-opacity-0 z-10 left-0 right-0 top-0 bottom-0 flex justify-center items-center'>
        <div className='p-5'>
          <p className='font-semibold leading-5 text-white text-base'>
            {blog?.title}
          </p>
          <div className='flex items-center flex-wrap mt-2 gap-2'>
            <Button
              onClick={() =>
                router.push(`/admin_/manage-blogs/edit-blog/${blog?.id}`)
              }
              label={'Edit'}
            />
            <Button
              onClick={() => setShowPreview(true)}
              label={'Preview'}
              variant='secondary'
            />
            {blog?.status === 'PENDING' || blog?.status === 'INACTIVE' ? (
              <Button
                onClick={() => handleUpdateStatus('active')}
                label={'Active now'}
                variant='success'
              />
            ) : (
              <Button
                onClick={() => handleUpdateStatus('inactive')}
                label={'Inactive now'}
                variant='error'
              />
            )}
            <Button
              onClick={() => setShowDeleteModal(true)}
              loadingText={'Deleting'}
              loading={deleting}
              label={'Delete'}
              variant='error'
            />
            <Button
              onClick={handleCopyLink}
              variant={buttonLabel === 'Copy Link' ? 'primary' : 'success'}
              label={buttonLabel}
            />
          </div>
        </div>
      </div>
      {blog?.status === 'ACTIVE' && (
        <CircleCheck className='fill-blue-600 text-white z-20 w-8 h-8 absolute top-2 right-2' />
      )}
      {showPreview && (
        <PreviewBlogPage
          isOpen={true}
          onClose={() => setShowPreview(false)}
          postData={blog}
        />
      )}{' '}
      {showDeleteModal && (
        <DeleteModal
          isOpen={true}
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default SingleBlogPost
