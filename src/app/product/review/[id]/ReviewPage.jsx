'use client'

/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Star, ArrowLeftCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import axios from 'axios'
import Loading from '@/app/Components/Loading'
import { cdnPath } from '@/app/Components/cdnPath'

// const reviews = [
//   {
//     id: '1',
//     userId: '1',
//     productId: '101',
//     images: [
//       'https://via.placeholder.com/150',
//       'https://via.placeholder.com/150',
//     ],
//     rating: 4,
//     review:
//       'This product is amazing! It exceeded my expectations. Highly recommend it!',
//     createdAt: '2024-12-01',
//   },
//   {
//     id: '2',
//     userId: '2',
//     productId: '101',
//     images: ['https://via.placeholder.com/150'],
//     rating: 5,
//     review:
//       'Absolutely love it! Quality is top-notch and the customer service was great.',
//     createdAt: '2024-12-05',
//   },
//   {
//     id: '3',
//     userId: '3',
//     productId: '101',
//     images: [],
//     rating: 3,
//     review:
//       "Good product but I expected more features. It's decent for the price.",
//     createdAt: '2024-12-10',
//   },
// ]

const ReviewCard = ({ review, openModal, index }) => {
  return (
    <div className='bg-white p-6 rounded-lg shadow-lg my-4 border border-gray-200'>
      <div className='flex items-center space-x-3'>
        <div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-pink-500'>
          {/* Replace this with user avatar */}
          <span className='text-lg font-bold'>{index + 1}</span>
        </div>
        <div>
          <div className='flex items-center'>
            {/* Rating */}
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={18}
                className={`text-${
                  index < review.rating ? 'pink-500 fill-pink-500' : 'gray-300'
                } mr-1`}
              />
            ))}
          </div>
          <p className='text-sm text-gray-500'>{review.createdAt}</p>
        </div>
      </div>
      <p className='mt-4 text-base max-sm:text-sm text-gray-800'>
        {review.review}
      </p>
      {/* Display images */}
      <div className='mt-4 flex gap-2 overflow-x-scroll scrollbar-hide w-full'>
        {review.images.map((image, index) => (
          <div
            key={index}
            className='relative cursor-pointer'
            onClick={() => openModal(image)}
          >
            <img
              src={cdnPath + image}
              alt={`Review Image ${index + 1}`}
              className='rounded-lg w-full md:w-52 md:h-52 md:max-h-52 md:max-w-52 max-sm:max-w-20 max-sm:w-20 max-sm:h-20 h-auto object-cover'
            />
          </div>
        ))}
      </div>
    </div>
  )
}

const Modal = ({ image, closeModal }) => {
  if (!image) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='relative md:w-[500px] w-[350px] h-[450px] md:h-[600px]'>
        <img
          src={cdnPath + image}
          alt='Full view'
          className='w-full h-full object-contain'
        />
        <button
          onClick={closeModal}
          className='absolute top-4 right-4 text-white text-3xl'
        >
          &times;
        </button>
      </div>
    </div>
  )
}

const ReviewPage = ({ reviewId }) => {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [reviews, setReviews] = useState([])

  const openModal = (image) => {
    setSelectedImage(image)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/api/products/get/product-review`, {
        params: { id: reviewId },
      })
      setReviews(response.data.productReview)
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
      //   router.push('/')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <div className='max-w-4xl mx-auto p-6 min-h-[700px]'>
      <div className='flex justify-between items-center mb-8'>
        <div className='flex items-center gap-4'>
          <Star className='w-8 h-8 text-pink-600' />
          <h1 className='text-3xl max-sm:text-xl font-semibold'>
            Product Reviews
          </h1>
        </div>
        <button
          onClick={() => router.push('/')}
          className='text-lg text-blue-600 max-sm:hidden max-sm:text-sm max-sm:gap-1 flex items-center gap-2 hover:gap-4 transition-all duration-300'
        >
          <ArrowLeftCircle size={22} />
          Continue Shopping
        </button>
      </div>
      {reviews.length > 0 &&
        reviews.map((review, index) => (
          <ReviewCard
            key={index}
            review={review}
            openModal={openModal}
            index={index}
          />
        ))}

      {/* Modal for full view of images */}
      <Modal image={selectedImage} closeModal={closeModal} />
    </div>
  )
}

export default ReviewPage
