'use client'

import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import DeleteModal from '@/app/Components/DeleteModal'
import { enqueueSnackbar } from 'notistack'
import { Square, CheckSquare, Trash2 } from 'lucide-react'
import Button from '../components/Button'
import SendNotificationModal from './SendNotificationModal'

const Page = () => {
  const [items, setItems] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showNotificationModal, setShowNotificationModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/newsletter')
      setItems(response.data.emails)
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || 'Failed to fetch items!',
        { variant: 'error' }
      )
    }
  }

  useEffect(() => {
    document.title = 'Newsletter | Clothes2Wear'
  }, [])

  const toggleSelectItem = (itemId) => {
    setSelectedItems(
      (prev) =>
        prev.includes(itemId)
          ? prev.filter((id) => id !== itemId) // Remove if already selected
          : [...prev, itemId] // Add if not selected
    )
  }

  const deleteSocialLink = async () => {
    try {
      const response = await axios.delete('/api/newsletter', {
        params: { id: selectedItem.id },
      })

      setItems((prev) => prev.filter((item) => item.id !== selectedItem.id))
      setShowDeleteModal(false)
      setSelectedItem(null)
      enqueueSnackbar(response.data.message, { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || 'Failed to handle task!',
        { variant: 'error' }
      )
    }
  }

  const sortedItems = [
    ...items.filter((item) => selectedItems.includes(item.id)),
    ...items.filter((item) => !selectedItems.includes(item.id)),
  ]

  return (
    <Layout>
      <div className='p-6 bg-gray-100 min-h-[530px]'>
        <div className='flex items-center justify-between mb-5'>
          <h2 className='text-xl font-semibold text-blue-800'>Newsletter</h2>
          <div className='flex items-center gap-2'>
            <Button
              disabled={selectedItems.length > 0 ? false : true}
              label={'Send Notification'}
            />
          </div>
        </div>

        <table className='min-w-full border-collapse border border-gray-300'>
          <thead className='bg-blue-800 text-white'>
            <tr>
              <th className='border px-4 py-2 text-left'>Email</th>
              <th className='border px-4 py-2 text-left'>Subscribed At</th>
              <th className='border px-4 py-2 text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((item, index) => (
              <tr key={index} className='border-b'>
                <td className='border px-4 py-2'>{item.email}</td>
                <td className='border px-4 py-2'>
                  {new Date(item?.createdAt).toLocaleDateString()}
                </td>
                <td className='border px-2 text-center py-2'>
                  <div className='flex flex-col gap-2'>
                    <div className='flex justify-center gap-4 items-center'>
                      <Trash2
                        className={`text-red-600 ${
                          selectedItems.includes(item.id)
                            ? 'opacity-60 cursor-default'
                            : 'cursor-pointer opacity-100'
                        } `}
                        onClick={() => {
                          if (!selectedItems.includes(item.id)) {
                            setSelectedItem(item)
                            setShowDeleteModal(true)
                          }
                        }}
                      />
                      {selectedItems.includes(item.id) ? (
                        <CheckSquare
                          className='text-green-600 cursor-pointer'
                          onClick={() => toggleSelectItem(item.id)}
                        />
                      ) : (
                        <Square
                          className='text-blue-800 cursor-pointer'
                          onClick={() => toggleSelectItem(item.id)}
                        />
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showDeleteModal && (
          <DeleteModal
            isOpen={true}
            onClose={() => setShowDeleteModal(false)}
            onDelete={() => deleteSocialLink()}
          />
        )}
        {selectedItems.length > 0 && (
          <div className='mt-5'>
            <h4 className='text-blue-800 font-medium'>Selected Email(s):</h4>
            <ul className='list-disc pl-6'>
              {selectedItems.map((id) => {
                const item = items.find((i) => i.id === id)
                return <li key={id}>{item?.email}</li>
              })}
            </ul>
          </div>
        )}
        {showNotificationModal && (
          <SendNotificationModal
            isOpen={true}
            onClose={() => setShowNotificationModal(false)}
          />
        )}
      </div>
    </Layout>
  )
}

export default Page
