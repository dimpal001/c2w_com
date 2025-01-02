/* eslint-disable react/prop-types */
import { Modal, ModalBody, ModalHeader } from '@/app/Components/CustomModal'
import React from 'react'

const WarningModal = ({ isOpen, onClose }) => {
  return (
    <Modal size={'xl'} isOpen={isOpen}>
      <ModalHeader>
        <span className='text-blue-800'>Welcome!</span>
      </ModalHeader>
      <ModalBody className='p-6 bg-gray-50 rounded-lg shadow-md'>
        <p className='text-lg font-semibold text-gray-800 mb-4'>
          Welcome to the platform! We&apos;re glad to have you here. Please take
          a moment to read the following notice.
        </p>
        <div className='p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md mb-6'>
          <strong className='block font-bold'>Warning:</strong>
          <span className='text-sm'>
            To avoid being logged out of your current session, please refrain
            from navigating to the main website in the same browser session. Use
            a separate browser or an incognito/private window if you need to
            access the main website.
          </span>
        </div>
        <button
          className='w-full py-3 px-4 bg-blue-800 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          onClick={onClose}
        >
          Got it
        </button>
      </ModalBody>
    </Modal>
  )
}

export default WarningModal
