/* eslint-disable react/prop-types */
import { cdnPath } from '@/app/Components/cdnPath'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import ReviewModal from './ReviewModal'
import { useUserContext } from '@/app/context/UserContext'
import ShowReviewModal from './ShowReviewModal'

const OrderItems = ({ orderDetails }) => {
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false)
  const [isShowModalOpen, setIsShowModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedProductReviews, setSelectedProductReviews] = useState([])

  const router = useRouter()
  const { user } = useUserContext()

  const getProductReview = (productId) => {
    return user.reviews.filter((review) => review.productId === productId)
  }

  const handleShowReviews = (product) => {
    const reviews = getProductReview(product.id)
    setSelectedProduct(product)
    setSelectedProductReviews(reviews)
    setIsShowModalOpen(true)
  }

  return (
    <div className='space-y-4'>
      {orderDetails?.orderItems.map((item) => {
        const reviews = getProductReview(item.product.id)
        const hasReviews = reviews.length > 0

        return (
          <div key={item.id} className='flex items-center'>
            <Image
              src={cdnPath + item.product.thumbnailUrl}
              alt={item.name}
              width={60}
              height={60}
              className='rounded-md'
            />
            <div className='ml-4'>
              <h4
                onClick={() => router.push(`/product/${item.product.slug}`)}
                className='font-semibold max-sm:text-sm hover:underline hover:text-pink-600 cursor-pointer'
              >
                {item.product.title}
              </h4>
              <p className='text-sm text-gray-600'>
                Quantity: {item.quantity} | Size:{' '}
                <span className='uppercase'>{item.size.name}</span> | Price: ₹
                {item.product.displayPrice}
              </p>
            </div>
            {orderDetails.status === 'DELIVERED' && (
              <div className='ml-auto'>
                {hasReviews ? (
                  <p
                    onClick={() => handleShowReviews(item.product)}
                    className='text-pink-500 max-sm:text-xs hover:underline font-semibold cursor-pointer'
                  >
                    View Reviews
                  </p>
                ) : (
                  <p
                    onClick={() => {
                      setIsAddReviewModalOpen(true)
                      setSelectedProduct(item.product)
                    }}
                    className='text-pink-500 max-sm:text-xs hover:underline font-semibold cursor-pointer'
                  >
                    Send Review
                  </p>
                )}
              </div>
            )}
          </div>
        )
      })}
      {isAddReviewModalOpen && (
        <ReviewModal
          isOpen={true}
          onClose={() => setIsAddReviewModalOpen(false)}
          product={selectedProduct}
        />
      )}
      {isShowModalOpen && (
        <ShowReviewModal
          isOpen={true}
          onClose={() => setIsShowModalOpen(false)}
          product={selectedProduct}
          reviews={selectedProductReviews}
        />
      )}
    </div>
  )
}

export default OrderItems
