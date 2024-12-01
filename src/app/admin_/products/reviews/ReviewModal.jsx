/* eslint-disable react/prop-types */
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
} from '@/app/Components/CustomModal'
import { Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const ReviewModal = ({
  isOpen,
  onClose,
  rating,
  review,
  createdAt,
  userName,
  title,
  profileUrl,
  thumbnailUrl,
}) => {
  if (!review) return null

  console.log(thumbnailUrl)

  return (
    <Modal size={'4xl'} isOpen={isOpen}>
      <ModalHeader>
        <ModalCloseButton onClick={onClose} />
        Review Details
      </ModalHeader>
      <ModalBody>
        <div className='flex flex-col space-y-4 p-4'>
          {/* Product Information */}
          <div className='flex items-center space-x-4'>
            <img
              src={thumbnailUrl && thumbnailUrl}
              alt={title && title}
              className='w-16 h-16 object-cover rounded-md shadow-md'
            />
            <div>
              <h2 className='text-lg font-semibold'>{title}</h2>
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
            <p>{review}</p>
          </div>

          <div>
            <i>Reviewed by</i>
            <div className='flex gap-2 mt-3 items-center'>
              <Image
                src={
                  profileUrl === ''
                    ? profileUrl
                    : 'https://cdn.thefashionsalad.com/profile-pictures/default-image.jpg'
                }
                width={36}
                height={36}
                className='rounded-full'
                alt='Profile iamge'
              />
              <div>
                <p className='text-base'>{userName}</p>
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default ReviewModal
