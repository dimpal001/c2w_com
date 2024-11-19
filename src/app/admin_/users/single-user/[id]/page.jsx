/* eslint-disable react/prop-types */
'use client'

import React, { useEffect, useState } from 'react'
import {
  User,
  MapPin,
  BaggageClaim,
  ShoppingCart,
  Star,
  FilePen,
  MoveRight,
} from 'lucide-react'
import Layout from '@/app/admin_/components/Layout'
import axios from 'axios'
import Loading from '@/app/admin_/components/Loading'
import { use } from 'react'
import Button from '@/app/admin_/components/Button'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

// eslint-disable-next-line react/prop-types
const UserDetailsPage = ({ params }) => {
  const { id } = use(params)
  const [userDetails, setUserDetails] = useState(null)
  const [fetching, setFetching] = useState(true)

  const router = useRouter()

  useEffect(() => {
    document.title = 'User Details | Clothes2Wear'
  }, [])

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`/api/users/get/single-user?id=${id}`)
      setUserDetails(response.data.user)
    } catch (error) {
      console.log(error)
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    fetchUserDetails()
  }, [])

  return (
    <Layout>
      {fetching ? (
        <Loading />
      ) : (
        <div className='p-6 bg-gray-100 flex flex-col gap-6'>
          <h1 className='text-xl font-semibold'>
            User Details -{' '}
            {userDetails?.firstName + ' ' + userDetails?.lastName}
          </h1>

          {/* User Info */}
          <div className='bg-white p-6 border rounded-md shadow-md'>
            <h2 className='text-lg font-semibold flex items-center text-blue-500'>
              <User size={20} className='mr-2' /> Personal Information
            </h2>
            <div className='grid grid-cols-2 gap-4 mt-4'>
              <div>
                <strong>Name:</strong>{' '}
                {userDetails?.firstName + ' ' + userDetails?.lastName}
              </div>
              <div>
                <strong>Email:</strong> {userDetails?.email}
              </div>
              <div>
                <strong>Phone:</strong> {userDetails?.phone}
              </div>
              <div>
                <strong>Account Status:</strong>{' '}
                <span
                  className={`${
                    userDetails?.status === 'BANNED'
                      ? 'text-red-500 font-bold'
                      : 'text-gray-700'
                  }`}
                >
                  {userDetails?.status}
                </span>
              </div>
            </div>
            {userDetails?.status === 'BANNED' && (
              <div className='mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md'>
                <strong>Warning:</strong> This account is banned. Please contact
                support for assistance.
              </div>
            )}
          </div>

          {/* Shipping Address */}
          <div className='bg-white p-6 border rounded-md shadow-md'>
            <h2 className='text-lg font-semibold flex items-center text-blue-500'>
              <MapPin size={20} className='mr-2' /> Shipping Address
            </h2>
            <div className='flex flex-col'>
              {userDetails?.addresses?.length > 0 ? (
                userDetails.addresses.map((address, index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-2 gap-3 p-3 mt-4 ${
                      address.isDefault ? 'bg-gray-100' : ''
                    }`}
                  >
                    <div>
                      <strong>Address Line 1:</strong> {address?.addressLine1}
                    </div>
                    <div>
                      <strong>Address Line 2:</strong> {address?.addressLine2}
                    </div>
                    <div>
                      <strong>Mobile Number:</strong> {address?.mobileNumber}
                    </div>
                    <div>
                      <strong>City:</strong> {address?.city}
                    </div>
                    <div>
                      <strong>State:</strong> {address?.state}
                    </div>
                    <div>
                      <strong>Zip:</strong> {address?.zip}
                    </div>
                  </div>
                ))
              ) : (
                <div className='text-gray-500 mt-4'>No addresses found.</div>
              )}
            </div>
          </div>

          {/* Orders */}
          <div className='bg-white p-6 border rounded-md shadow-md'>
            <h2 className='text-lg font-semibold flex items-center text-blue-500'>
              <BaggageClaim size={20} className='mr-2' /> Orders
            </h2>
            {userDetails?.orders?.length > 0 ? (
              <div className='overflow-x-auto mt-4'>
                <table className='min-w-full table-auto'>
                  <thead>
                    <tr className='border-b'>
                      <th className='text-left p-2'>Order ID</th>
                      <th className='text-left p-2'>Date</th>
                      <th className='text-left p-2'>Total</th>
                      <th className='text-left p-2'>Status</th>
                      <th className='text-left p-2'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userDetails.orders.map((order) => (
                      <tr key={order.orderId} className='border-b'>
                        <td className='p-2'>{order.orderId}</td>
                        <td className='p-2'>
                          {new Date(order.updatedAt).toLocaleString()}
                        </td>
                        <td className='p-2'>₹{order.totalPrice}</td>
                        <td className='p-2'>{order.status}</td>
                        <td className='p-2'>
                          <Button
                            onClick={() =>
                              router.push(
                                `/admin_/orders/single-order/${order.orderId}`
                              )
                            }
                            label={'Details'}
                            variant='warning'
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className='text-gray-500 mt-4'>No orders found.</div>
            )}
            {userDetails?.orders?.length > 0 && (
              <div className='flex justify-end'>
                <span className='flex gap-2 hover:gap-3 hover:text-blue-800 transition-all duration-300 cursor-pointer items-center justify-end p-2'>
                  <p>View all</p>
                  <MoveRight />
                </span>
              </div>
            )}
          </div>

          {/* Cart Items */}
          <div className='bg-white p-6 border rounded-md shadow-md'>
            <h2 className='text-lg font-semibold flex items-center text-blue-500'>
              <ShoppingCart size={20} className='mr-2' /> Cart Items
            </h2>
            {userDetails?.cartItems?.length > 0 ? (
              <div>
                <div className='overflow-x-auto mt-4'>
                  <table className='min-w-full table-auto'>
                    <thead>
                      <tr className='border-b'>
                        <th className='text-left p-2'>Product</th>
                        <th className='text-left p-2'>Quantity</th>
                        <th className='text-left p-2'>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userDetails?.cartItems?.map((item, index) => (
                        <tr key={index} className='border-b'>
                          <td className='p-2'>
                            <div className='flex items-center gap-5'>
                              <Image
                                src={item.product.thumbnailUrl}
                                width={32}
                                height={40}
                                alt='Image'
                              />
                              <p>{item?.product?.title}</p>
                            </div>
                          </td>
                          <td className='p-2'>{item.quantity}</td>
                          <td className='p-2'>
                            <Button
                              onClick={() =>
                                router.push(
                                  `/admin_/products/single-product/${item?.product.id}`
                                )
                              }
                              label={'Details'}
                              variant='warning'
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div
                  onClick={() =>
                    router.push(`/admin_/users/single-user/cart/${id}`)
                  }
                  className='flex justify-end'
                >
                  <span className='flex gap-2 hover:gap-3 hover:text-blue-800 transition-all duration-300 cursor-pointer items-center justify-end p-2'>
                    <p>View all</p>
                    <MoveRight />
                  </span>
                </div>
              </div>
            ) : (
              <div className='text-gray-500 mt-4'>No cart items found.</div>
            )}
          </div>

          {/* Wishlist Items */}
          <div className='bg-white p-6 border rounded-md shadow-md'>
            <h2 className='text-lg font-semibold flex items-center text-blue-500'>
              <Star size={20} className='mr-2' /> Wishlist Items
            </h2>
            {userDetails?.wishlist?.length > 0 ? (
              <div>
                <div className='overflow-x-auto mt-4'>
                  <table className='min-w-full table-auto'>
                    <thead>
                      <tr className='border-b'>
                        <th className='text-left p-2'>Product</th>
                        <th className='text-left p-2'>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userDetails?.cartItems?.map((item, index) => (
                        <tr key={index} className='border-b'>
                          <td className='p-2'>
                            <div className='flex items-center gap-5'>
                              <Image
                                src={item.product.thumbnailUrl}
                                width={32}
                                height={40}
                                alt='Image'
                              />
                              <p>{item?.product?.title}</p>
                            </div>
                          </td>
                          <td className='p-2'>
                            <Button
                              onClick={() =>
                                router.push(
                                  `/admin_/products/single-product/${item?.product.id}`
                                )
                              }
                              label={'Details'}
                              variant='warning'
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div
                  onClick={() =>
                    router.push(`/admin_/users/single-user/wishlist/${id}`)
                  }
                  className='flex justify-end'
                >
                  <span className='flex gap-2 hover:gap-3 hover:text-blue-800 transition-all duration-300 cursor-pointer items-center justify-end p-2'>
                    <p>View all</p>
                    <MoveRight />
                  </span>
                </div>
              </div>
            ) : (
              <div className='text-gray-500 mt-4'>No wishlist items found.</div>
            )}
          </div>

          {/* Product reviews */}
          <div className='bg-white p-6 border rounded-md shadow-md'>
            <h2 className='text-lg font-semibold flex items-center text-blue-500'>
              <FilePen size={20} className='mr-2' /> Product Reviews
            </h2>
            {userDetails?.reviews?.length > 0 ? (
              <div>
                <div className='overflow-x-auto mt-4'>
                  <table className='min-w-full table-auto'>
                    <thead>
                      <tr className='border-b'>
                        <th className='text-left p-2'>Product</th>
                        <th className='text-left p-2'>Rating</th>
                        <th className='text-left p-2'>Reviews</th>
                        <th className='text-left p-2'>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userDetails?.reviews?.map((item, index) => (
                        <tr key={index} className='border-b'>
                          <td className='p-2'>
                            <div className='flex items-center gap-5'>
                              <Image
                                src={item.product.thumbnailUrl}
                                width={32}
                                height={40}
                                alt='Image'
                              />
                              <p>{item?.product?.title}</p>
                            </div>
                          </td>
                          <td className='p-2'>{item?.rating}</td>
                          <td className='p-2'>{item?.review}</td>
                          <td className='p-2'>
                            <Button
                              onClick={() =>
                                router.push(
                                  `/admin_/products/single-product/${item?.product.id}`
                                )
                              }
                              label={'Details'}
                              variant='warning'
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div
                  onClick={() =>
                    router.push(`/admin_/users/single-user/reviews/${id}`)
                  }
                  className='flex justify-end'
                >
                  <span className='flex gap-2 hover:gap-3 hover:text-blue-800 transition-all duration-300 cursor-pointer items-center justify-end p-2'>
                    <p>View all</p>
                    <MoveRight />
                  </span>
                </div>
              </div>
            ) : (
              <div className='text-gray-500 mt-4'>No reviews found.</div>
            )}
          </div>
        </div>
      )}
    </Layout>
  )
}

export default UserDetailsPage
