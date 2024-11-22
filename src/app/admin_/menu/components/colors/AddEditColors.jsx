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

const AddEditColors = ({ isOpen, onClose, item, refresh, isEdit }) => {
  const [name, setName] = useState(item?.name || '')
  const [colorCode, setColorCode] = useState(item?.code || '#000000')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    try {
      setSubmitting(true)
      if (isEdit) {
        await axios.patch(`/api/admin/menu/colors`, {
          id: item.id,
          name: name,
          code: colorCode,
        })
      } else {
        await axios.post(`/api/admin/menu/colors`, {
          name: name,
          code: colorCode,
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
          {isEdit ? 'Edit' : 'Add'} Size <ModalCloseButton onClick={onClose} />
        </ModalHeader>
        <ModalBody>
          <div className='flex gap-2 items-center'>
            <input
              type='text'
              placeholder={`Example S, M, XL`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='border border-gray-300 p-2 rounded-sm w-full'
            />
            <input
              type='color'
              value={colorCode}
              onChange={(e) => setColorCode(e.target.value)}
              className='border border-gray-300 h-9 rounded-sm'
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant='secondary' label={'Close'} />
          <Button
            loading={submitting}
            label={isEdit ? 'Edit' : 'Add'}
            onClick={handleSubmit}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddEditColors
