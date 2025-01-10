'use client'

import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { enqueueSnackbar } from 'notistack'
import axios from 'axios'
import { blogApi } from '../../components/apis'
import Button from '../../components/Button'
import DeleteModal from '@/app/Components/DeleteModal'

const page = () => {
  const [newsletters, setNewsletters] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleFetch = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token
      const response = await axios.get(`${blogApi}/newsletters`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setNewsletters(response?.data)
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message || 'Something is wrong', {
        variant: 'error',
      })
    }
  }

  useEffect(() => {
    handleFetch()

    document.title = 'Blog Newsletters || Clothes2wear'
  }, [])

  const handleDeleteNewsletter = async () => {
    try {
      setDeleting(true)
      const token = JSON.parse(localStorage.getItem('user'))?.token
      const response = await axios.delete(
        `${blogApi}/newsletters/${selectedItem?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const updatedNewsletters = newsletters.filter(
        (item) => item?.id !== selectedItem?.id
      )

      setNewsletters(updatedNewsletters)
      setShowDeleteModal(false)

      enqueueSnackbar(
        response?.data?.message || 'Newsletter has been deleted',
        { variant: 'success' }
      )
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || 'Failed to delete newsletter',
        { variant: 'error' }
      )
    } finally {
      setDeleting(false)
    }
  }

  return (
    <Layout>
      <div className='p-6 bg-gray-100 min-h-[530px]'>
        <div className='flex items-center justify-between mb-5'>
          <h2 className='text-xl font-semibold text-blue-800'>
            Manage Newsletters
          </h2>
        </div>

        <div>
          <table className='min-w-full border-collapse border border-gray-300'>
            <thead className='bg-blue-800 text-white'>
              <tr>
                <th className='border px-4 py-2 text-left'>Email</th>
                <th className='border px-4 py-2 text-left'>Subscribed At</th>
                <th className='border px-4 py-2 text-center'>Action</th>
              </tr>
            </thead>
            <tbody>
              {newsletters &&
                newsletters.length > 0 &&
                newsletters.map((item, index) => (
                  <tr key={index} className='border-b'>
                    <td className='border px-4 py-2'>{item?.email}</td>
                    <td className='border px-4 py-2'>
                      {new Date(item?.createdAt).toLocaleDateString()}
                    </td>
                    <td className='border px-2 text-center py-2'>
                      <div className='flex justify-center gap-2'>
                        <Button
                          variant='error'
                          label={'Delete'}
                          loading={deleting}
                          loadingText={'Deleting'}
                          onClick={() => {
                            setShowDeleteModal(true)
                            setSelectedItem(item)
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {showDeleteModal && (
          <DeleteModal
            isOpen={true}
            onClose={() => setShowDeleteModal(false)}
            onDelete={handleDeleteNewsletter}
          />
        )}
      </div>
    </Layout>
  )
}

export default page
