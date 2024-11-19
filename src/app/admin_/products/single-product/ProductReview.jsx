/* eslint-disable react/prop-types */
import React from 'react'
import { Star } from 'lucide-react'

const ProductReview = ({ reviews }) => {
  return (
    <div className='mb-3'>
      <div className='py-3 flex flex-col gap-3'>
        <h3 className='text-lg font-semibold text-blue-800'>Product Reviews</h3>
        <table className='w-full'>
          <thead>
            <tr className='p-2 bg-blue-800 border border-blue-800 text-white'>
              <th className='p-2 text-left border-r border-white'>SL</th>
              <th className='p-2 text-left border-r border-white'>Customer</th>
              <th className='p-2 text-left border-r border-white'>Rating</th>
              <th className='p-2 text-left border-r border-white'>Review</th>
              <th className='p-2 text-left border-r border-white'>
                Reviewed on
              </th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((item, index) => (
              <tr key={index}>
                <td className='text-left p-3 border'>
                  <p className='flex items-start'>{index + 1}</p>
                </td>
                <td className='text-left p-3 border'>
                  {item?.user.firstName + ' ' + item?.user.lastName}
                </td>
                <td className='text-left p-3 border'>
                  <div className='flex gap-1'>
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star
                        size={20}
                        key={index}
                        className={
                          index < item.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }
                      />
                    ))}
                  </div>
                </td>
                <td className='text-left p-3 text-wrap border'>
                  {item?.review}{' '}
                  {/* {item?.review.length > 2 && (
                    <span>
                      ...{' '}
                      <span
                        onClick={() => {
                          setSelectedReview(item)
                          setReviewModalOpen(true)
                        }}
                        className='text-blue-800 cursor-pointer'
                      >
                        read more
                      </span>
                    </span>
                  )} */}
                </td>
                <td className='text-left p-3 border'>
                  {new Date(item?.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductReview
