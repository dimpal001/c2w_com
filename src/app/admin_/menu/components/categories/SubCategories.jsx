/* eslint-disable react/prop-types */
import Button from '@/app/admin_/components/Button'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/app/Components/CustomModal'
import DeleteModal from '@/app/Components/DeleteModal'
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'

const SubCategories = ({ isOpen, onClose, item, category }) => {
  const [name, setName] = useState(item?.name || '')
  const [submitting, setSubmitting] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/admin/menu/categories', {
        params: { id: category.id },
      })
      setData(response.data)
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    }
  }

  const handleSubmit = async () => {
    try {
      setSubmitting(true)
      let response
      if (isEditMode) {
        response = await axios.patch(`/api/admin/menu/sub-categories`, {
          categoryId: category.id,
          id: selectedItem.id,
          name: name,
        })
      } else {
        response = await axios.post(`/api/admin/menu/sub-categories`, {
          categoryId: category.id,
          name: name,
        })
      }

      setIsEditMode(false)
      fetchData()
      setName('')
      selectedItem(null)
      enqueueSnackbar(response.data.message, { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  const onDelete = async () => {
    try {
      setShowDeleteModal(false)
      await axios.delete('/api/admin/menu/sub-categories', {
        params: { id: selectedItem.id },
      })

      setSelectedItem(null)
      fetchData()
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    }
  }

  return (
    <Modal size={'md'} isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          Sub Categories of <span className='capitalize'>{category.name}</span>{' '}
          <ModalCloseButton onClick={onClose} />
        </ModalHeader>
        <ModalBody>
          <div>
            <div className='flex gap-1 items-center mb-2'>
              <input
                autoFocus
                type='text'
                placeholder={`Sub categories`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='border border-gray-300 w-full px-2 py-[6px] focus:outline-none focus:border-blue-800 rounded-sm'
              />
              <Button
                loading={submitting}
                loadingText={'Adding'}
                label={isEditMode ? 'Edit' : 'Add'}
                onClick={handleSubmit}
              />
            </div>
            <div>
              {data?.subcategories && data?.subcategories.length > 0 && (
                <table className='min-w-full text-xs mb-2 text-blue-800 border-collapse'>
                  <thead>
                    <tr className='bg-blue-800 text-white'>
                      <th className='border px-4 py-2 text-left'>Data</th>
                      <th className='border px-4 py-2 text-center'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.subcategories.map((subItem, index) => (
                      <tr key={index}>
                        <td className='border px-4 py-2 capitalize'>
                          {subItem.name}
                        </td>
                        <td className='border px-4 py-2 capitalize'>
                          <div className='flex gap-2 justify-center'>
                            <Button
                              onClick={() => {
                                setSelectedItem(subItem)
                                setIsEditMode(true)
                                setName(subItem.name)
                              }}
                              label={'Edit'}
                            />
                            <Button
                              onClick={() => {
                                setSelectedItem(subItem)
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
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {isEditMode && (
            <Button
              onClick={() => {
                setIsEditMode(false)
                setName('')
              }}
              label={'Add New'}
            />
          )}
        </ModalFooter>
      </ModalContent>
      {showDeleteModal && (
        <DeleteModal
          isOpen={true}
          onClose={() => setShowDeleteModal(false)}
          onDelete={onDelete}
        />
      )}
    </Modal>
  )
}

export default SubCategories
