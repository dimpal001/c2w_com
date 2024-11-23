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

const AddEditAnnouncement = ({ isOpen, onClose, item, refresh, isEdit }) => {
  const [text, setText] = useState(item?.text || '')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    try {
      setSubmitting(true)
      if (isEdit) {
        await axios.patch(`/api/admin/menu/announcements`, {
          id: item.id,
          text: text,
        })
      } else {
        await axios.post(`/api/admin/menu/announcements`, {
          text: text,
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
          {isEdit ? 'Edit' : 'Add'} Announcement{' '}
          <ModalCloseButton onClick={onClose} />
        </ModalHeader>
        <ModalBody>
          <input
            type='text'
            placeholder={`50% off on first order`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className='border border-gray-300 p-2 rounded-sm w-full mb-2'
          />
        </ModalBody>
        <ModalFooter>
          <Button variant='secondary' onClick={onClose} label={'Close'} />
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

export default AddEditAnnouncement
