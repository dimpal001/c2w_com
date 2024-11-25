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
import { enqueueSnackbar } from 'notistack'
import React, { useState } from 'react'
import Button from '../../components/Button'

const AddEditOccasionModal = ({
  isOpen,
  onClose,
  occasion,
  editMode,
  refresh,
}) => {
  const [newItem, setNewItem] = useState({
    occasionName: occasion?.occasionName || '',
    categoryHyperLinks: occasion?.categoryHyperLinks || '',
  })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewItem((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    try {
      setSubmitting(true)
      let response
      if (editMode) {
        response = await axios.patch('/api/customs/shop-by-occasion/occasion', {
          id: occasion.id,
          occasionName: newItem.occasionName,
          categoryHyperLinks: newItem.categoryHyperLinks,
        })
      } else {
        response = await axios.post('/api/customs/shop-by-occasion/occasion', {
          occasionName: newItem.occasionName,
          categoryHyperLinks: newItem.categoryHyperLinks,
        })
      }

      setNewItem({
        occasionName: '',
        categoryHyperLinks: '',
      })

      enqueueSnackbar(response.data.message, { variant: 'success' })
      refresh()
      onClose()
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal size={'xl'} isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          {editMode ? 'Edit' : 'Create'} Occasion
          <ModalCloseButton onClick={onClose} />
        </ModalHeader>
        <ModalBody>
          <div className='grid grid-cols-2 gap-3'>
            <div className='mb-2'>
              <label className='block mb-1 font-semibold'>Occasion Name</label>
              <input
                type='text'
                name='occasionName'
                value={newItem.occasionName}
                onChange={handleChange}
                className='border p-2 rounded w-full'
              />
            </div>
            <div className='mb-2'>
              <label className='block mb-1 font-semibold'>
                Category Hyper Link
              </label>
              <input
                type='text'
                name='categoryHyperLinks'
                value={newItem.categoryHyperLinks}
                onChange={handleChange}
                className='border p-2 rounded w-full'
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} label={'Close'} variant='secondary' />
          <Button
            loading={submitting}
            onClick={handleSubmit}
            label={editMode ? 'Edit' : 'Add'}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddEditOccasionModal
