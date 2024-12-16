/* eslint-disable react/prop-types */
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
} from '@/app/Components/CustomModal'
import React, { useState } from 'react'
import { Loader2, Star, X } from 'lucide-react'
import { uploadImageToCDN } from '../../../../../utils/uploadImageToCDN'
import { useUserContext } from '@/app/context/UserContext'
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'

const ReviewModal = ({ isOpen, onClose, product }) => {
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [images, setImages] = useState([])
  const [submitting, setSubmitting] = useState(false)

  const { user } = useUserContext()

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const newImages = []

    files.forEach((file) => {
      if (file.size > 300 * 1024) {
        enqueueSnackbar('Image size should be less than 300KB!', {
          variant: 'error',
        })
      } else {
        const reader = new FileReader()
        reader.onload = () => {
          newImages.push({ file, imageUrl: reader.result })
          if (newImages.length + images.length <= 3) {
            setImages([...images, ...newImages])
          } else {
            alert('You can upload up to 3 images only!')
          }
        }
        reader.readAsDataURL(file)
      }
    })
  }

  // Remove an image
  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index)
    setImages(updatedImages)
  }

  // Handle submit
  const handleSubmit = async () => {
    if (!rating || !review) {
      alert('Please provide a rating and review!')
      return
    }

    try {
      setSubmitting(true)
      const uploadedImageUrls = await Promise.all(
        images.map(async (img, index) => {
          const imageUrl = await uploadImageToCDN(
            img.file,
            `review-image-${index + 1}`
          )
          return imageUrl
        })
      )

      const reviewData = {
        rating,
        review,
        images: uploadedImageUrls,
      }

      const response = await axios.post('/api/product-review/add', {
        userId: user.id,
        productId: product.id,
        rating: reviewData.rating,
        review: reviewData.review,
        images: reviewData.images,
      })

      enqueueSnackbar(response.data.message, { variant: 'success' })

      setRating(0)
      setReview('')
      setImages([])
      onClose()
    } catch (error) {
      console.error('Error submitting review:', error)
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>
        <div className='flex items-center justify-between'>
          <span>Send a Review</span>
          <ModalCloseButton onClick={onClose} />
        </div>
      </ModalHeader>
      <ModalBody>
        <div className='flex flex-col gap-4'>
          {/* Rating */}
          <div className='flex items-center gap-2'>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={32}
                className={`cursor-pointer ${
                  star <= rating
                    ? 'text-yellow-500 fill-yellow-500'
                    : 'text-gray-300'
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>

          {/* Review Text */}
          <textarea
            className='w-full border border-gray-300 rounded-lg p-2 focus:outline-none'
            rows='4'
            placeholder='Write your review...'
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>

          {/* Image Upload */}
          <div className='flex flex-col gap-2'>
            <label
              htmlFor='image-upload'
              className='block w-full cursor-pointer rounded-lg border border-dashed border-gray-300 p-4 text-center text-gray-600 hover:border-pink-300 hover:text-pink-500'
            >
              Click to upload images (Max: 3, Max Size: 300KB each)
              <input
                type='file'
                id='image-upload'
                className='hidden'
                multiple
                accept='image/*'
                onChange={handleImageUpload}
              />
            </label>
            <div className='flex gap-2'>
              {images.map((img, index) => (
                <div
                  key={index}
                  className='relative w-20 h-20 border border-gray-300 rounded-lg overflow-hidden'
                >
                  <img
                    src={img.imageUrl}
                    alt={`Uploaded ${index}`}
                    className='object-cover w-full h-full'
                  />
                  <X
                    onClick={() => removeImage(index)}
                    className='text-red-600 cursor-pointer absolute top-0 right-0'
                    strokeWidth={2}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            disabled={submitting}
            className={`w-full ${
              submitting && 'opacity-60'
            } bg-pink-500 text-white flex items-center justify-center py-2 rounded-lg hover:bg-pink-600 transition`}
            onClick={handleSubmit}
          >
            {submitting ? (
              <Loader2 className='animate-spin' />
            ) : (
              'Submit Review'
            )}
          </button>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default ReviewModal
