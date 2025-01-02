/* eslint-disable react/prop-types */
import { Modal, ModalBody, ModalHeader } from '@/app/Components/CustomModal'
import React from 'react'

const WishModal = ({ isOpen, onClick }) => {
  return (
    <Modal size={'xl'} isOpen={isOpen}>
      <ModalHeader>
        <span className='text-purple-900 font-extrabold text-xl'>
          Happy New Year 2025!
        </span>
      </ModalHeader>
      <ModalBody>
        <div className='p-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-lg'>
          <p className='text-2xl font-bold text-white mb-6 text-center'>
            Wishing you a year filled with love, success, and endless happiness!
          </p>
          <div className='p-6 bg-white border-2 border-yellow-400 rounded-md shadow-lg'>
            <strong className='block text-xl font-bold text-yellow-600'>
              Special Message:
            </strong>
            <span className='text-lg text-gray-800'>
              May this year bring you new opportunities, exciting adventures,
              and unforgettable moments.
            </span>
          </div>
          <div className='mt-8 flex justify-center gap-5'>
            <button className='w-full sm:w-1/2 py-3 px-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:bg-gradient-to-l hover:from-purple-600 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2'>
              Let&apos;s Celebrate!
            </button>
            <button
              className='w-full sm:w-1/2 py-3 px-6 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2'
              onClick={onClick}
            >
              Back to Reality! 😅
            </button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default WishModal
