'use client'

import Button from '@/app/admin_/components/Button'
import Layout from '@/app/admin_/components/Layout'
import Pagination from '@/app/admin_/components/Pagination'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { use } from 'react'
import ViewReviewModal from './ViewReviewModal'
import { Star } from 'lucide-react'

const page = ({ params }) => {
  const { id } = use(params)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(null)
  const [totalItems, setTotalItems] = useState(null)
  const [userData, setUserData] = useState(null)
  const [selectedReview, setSelectedReview] = useState(null)
  const [reviewModalOpen, setReviewModalOpen] = useState(false)

  const router = useRouter()

  useEffect(() => {
    document.title = "User's Reviews | Clothes2Wear"
  }, [])

  const fetchData = async () => {
    const params = {
      id: id,
      page: currentPage,
      data: 'reviews',
    }
    try {
      const response = await axios.get(`/api/users/get/single-user`, { params })
      setUserData(response.data.user)
      setCurrentPage(response.data.currentPage)
      setTotalPages(response.data.totalPages)
      setTotalItems(response.data.totalItems)
    } catch (error) {
      console.log(error)
    }
  }

  const handlePreviousPage = () => {
    const newPage = currentPage - 1
    setCurrentPage(newPage)
    fetchData(newPage)
  }

  const handleNextPage = () => {
    const newPage = currentPage + 1
    setCurrentPage(newPage)
    fetchData(newPage)
  }

  useEffect(() => {
    fetchData()
  }, [id])

  return (
    <Layout>
      <div className='p-6 bg-gray-100'>
        <h2 className='text-xl font-semibold mb-4 text-blue-800'>
          Product Reviews
        </h2>
        <div>
          <div className='flex items-center gap-4'>
            <div className='w-16 h-16 bg-blue-100 text-blue-800 font-bold flex items-center justify-center rounded-full text-2xl'>
              {userData?.firstName?.charAt(0)}
              {userData?.lastName?.charAt(0)}
            </div>
            <div>
              <p className='text-lg font-semibold text-gray-800'>
                {userData?.firstName + ' ' + userData?.lastName}
              </p>
              <p className='text-sm text-blue-600'>{userData?.email}</p>
            </div>
          </div>
          <div className='my-2 flex gap-2 items-center'>
            <p className='text-sm text-gray-500'>Total Reviews</p>
            <p className='text-base font-semibold text-gray-800'>
              {totalItems}
            </p>
          </div>
          <div>
            <table className='min-w-full border-collapse border border-gray-300'>
              <thead className='bg-blue-800 text-white'>
                <tr>
                  <th className='border px-4 py-2 text-left'>SL</th>
                  <th className='border px-4 py-2 text-left'>Image</th>
                  <th className='border px-4 py-2 text-left'>Title</th>
                  <th className='border px-4 py-2 text-left'>Rating</th>
                  <th className='border px-4 py-2 text-left'>Review</th>
                  <th className='border px-4 py-2 text-left'>Reviewed on</th>
                  <th className='border px-4 py-2 text-center'>Action</th>
                </tr>
              </thead>
              <tbody>
                {userData?.reviews.length > 0 &&
                  userData?.reviews.map((item, index) => (
                    <tr key={index} className='border-b'>
                      <td className='border px-4 py-2'>{index + 1}</td>
                      <td className='border px-4 py-2'>
                        <div>
                          <Image
                            src={item.product.thumbnailUrl}
                            width={32}
                            height={40}
                            alt='Image'
                          />
                        </div>
                      </td>
                      <td className='border px-4 py-2'>
                        {item?.product.title}
                      </td>
                      <td className='border px-4 py-2'>
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
                      <td className='border px-4 py-2'>
                        {item?.review.slice(0, 20)}{' '}
                        {item?.review.length > 20 && (
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
                        )}
                      </td>
                      <td className='border px-4 py-2'>
                        {new Date(item?.createdAt).toLocaleString()}
                      </td>
                      <td className='border px-2 text-center py-2'>
                        <div className='flex justify-center'>
                          <Button
                            onClick={() =>
                              router.push(
                                `/admin_/products/single-product/${item.product.id}`
                              )
                            }
                            label={'Product Details'}
                            variant='warning'
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              totalPage={totalPages}
              onPreviousClick={handlePreviousPage}
              onNextClick={handleNextPage}
            />
            {reviewModalOpen && (
              <ViewReviewModal
                isOpen={true}
                onClose={() => setReviewModalOpen(false)}
                review={selectedReview}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default page
