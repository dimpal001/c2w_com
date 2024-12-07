/* eslint-disable react/prop-types */
import { ArrowRight, Star } from 'lucide-react'
import React from 'react'

const ReviewSection = ({ reviews }) => {
  return (
    <div>
      <p className='text-2xl font-semibold py-4'>Customer Reviews</p>
      <div className='flex flex-col gap-6'>
        {reviews?.length > 0 &&
          reviews
            .slice(0, 2)
            .map((review, index) => <ReviewCard key={index} review={review} />)}
      </div>
      <div className='flex justify- pt-4'>
        <p className='flex gap-3 hover:gap-5 cursor-pointer transition-all items-center text-pink-600 font-semibold'>
          See all reviews
          <ArrowRight strokeWidth={3} />
        </p>
      </div>
    </div>
  )
}

const ReviewCard = ({ review }) => {
  return (
    <div className='flex gap-1 p-5 rounded-lg bg-pink-200 shadow-lg'>
      <img
        src='https://picsum.photos/452/715?random=1'
        className='w-7 h-7 rounded-full'
        alt={'clothes2wear'}
      />
      <div className='w-[95%]'>
        <div className='flex gap-1'>
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              size={20}
              key={index}
              className={
                index < review.rating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-400 fill-gray-400'
              }
            />
          ))}
        </div>
        <p className='text-sm py-2'>{review.review}</p>

        <div className='mt-3'>
          <p className='text-sm font-semibold'>User Name</p>
          <p className='text-[10px] text-neutral-500'>
            {new Date().toDateString()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ReviewSection
