/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
} from '@/app/Components/CustomModal'
import Image from 'next/image'
import { cdnPath } from '@/app/Components/cdnPath'
import ShowImageModal from './ShowImageModal'
import { Star } from 'lucide-react'

const ShowReviewModal = ({ isOpen, onClose, product, reviews }) => {
  const [showImageModal, setShowImageModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  return (
    <Modal size={'3xl'} isOpen={isOpen}>
      <ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <h3 className='font-semibold text-xl'>Reviews for {product.title}</h3>
      </ModalHeader>
      <ModalBody>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className='bg-gray-100 p-4 rounded-md mb-4'>
              <div className='flex items-center'>
                <div className='flex space-x-1'>
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      size={20}
                      key={index}
                      className={
                        index < review.rating
                          ? 'text-pink-600 fill-pink-600'
                          : 'text-gray-400 fill-gray-400'
                      }
                    />
                  ))}
                </div>
                <span className='ml-2 text-sm text-gray-500'>
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className='mt-2 text-gray-700'>{review.review}</p>
              {/* Display images if available */}
              {review.images && review.images.length > 0 && (
                <div className='mt-2 flex space-x-2'>
                  {review.images.map((image, idx) => (
                    <Image
                      onClick={() => {
                        setSelectedImage(image)
                        setShowImageModal(true)
                      }}
                      key={idx}
                      src={cdnPath + image}
                      alt={`Review Image ${idx + 1}`}
                      width={100}
                      height={100}
                      className='object-cover w-28 h-32 rounded-md'
                    />
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No reviews yet for this product.</p>
        )}
      </ModalBody>
      {showImageModal && (
        <ShowImageModal
          isOpen={true}
          onClose={() => setShowImageModal(false)}
          image={selectedImage}
        />
      )}
    </Modal>
  )
}

export default ShowReviewModal
