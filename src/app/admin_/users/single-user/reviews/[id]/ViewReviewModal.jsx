/* eslint-disable react/prop-types */
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
} from '@/app/Components/CustomModal'
import { Star } from 'lucide-react'
import React from 'react'

const ViewReviewModal = ({ isOpen, onClose, review }) => {
  if (!review) return null

  const { rating, review: reviewText, createdAt, product } = review

  return (
    <Modal size={'2xl'} isOpen={isOpen}>
      <ModalHeader>
        <ModalCloseButton onClick={onClose} />
        Review Details
      </ModalHeader>
      <ModalBody>
        <div className='flex flex-col space-y-4 p-4'>
          {/* Product Information */}
          <div className='flex items-center space-x-4'>
            <img
              src={product.thumbnailUrl}
              alt={product.title}
              className='w-16 h-16 object-cover rounded-md shadow-md'
            />
            <div>
              <h2 className='text-lg font-semibold'>{product.title}</h2>
              <p className='text-sm text-gray-500'>
                Reviewed on {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className='flex items-center space-x-1'>
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                className={
                  index < rating
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }
              />
            ))}
            <span className='text-sm text-gray-600'>({rating} stars)</span>
          </div>

          {/* Review Text */}
          <div className='text-gray-800'>
            <p>{reviewText}</p>
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default ViewReviewModal
