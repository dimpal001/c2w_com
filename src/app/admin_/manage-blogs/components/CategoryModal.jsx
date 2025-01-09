/* eslint-disable react/prop-types */
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/app/Components/CustomModal'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { blogApi } from '../../components/apis'
import { useUserContext } from '@/app/context/UserContext'
import Button from '../../components/Button'
import { enqueueSnackbar } from 'notistack'
import DeleteModal from '@/app/Components/DeleteModal'

const CategoryModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState(null)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const { user } = useUserContext()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get(`${blogApi}/categories`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      setCategories(response?.data?.categories)
      console.log(response)
    } catch (error) {
      console.log(error)
      enqueueSnackbar(error?.message, { variant: 'error' })
    }
  }

  const handleSubmit = async () => {
    try {
      if (name === '') {
        enqueueSnackbar('Please enter a valid category name', {
          variant: 'error',
        })
        return
      }
      setSubmitting(true)

      if (editMode) {
        const response = await axios.put(
          `${blogApi}/categories`,
          {
            id: selectedCategory?.id,
            name,
          },
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        )
        setCategories((prev) => [...prev, response.data])
        setName('')
        enqueueSnackbar('Category has been updated!', { variant: 'success' })
      } else {
        const response = await axios.post(
          `${blogApi}/categories`,
          {
            name,
          },
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        )
        setCategories((prev) => [...prev, response.data])
        setName('')
        enqueueSnackbar('Category has been added!', { variant: 'success' })
      }
    } catch (error) {
      console.log(error)
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`${blogApi}/categories/${selectedCategory?.id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })

      const filteredCategories = categories.filter(
        (item) => item?.id !== selectedCategory?.id
      )
      setCategories(filteredCategories)
      setSelectedCategory(null)
      setShowDeleteModal(false)
      enqueueSnackbar('Category has been deleted', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    }
  }

  return (
    <Modal size={'xl'} isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          Manage Categories
          <ModalCloseButton onClick={onClose} />
        </ModalHeader>
        <ModalBody>
          <div className='flex items-center gap-2'>
            <div className='w-full'>
              <input
                type='text'
                placeholder={`Type here`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='border border-gray-300 p-[6px] rounded-sm w-full'
              />
            </div>
            <Button
              loadingText={''}
              loading={submitting}
              label={editMode ? 'Save' : 'Add'}
              onClick={handleSubmit}
            />
          </div>
          <div className='mt-2 max-h-[300px] overflow-scroll scrollbar-hide'>
            {categories && (
              <table className='min-w-full text-blue-800 border-collapse'>
                <thead>
                  <tr className='bg-blue-800 text-white'>
                    <th className='border px-4 py-2 text-left'>Name</th>
                    <th className='border px-4 py-2 text-center'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.length > 0 &&
                    categories.map((item, index) => (
                      <tr key={index}>
                        <td className='border capitalize px-4 py-2'>
                          {item?.name}
                        </td>
                        <td className='border flex justify-center py-2'>
                          <div className='flex items-center justify-center gap-2'>
                            <Button
                              onClick={() => {
                                setName(item?.name)
                                setSelectedCategory(item)
                                setEditMode(true)
                              }}
                              label={'Edit'}
                            />
                            <Button
                              label={'Delete'}
                              onClick={() => {
                                setShowDeleteModal(true)
                                setSelectedCategory(item)
                              }}
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
        </ModalBody>
        <ModalFooter>
          {editMode && (
            <Button
              onClick={() => {
                setSelectedCategory(null)
                setName('')
                setEditMode(false)
              }}
              label={'Add New'}
            />
          )}
          <Button variant='secondary' onClick={onClose} label={'Close'} />
        </ModalFooter>
      </ModalContent>
      {showDeleteModal && (
        <DeleteModal
          isOpen={true}
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDelete}
        />
      )}
    </Modal>
  )
}

export default CategoryModal
