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
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'
import React, { useState } from 'react'

const AddEditCategory = ({ isOpen, onClose, item, refresh, isEdit }) => {
  const [name, setName] = useState(item?.name || '')
  const [visibility, setVisibility] = useState(
    item?.isVisible === true ? 'visible' : 'invisible'
  )
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    try {
      setSubmitting(true)
      if (isEdit) {
        await axios.patch(`/api/admin/menu/categories`, {
          id: item.id,
          name: name,
          visibility,
        })
      } else {
        await axios.post(`/api/admin/menu/categories`, {
          name: name,
          visibility,
        })
      }

      refresh()
      onClose()
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <Modal size={'md'} isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          {isEdit ? 'Edit' : 'Add'} Category{' '}
          <ModalCloseButton onClick={onClose} />
        </ModalHeader>
        <ModalBody>
          <div className='flex items-start gap-2 mb-2'>
            <input
              autoFocus
              type='text'
              placeholder={`Categories`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='border border-gray-300 p-2 rounded-sm w-full'
            />
            <select
              name='isVisible'
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              id=''
              className='border border-gray-300 p-2 rounded-sm w-full'
            >
              <option value=''>Select visibility</option>
              <option value='visible'>Visible</option>
              <option value='invisible'>Invisible</option>
            </select>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant='secondary' onClick={onClose} label={'Close'} />
          <Button
            loading={submitting}
            label={isEdit ? 'Save' : 'Add'}
            onClick={handleSubmit}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddEditCategory
