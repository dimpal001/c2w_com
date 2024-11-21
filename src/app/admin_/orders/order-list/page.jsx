'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Input, Select } from '../../products/components/SimilarProruct'
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'
import Pagination from '../../components/Pagination'
import { enqueueSnackbar } from 'notistack'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown'
import { CircleCheck, Ellipsis } from 'lucide-react'
import UpdateOrderModal from './UpdateOrderModal'

const page = () => {
  const [orderId, setOrderId] = useState('')
  const [orderList, setOrderList] = useState([])
  const [fetching, setFetching] = useState(false)
  const [orderStatus, setOrderStatus] = useState(null)
  const [currentPage, setCurrentPage] = useState(null)
  const [totalPages, setTotalPages] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showUpdateModal, setShowUpdateModal] = useState(false)

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

  const handleUpdateCompleted = (updatedOrder) => {
    console.log(updatedOrder)
    const updatedOrderIndex = orderList.findIndex(
      (order) => order.id === updatedOrder.id
    )

    if (updatedOrderIndex !== -1) {
      const updatedOrderList = [...orderList]
      updatedOrderList[updatedOrderIndex] = updatedOrder

      setOrderList(updatedOrderList)

      enqueueSnackbar('Order updated successfully!', { variant: 'success' })
    } else {
      enqueueSnackbar('Order not found!', { variant: 'error' })
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
                <option value='APPROVED'>APPROVED</option>
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
                    <th className='p-2 border border-gray-300'>Tracking ID</th>
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
                          className={`p-2 border capitalize border-gray-300 
                            ${order.status === 'PENDING' && 'text-yellow-600'} 
                            ${order.status === 'INCOMPLETE' && 'text-red-600'} 
                            ${order.status === 'CANCELLED' && 'text-red-600'} 
                            ${order.status === 'DELIVERED' && 'text-green-600'} 
                            ${order.status === 'APPROVED' && 'text-green-600'} 
                            ${order.status === 'SHIPPED' && 'text-blue-600'} 
                            
                            `}
                        >
                          <p className='flex items-center gap-1'>
                            {order.status}
                            {order.status === 'DELIVERED' && (
                              <CircleCheck
                                size={20}
                                className='text-green-600'
                              />
                            )}
                          </p>
                        </td>
                        <td className='p-2 border capitalize border-gray-300'>
                          {order.totalPrice}
                        </td>
                        <td className='p-2 border capitalize border-gray-300'>
                          {order.paymentMethod}
                        </td>
                        <td
                          className={`p-2 border capitalize border-gray-300 ${
                            order.trackingId === '' && 'bg-gray-200'
                          }`}
                        >
                          {order.trackingId}
                        </td>
                        <td className='p-2 border capitalize border-gray-300'>
                          {new Date(order.updatedAt).toLocaleString()}
                        </td>
                        <td
                          className={`p-2 border border-gray-300 text-center`}
                        >
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
                                    setSelectedOrder(order)
                                    setShowUpdateModal(true)
                                  }}
                                  className='py-1 px-4 hover:bg-gray-300 rounded-sm'
                                >
                                  Update
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() =>
                                    router.push(
                                      `/admin_/orders/single-order/${order.orderId}`
                                    )
                                  }
                                  className='text-yellow-600 py-1 px-4 hover:bg-gray-300 rounded-sm'
                                >
                                  Details
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
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
          ) : (
            <div className='bg-blue-50 shadow-md w-full p-5 rounded-md flex items-center'>
              <p>No order found</p>
            </div>
          )}
          {showUpdateModal && (
            <UpdateOrderModal
              isOpen={true}
              onClose={() => setShowUpdateModal(false)}
              order={selectedOrder}
              onCompleted={handleUpdateCompleted}
            />
          )}
        </div>
      </Layout>
    </>
  )
}

export default page
