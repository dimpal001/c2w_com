import React from 'react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from './CustomModal'
import Button from '../admin_/components/Button'
import { CircleAlert } from 'lucide-react'

// eslint-disable-next-line react/prop-types
function DeleteModal({ isOpen, onClose, onDelete }) {
  return (
    <Modal size={'md'} isOpen={isOpen}>
      <ModalHeader>
        <div className='flex items-center gap-2'>
          <CircleAlert className='h-6 w-6 text-red-500' />
          <span className='text-lg font-semibold text-gray-800'>
            Confirm Delete
          </span>
        </div>
        <ModalCloseButton onClick={onClose} />
      </ModalHeader>
      <ModalBody>
        <p className='text-gray-700'>
          Are you sure you want to delete this item? This action cannot be
          undone and will permanently remove the selected data.
        </p>
        <div className='mt-4 p-3 bg-red-100 rounded-md text-red-700'>
          <p>
            <strong>Note:</strong> Deleted items cannot be recovered.
          </p>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className='flex justify-end gap-3 w-full'>
          <Button label={'Cancel'} onClick={onClose} variant='secondary' />
          <Button label={'Confirm Delete'} onClick={onDelete} variant='error' />
        </div>
      </ModalFooter>
    </Modal>
  )
}

export default DeleteModal
