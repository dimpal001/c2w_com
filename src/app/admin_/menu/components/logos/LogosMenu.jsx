'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Button from '../../../components/Button'
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'
import DeleteModal from '@/app/Components/DeleteModal'
import AddEditModal from './AddEditModal'
import Image from 'next/image'
import { deleteImageFromCDN } from '../../../../../../utils/deleteImageFromCDN'

const LogosMenu = () => {
  const [expandSection, setExpandSection] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  const [fetchedItems, setFetchedItems] = useState([])

  async function fetchData() {
    try {
      const response = await axios.get('/api/admin/logos')
      setFetchedItems(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const onDelete = async () => {
    try {
      const response = await axios.delete(`/api/admin/logos`, {
        data: { id: selectedItem.id },
      })

      await deleteImageFromCDN(selectedItem.logoUrl)

      setSelectedItem(null)
      enqueueSnackbar(response.data.message, { variant: 'success' })
      fetchData()
      setShowDeleteModal(false)
    } catch (error) {
      console.error('Error deleting item:', error)
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    }
  }

  const handleActive = async (id) => {
    try {
      const response = await axios.patch(`/api/admin/logos/active?id=${id}`)
      setSelectedItem(null)
      fetchData()
      enqueueSnackbar(response.data.message, { variant: 'success' })
    } catch (error) {
      console.error('Error deleting item:', error)
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    }
  }

  return (
    <div className='mb-4 text-white border border-blue-800 rounded-sm'>
      <div
        className='p-4 cursor-pointer bg-blue-800 flex items-center justify-between font-semibold'
        onClick={() => setExpandSection(!expandSection)}
      >
        Logos
        {expandSection ? <ChevronUp /> : <ChevronDown />}
      </div>
      <div
        className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
          expandSection ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className='p-4'>
          {/* Table of existing data */}
          <div className='mb-2'>
            <Button
              onClick={() => {
                setShowEditModal(true)
                setIsEditMode(false)
                setSelectedItem(null)
              }}
              label={'Add Logo'}
            />
          </div>
          {fetchedItems && (
            <table className='min-w-full text-blue-800 border-collapse'>
              <thead>
                <tr className='bg-blue-800 text-white'>
                  <th className='border px-4 py-2 text-left'>Logo</th>
                  <th className='border px-4 py-2 text-left'>Alt Text</th>
                  <th className='border px-4 py-2 text-left'>Status</th>
                  <th className='border px-4 py-2 text-center'>Action</th>
                </tr>
              </thead>
              <tbody>
                {fetchedItems.length > 0 &&
                  fetchedItems.map((item, index) => (
                    <tr key={index}>
                      <td className='border capitalize px-4 py-2'>
                        <Image
                          width={30}
                          height={0}
                          alt={item?.altText || ''}
                          src={`https://cdn.thefashionsalad.com/clothes2wear/${item?.logoUrl}`}
                        />
                      </td>
                      <td className='border px-4 py-2'>{item?.altText}</td>
                      <td
                        className={`border ${
                          item?.isActive ? 'text-green-600' : 'text-red-600'
                        } px-4 py-2`}
                      >
                        <div className='flex items-center gap-3 justify-center'>
                          {item?.isActive ? 'Active' : 'Inactive'}{' '}
                          {!item.isActive && (
                            <Button
                              onClick={() => {
                                handleActive(item.id)
                              }}
                              variant='success'
                              label={'Active Now'}
                            />
                          )}
                        </div>
                      </td>
                      <td className='border flex justify-center py-2'>
                        <div className='flex items-center justify-center gap-2'>
                          <Button
                            onClick={() => {
                              setSelectedItem(item)
                              setShowEditModal(true)
                              setIsEditMode(true)
                            }}
                            label={'Edit'}
                          />
                          <Button
                            onClick={() => {
                              setSelectedItem(item)
                              setShowDeleteModal(true)
                            }}
                            label={'Delete'}
                            variant='error'
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
          {showEditModal && (
            <AddEditModal
              isOpen={true}
              onClose={() => setShowEditModal(false)}
              refresh={fetchData}
              item={selectedItem}
              isEdit={isEditMode}
            />
          )}
          {showDeleteModal && (
            <DeleteModal
              isOpen={true}
              onClose={() => setShowDeleteModal(false)}
              onDelete={onDelete}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default LogosMenu
