/* eslint-disable react/prop-types */
import { Modal, ModalBody, ModalHeader } from '@/app/Components/CustomModal'
import React from 'react'

const WarningModal = ({ isOpen, onClick }) => {
  return (
    <Modal size={'xl'} isOpen={isOpen}>
      <ModalHeader>
        <span className='text-blue-800'>New Updates!</span>
      </ModalHeader>
      <ModalBody className='p-6 bg-gray-50 rounded-lg shadow-md'>
        <p className='text-lg font-semibold text-gray-800 mb-4'>
          You can now view your uploaded products by clicking the{' '}
          <strong className='font-bold text-pink-500'> My Uploads </strong>{' '}
          button on the Product List page.
        </p>
        <button
          className='w-full py-3 px-4 bg-blue-800 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          onClick={onClick}
        >
          Got it
        </button>
      </ModalBody>
    </Modal>
  )
}

export default WarningModal
