/* eslint-disable react/prop-types */
import React from 'react'
import { Modal, ModalBody } from '../Components/CustomModal'
import { useRouter } from 'next/navigation'

const OrderPlacedModal = ({ isOpen }) => {
  const router = useRouter()
  return (
    <Modal size={'md'} isOpen={isOpen}>
      <ModalBody>
        <div className='flex flex-col justify-center items-center w-full h-full p-6'>
          {/* Add the GIF */}
          <img
            src='/order_placed.gif'
            className='w-[150px] mb-4'
            alt='Order Placed'
          />

          {/* Add a success message */}
          <h2 className='text-xl font-semibold max-sm:text-lg text-green-600 mb-2'>
            Order Placed Successfully!
          </h2>

          {/* Add a descriptive text */}
          <p className='text-gray-700 text-center text-sm mb-4'>
            Thank you for your purchase. Your order has been placed and is being
            processed. You will receive an email confirmation shortly.
          </p>

          {/* Add a button for user action */}
          <button
            onClick={() => router.push('/')} // Replace with your close function
            className='bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition'
          >
            Continue Shopping
          </button>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default OrderPlacedModal
