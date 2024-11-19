'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Input, Select } from '../../products/components/SimilarProruct'
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import Loading from '../../components/Loading'
import Pagination from '../../components/Pagination'
import { enqueueSnackbar } from 'notistack'

const page = () => {
  const [orderId, setOrderId] = useState('')
  const [orderList, setOrderList] = useState([])
  const [fetching, setFetching] = useState(false)
  const [orderStatus, setOrderStatus] = useState(null)
  const [currentPage, setCurrentPage] = useState(null)
  const [totalPages, setTotalPages] = useState(null)

  const router = useRouter()

  useEffect(() => {
    document.title = 'Order List | Clothes2Wear'
  }, [])

  const fetchOrderList = async () => {
    try {
      setFetching(true)
      const params = {
        orderStatus,
        page: 1,
      }
      if (orderStatus) {
        setOrderId('')
      }
      const response = await axios.get(`/api/orders/get`, { params })
      setOrderList(response.data.orders)
      setCurrentPage(response.data.currentPage)
      setTotalPages(response.data.totalPages)
    } catch (error) {
      console.log(error)
    } finally {
      setFetching(false)
    }
  }

  const handlePreviousPage = () => {
    const newPage = currentPage - 1
    setCurrentPage(newPage)
    fetchOrderList(newPage)
  }

  const handleNextPage = () => {
    const newPage = currentPage + 1
    setCurrentPage(newPage)
    fetchOrderList(newPage)
  }

  useEffect(() => {
    fetchOrderList()
  }, [orderStatus])

  const fetchOrderById = async () => {
    try {
      const response = await axios.get(`/api/orders/get?id=${orderId}`)
      setOrderList(response.data.orders)
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setOrderStatus('')
      fetchOrderById()
    }
  }

  return (
    <>
      <Layout>
        <div className='p-6 bg-gray-100 min-h-screen'>
          <div className='flex items-center justify-between mb-5'>
            <h2 className='text-xl font-semibold text-blue-800'>Order List</h2>
            <div className='flex items-center gap-2'></div>
          </div>

          {/* Filters */}
          <div className='flex my-2 flex-wrap items-end gap-2'>
            <div className='flex flex-wrap items-end gap-2 '>
              <Input
                onKeyDown={handleKeyDown}
                type='text'
                placeholder='Type Order ID & hit enter '
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
              <Select
                className={'w-full'}
                onChange={(e) => setOrderStatus(e.target.value)}
                name='orderStatus'
              >
                <option value=''>Select status</option>
                <option value='INCOMPLETE'>INCOMPLETE</option>
                <option value='PENDING'>PENDING</option>
                <option value='SHIPPED'>SHIPPED</option>
                <option value='DELIVERED'>DELIVERED</option>
                <option value='CANCELLED'>CANCELLED</option>
              </Select>
            </div>
          </div>

          {/* Orders Table */}
          {fetching ? (
            <Loading />
          ) : orderList.length > 0 ? (
            <div className='overflow-x-auto'>
              <table className='w-full border-collapse shadow-lg'>
                <thead>
                  <tr className='bg-blue-800 text-white'>
                    <th className='p-2 border border-gray-300'>SL</th>
                    <th className='p-2 border border-gray-300'>Order ID</th>
                    <th className='p-2 border border-gray-300'>Customer</th>
                    <th className='p-2 border border-gray-300'>Status</th>
                    <th className='p-2 border border-gray-300'>Total Price</th>
                    <th className='p-2 border border-gray-300'>
                      Payment Method
                    </th>
                    <th className='p-2 border border-gray-300'>Discount</th>
                    <th className='p-2 border border-gray-300'>Ordered On</th>
                    <th className='p-2 border border-gray-300 w-40'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orderList.length > 0 &&
                    orderList.map((order, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                        }`}
                      >
                        <td className='p-2 border text-center border-gray-300'>
                          {index + 1}
                        </td>
                        <td className='p-2 border capitalize border-gray-300'>
                          <span
                            onClick={() =>
                              router.push(
                                `/admin_/orders/single-order/${order.id}`
                              )
                            }
                            className='hover:text-blue-800 hover:underline cursor-pointer'
                          >
                            {order.orderId}
                          </span>
                        </td>
                        <td className='p-2 border capitalize border-gray-300'>
                          <span
                            onClick={() =>
                              router.push(
                                `/admin_/users/single-user/${order.user.id}`
                              )
                            }
                            className='hover:text-blue-800 hover:underline cursor-pointer'
                          >
                            {order.user.firstName + ' ' + order.user.lastName}
                          </span>
                        </td>
                        <td
                          className={`p-2 border capitalize border-gray-300 ${
                            order.status === 'PENDING'
                              ? 'text-yellow-600'
                              : 'text-blue-800'
                          }`}
                        >
                          {order.status}
                        </td>
                        <td className='p-2 border capitalize border-gray-300'>
                          {order.totalPrice}
                        </td>
                        <td className='p-2 border capitalize border-gray-300'>
                          {order.paymentMethod}
                        </td>
                        <td
                          className={`p-2 border capitalize border-gray-300 ${
                            order.discountId ? 'text-blue-800' : 'text-gray-600'
                          }`}
                        >
                          {order.discountId ? 'Available' : 'Not available'}
                        </td>
                        <td className='p-2 border capitalize border-gray-300'>
                          {new Date(order.updatedAt).toLocaleString()}
                        </td>
                        <td
                          className={`p-2 border border-gray-300 text-center`}
                        >
                          <p className='w-full flex justify-center'>
                            <Button
                              onClick={() =>
                                router.push(
                                  `/admin_/orders/single-order/${order.orderId}`
                                )
                              }
                              label={'Details'}
                              variant='warning'
                            />
                          </p>
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
          ) : (
            <div className='bg-blue-50 shadow-md w-full p-5 rounded-md flex items-center'>
              <p>No order found</p>
            </div>
          )}
        </div>
      </Layout>
    </>
  )
}

export default page
