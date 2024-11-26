'use client'

import Button from '@/app/admin_/components/Button'
import ErrorComponent from '@/app/admin_/components/ErrorComponent'
import Layout from '@/app/admin_/components/Layout'
import Loading from '@/app/admin_/components/Loading'
import { Input } from '@/app/admin_/products/components/SimilarProruct'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = ({ params }) => {
  const { id } = params
  const [totalItems, setTotalItems] = useState(null)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null) // Error State

  const [searchText, setSearchText] = useState('')
  const [filteredQueries, setFilteredQueries] = useState([])

  const router = useRouter()

  useEffect(() => {
    document.title = "User's Wishlist | Clothes2Wear"
  }, [])

  const fetchData = async () => {
    const params = {
      id: id,
      data: 'search-query',
    }
    try {
      setLoading(true)
      setError(null) // Clear previous error
      const response = await axios.get(`/api/users/get/single-user`, { params })
      if (!response.data.user) throw new Error('User not found')

      setUserData(response.data.user)
      setTotalItems(response.data.totalItems)
      setFilteredQueries(response.data.user.searchQueries || [])
    } catch (error) {
      console.error(error)
      setError(error.message || 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    const text = e.target.value
    setSearchText(text)

    if (userData?.searchQueries) {
      const filtered = userData.searchQueries.filter((query) =>
        query.query.toLowerCase().includes(text.toLowerCase())
      )
      setFilteredQueries(filtered)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  if (loading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <ErrorComponent message={error} retry={fetchData} />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className='p-6 bg-gray-100'>
        <h2 className='text-xl font-semibold text-blue-800 mb-4'>
          Search Queries
        </h2>
        <div>
          <div className='flex items-center gap-4'>
            <div
              onClick={() =>
                router.push(`/admin_/users/single-user/${userData?.id}`)
              }
              className='w-16 cursor-pointer h-16 bg-blue-100 text-blue-800 font-bold flex items-center justify-center rounded-full text-2xl'
            >
              {userData?.firstName?.charAt(0)}
              {userData?.lastName?.charAt(0)}
            </div>
            <div>
              <p
                onClick={() =>
                  router.push(`/admin_/users/single-user/${userData?.id}`)
                }
                className='text-lg font-semibold hover:text-blue-800 hover:underline cursor-pointer text-gray-800'
              >
                {userData?.firstName + ' ' + userData?.lastName}
              </p>
              <p className='text-sm text-blue-600'>{userData?.email}</p>
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <div className='my-2 flex gap-2 items-center'>
              <p className='text-sm text-gray-500'>Total Wishlist Items</p>
              <p className='text-base font-semibold text-gray-800'>
                {totalItems}
              </p>
            </div>
            <Input
              placeholder={'Search...'}
              value={searchText}
              onChange={handleSearch}
            />
          </div>
          <div>
            <table className='min-w-full border-collapse border border-gray-300'>
              <thead className='bg-blue-800 text-white'>
                <tr>
                  <th className='border px-4 py-2 text-left'>SL</th>
                  <th className='border px-4 py-2 text-left'>Query</th>
                  <th className='border px-4 py-2 text-left'>Searched On</th>
                  <th className='border px-4 py-2 text-center'>Action</th>
                </tr>
              </thead>
              <tbody>
                {userData?.searchQueries.length > 0 &&
                  filteredQueries.map((item, index) => (
                    <tr key={index} className='border-b'>
                      <td className='border px-4 py-2 text-center'>
                        {index + 1}
                      </td>
                      <td className='border px-4 py-2'>{item?.query}</td>
                      <td className='border px-4 py-2'>
                        {new Date(item?.createdAt).toDateString()}
                      </td>
                      <td className='border px-2 text-center py-2'>
                        <div className='flex justify-center'>
                          <Button
                            onClick={() =>
                              router.push(
                                `/admin_/orders/single-order/${item.orderId}`
                              )
                            }
                            label={'Details'}
                            variant='warning'
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default page
