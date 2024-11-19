import React from 'react'

import Button from '../../components/Button'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from '@/app/Components/CustomModal'
import { CircleAlert } from 'lucide-react'

// eslint-disable-next-line react/prop-types
function BanUserModal({ isOpen, onClose, onBanSubmit }) {
  return (
    <Modal size={'md'} isOpen={isOpen}>
      <ModalHeader>
        <div className='flex items-center gap-2'>
          <CircleAlert className='h-6 w-6 text-red-500' />
          <span className='text-lg font-semibold text-gray-800'>
            Confirm Ban
          </span>
        </div>
        <ModalCloseButton onClick={onClose} />
      </ModalHeader>
      <ModalBody>
        <p className='text-gray-700'>
          Are you sure you want to ban this user? This action cannot be undone,
          and the user will be notified about this decision. Please confirm your
          action below.
        </p>
        <div className='mt-4 p-3 bg-red-100 rounded-md text-red-700'>
          <p>
            <strong>Note:</strong> Banned users will lose access to their
            account and associated data.
          </p>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className='flex justify-end gap-3 w-full'>
          <Button label={'Cancel'} onClick={onClose} variant='secondary' />
          <Button label={'Ban User'} onClick={onBanSubmit} variant='error' />
        </div>
      </ModalFooter>
    </Modal>
  )
}

export default BanUserModal
