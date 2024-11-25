'use client'

import Button from '@/app/admin_/components/Button'
import Layout from '@/app/admin_/components/Layout'
import Loading from '@/app/admin_/components/Loading'
import Pagination from '@/app/admin_/components/Pagination'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { use } from 'react'

const page = ({ params }) => {
  const { id } = use(params)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(null)
  const [totalItems, setTotalItems] = useState(null)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    document.title = "User's Wishlist | Clothes2Wear"
  }, [])

  const fetchData = async () => {
    const params = {
      id: id,
      page: currentPage,
      data: 'wishlist',
    }
    try {
      setLoading(true)
      const response = await axios.get(`/api/users/get/single-user`, { params })
      setUserData(response.data.user)
      setCurrentPage(response.data.currentPage)
      setTotalPages(response.data.totalPages)
      setTotalItems(response.data.totalItems)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
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
        <h2 className='text-xl font-semibold text-blue-800 mb-4'>
          Wishlist Items
        </h2>
        {loading ? (
          <Loading />
        ) : (
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
            <div className='my-2 flex gap-2 items-center'>
              <p className='text-sm text-gray-500'>Total Wishlist Items</p>
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
                    <th className='border px-4 py-2 text-center'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userData?.wishlist.length > 0 &&
                    userData?.wishlist.map((item, index) => (
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
                        <td className='border px-2 text-center py-2'>
                          <div className='flex justify-center'>
                            <Button
                              onClick={() =>
                                router.push(
                                  `/admin_/products/single-product/${item.product.id}`
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
              <Pagination
                currentPage={currentPage}
                totalPage={totalPages}
                onPreviousClick={handlePreviousPage}
                onNextClick={handleNextPage}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default page
