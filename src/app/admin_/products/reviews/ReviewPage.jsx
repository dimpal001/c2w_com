'use client'

import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Input } from '../components/SimilarProruct'
import axios from 'axios'
import { Ellipsis, Star } from 'lucide-react'
import ReviewModal from './ReviewModal'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown'
import DeleteModal from '@/app/Components/DeleteModal'
import { useRouter, useSearchParams } from 'next/navigation'
import Loading from '../../components/Loading'
import { enqueueSnackbar } from 'notistack'

const ReviewPage = () => {
  const searchParams = useSearchParams()
  const productId = searchParams.get('productId')
  const [styleId, setStyleId] = useState('')
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [productData, setProductData] = useState(null)
  const [selectedReivew, setSelectedReview] = useState(null)

  const router = useRouter()

  useEffect(() => {
    document.title = 'Product Reviews | Clothes2Wear'
  }, [])

  const fetchProductPreview = async (styleId) => {
    try {
      setFetching(true)
      if (!styleId.trim()) {
        enqueueSnackbar('Please enter a valid Product Style ID.', {
          variant: 'error',
        })
        return
      }
      const response = await axios.get(
        `/api/products/get/product-review?styleId=${styleId}`
      )
      setProductData(response.data)
      setNotFound(true)
    } catch (error) {
      console.error('Error fetching product reviews:', error)
    } finally {
      setFetching(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchProductPreview(styleId)
    }
  }

  const handleReviewDelete = async () => {
    console.log(selectedReivew)
  }

  useEffect(() => {
    if (productId) {
      setStyleId(productId)
      fetchProductPreview(productId)
    }
  }, [])

  return (
    <Layout>
      <div className='p-6 bg-gray-100 min-h-[530px]'>
        <div className='flex items-center justify-between mb-5'>
          <h2 className='text-xl font-semibold text-blue-800'>
            Product Reviews
          </h2>
          <div className='flex items-center gap-2'></div>
        </div>
        <div>
          <div>
            <div className='flex my-2 flex-wrap items-end gap-2'>
              <Input
                onChange={(e) => setStyleId(e.target.value)}
                onKeyDown={handleKeyDown}
                value={styleId}
                placeholder={'Enter Product Style ID & hit enter'}
              />
            </div>
            {fetching ? (
              <Loading />
            ) : (
              <div>
                {productData && productData.productReview.length > 0 ? (
                  <div>
                    <table className='w-full'>
                      <thead>
                        <tr className='p-2 bg-blue-800 border border-blue-800 text-white'>
                          <th className='p-2 text-left border-r border-white'>
                            SL
                          </th>
                          <th className='p-2 text-left border-r border-white'>
                            Customer
                          </th>
                          <th className='p-2 text-left border-r border-white'>
                            Rating
                          </th>
                          <th className='p-2 text-left border-r border-white'>
                            Review
                          </th>
                          <th className='p-2 text-left border-r border-white'>
                            Reviewed on
                          </th>
                          <th className='p-2 text-left border-r border-white'>
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {productData &&
                          productData.productReview.length > 0 &&
                          productData?.productReview.map((item, index) => (
                            <tr key={index}>
                              <td className='text-left p-3 border'>
                                <p className='flex items-start'>{index + 1}</p>
                              </td>
                              <td className='text-left p-3 border'>
                                <span
                                  onClick={() =>
                                    router.push(
                                      `/admin_/users/single-user/${item?.user.id}`
                                    )
                                  }
                                  className='hover:text-blue-800 hover:underline cursor-pointer'
                                >
                                  {item?.user.firstName +
                                    ' ' +
                                    item?.user.lastName}
                                </span>
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
                                {item?.review.slice(0, 30)}{' '}
                                {item?.review.length > 2 && (
                                  <span>
                                    ...{' '}
                                    <span
                                      onClick={() => {
                                        setSelectedReview(item)
                                        setReviewModalOpen(true)
                                      }}
                                      className='text-blue-800 cursor-pointer'
                                    >
                                      Read more
                                    </span>
                                  </span>
                                )}
                              </td>
                              <td className='text-left p-3 border'>
                                {new Date(item?.createdAt).toLocaleString()}
                              </td>
                              <td className='text-left p-3 border'>
                                <div className='flex justify-center'>
                                  <Dropdown>
                                    <DropdownTrigger>
                                      <Ellipsis className='cursor-pointer' />
                                    </DropdownTrigger>
                                    <DropdownMenu
                                      className='bg-white border p-3 rounded-md shadow-xl'
                                      aria-label='Static Actions'
                                    >
                                      <DropdownItem
                                        onClick={() => {
                                          setSelectedReview(item)
                                          setReviewModalOpen(true)
                                        }}
                                        className='py-1 px-4 hover:bg-gray-300 rounded-sm'
                                      >
                                        Preview
                                      </DropdownItem>
                                      <DropdownItem
                                        onClick={() => {
                                          setSelectedReview(item)
                                          setDeleteModalOpen(true)
                                        }}
                                        className='text-red-600 py-1 px-4 hover:bg-red-600 hover:text-white rounded-sm'
                                      >
                                        Delete
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </Dropdown>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    {reviewModalOpen && (
                      <ReviewModal
                        isOpen={true}
                        onClose={() => setReviewModalOpen(false)}
                        rating={selectedReivew.rating}
                        review={selectedReivew.review}
                        createdAt={selectedReivew.createdAt}
                        userName={selectedReivew.user.firstName}
                        title={productData.title}
                        thumbnailUrl={productData.thumbnailUrl}
                        profileUrl={productData?.user?.profileUrl}
                      />
                    )}
                    {deleteModalOpen && (
                      <DeleteModal
                        isOpen={true}
                        onClose={() => setDeleteModalOpen(false)}
                        onDelete={handleReviewDelete}
                      />
                    )}
                  </div>
                ) : (
                  <div>
                    {notFound && (
                      <div className='bg-blue-50 shadow-md w-full p-5 rounded-md flex items-center'>
                        <p>No data found</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ReviewPage
