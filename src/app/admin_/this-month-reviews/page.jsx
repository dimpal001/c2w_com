'use client'

import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import Loading from '../components/Loading'
import { useRouter } from 'next/navigation'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown'
import { Ellipsis, Star } from 'lucide-react'
import ReviewModal from '../products/reviews/ReviewModal'
import DeleteModal from '@/app/Components/DeleteModal'
import { enqueueSnackbar } from 'notistack'

const ThisMonthOverview = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedRating, setSelectedRating] = useState(0)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [filteredReviews, setFilteredReviews] = useState([])

  const [selectedReivew, setSelectedReview] = useState(null)
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const router = useRouter()

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  useEffect(() => {
    fetchData()
  }, [selectedMonth, selectedYear])

  useEffect(() => {
    document.title = 'Customer Reviews | Clothes2Wear'
  }, [])

  useEffect(() => {
    if (data?.reviews) {
      filterReviews()
    }
  }, [selectedRating, data])

  const handleMonthChange = (e) => setSelectedMonth(Number(e.target.value))
  const handleYearChange = (e) => setSelectedYear(Number(e.target.value))
  const handleRatingChange = (e) => setSelectedRating(Number(e.target.value))

  const fetchData = async () => {
    try {
      setLoading(true)
      const params = {
        month: selectedMonth,
        year: selectedYear,
      }
      const response = await axios.get(
        `/api/dashboard-data/data-by-month/reviews`,
        {
          params,
        }
      )
      setData(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const filterReviews = () => {
    if (selectedRating === 0) {
      setFilteredReviews(data.reviews)
    } else {
      const filtered = data.reviews.filter(
        (review) => review.rating === selectedRating
      )
      setFilteredReviews(filtered)
    }
  }

  const handleReviewDelete = async () => {
    setDeleteModalOpen(false)
    try {
      const response = await axios.delete('/api/product-review/remove', {
        reviewId: selectedReivew.id,
      })
      if (response.status === 200) {
        enqueueSnackbar('Review deleted successfully', { variant: 'success' })
        setData((prevData) => ({
          ...prevData,
          reviews: prevData.reviews.filter(
            (review) => review.id !== selectedReivew.id
          ),
        }))
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    }
  }

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <div className='p-6 bg-gray-50 min-h-[530px]'>
          {/* Header */}
          <div className='flex items-center justify-between mb-5'>
            <h2 className='text-xl font-semibold text-blue-800'>
              Customer Review - {months[selectedMonth - 1]} {selectedYear}
            </h2>
            <div className='flex items-center gap-2'>
              <select
                value={selectedRating}
                onChange={handleRatingChange}
                className='border rounded-sm bg-blue-800 text-white focus:outline-none px-3 py-2'
              >
                <option value={0}>All Ratings</option>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} Star{rating > 1 && 's'}
                  </option>
                ))}
              </select>
              <select
                value={selectedMonth}
                onChange={handleMonthChange}
                className='border rounded-sm bg-blue-800 text-white focus:outline-none px-3 py-2'
              >
                {months.map((month, index) => (
                  <option key={index} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={handleYearChange}
                className='border rounded-sm bg-blue-800 text-white focus:outline-none px-3 py-2'
              >
                {Array.from(
                  { length: 10 },
                  (_, i) => new Date().getFullYear() - i
                ).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Transaction Table */}
          <div className='bg-white shadow rounded-lg p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-semibold text-gray-800'>Reviews</h3>
              <p className='text-neutral-500 mr-1'>
                {filteredReviews?.length} Reviews
              </p>
            </div>
            <div>
              {filteredReviews.length > 0 ? (
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
                    {data &&
                      filteredReviews.length > 0 &&
                      filteredReviews.map((item, index) => (
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
                              {item?.user.firstName + ' ' + item?.user.lastName}
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
              ) : (
                <div className='bg-blue-50 shadow-md w-full p-5 rounded-md flex items-center'>
                  <p>No data found</p>
                </div>
              )}
              {reviewModalOpen && (
                <ReviewModal
                  isOpen={true}
                  onClose={() => setReviewModalOpen(false)}
                  rating={selectedReivew.rating}
                  review={selectedReivew.review}
                  createdAt={selectedReivew.createdAt}
                  userName={selectedReivew.user.firstName}
                  title={selectedReivew.product.title}
                  thumbnailUrl={selectedReivew.product.thumbnailUrl}
                  profileUrl={selectedReivew?.user?.profileUrl}
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
          </div>
        </div>
      )}
    </Layout>
  )
}

export default ThisMonthOverview
