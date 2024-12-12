'use client'

import Button from '@/app/admin_/components/Button'
import Layout from '@/app/admin_/components/Layout'
import axios from 'axios'
import { IndianRupee, ShoppingCart, User } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { use } from 'react'
import DeleteOrderModal from '../DeleteOrder'
import { enqueueSnackbar } from 'notistack'
import { cdnPath } from '@/app/Components/cdnPath'

const page = ({ params }) => {
  const { id } = use(params)
  const router = useRouter()

  const [orderDetails, setOrderDetails] = useState(null)
  const [showDeleteModal, setDeleteModal] = useState(false)

  const fetchSingleOrder = async () => {
    try {
      const response = await axios.get(`/api/orders/get?id=${id}`)
      setOrderDetails(response.data.orders[0])
      console.log(orderDetails)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchSingleOrder()
  }, [id])

  useEffect(() => {
    document.title = 'Order Details | Clothes2Wear'
  }, [])

  const handleOrderDelete = async () => {
    setDeleteModal(false)
    try {
      const response = await axios.delete('/api/orders/delete', {
        data: { id: orderDetails.id },
      })

      enqueueSnackbar(response.data.message, {
        variant: 'success',
        autoHideDuration: 5000,
      })
      router.push('/admin_/orders/order-list')
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, {
        variant: 'error',
        autoHideDuration: 6000,
      })
    }
  }

  return (
    <Layout>
      <div className='p-6 bg-gray-100 min-h-screen'>
        <div className='flex justify-between gap-3 items-center'>
          <h2 className='text-xl font-semibold mb-4 text-blue-800'>
            Order Details{' '}
            {orderDetails && (
              <span className='italic'>(#{orderDetails?.orderId})</span>
            )}
          </h2>
          <Button
            label={'Delete Order'}
            onClick={() => setDeleteModal(true)}
            variant='error'
          />
        </div>
        <div>
          <p className='text-xl'>Order Info</p>
          <div className='grid grid-cols-2 gap-x-14 gap-y-7 py-5'>
            {/* Customer details  */}
            <div className='p-5 flex gap-4 rounded-md bg-white shadow-md'>
              <div className='flex items-center'>
                <User size={30} className='text-blue-600 opacity-70' />
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-2xl'>Customer</p>
                <p>
                  <span className='text-neutral-400'>Name:</span>{' '}
                  {orderDetails?.user.firstName +
                    ' ' +
                    orderDetails?.user?.lastName}
                </p>
                <p>
                  <span className='text-neutral-400'>Email:</span>{' '}
                  {orderDetails?.user?.email}
                </p>
              </div>
            </div>

            {/* Order Info  */}
            <div className='p-8 flex gap-4 rounded-md bg-white shadow-md'>
              <div className='flex items-center'>
                <ShoppingCart size={30} className='text-green-500 opacity-70' />
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-2xl'>Order Info</p>
                <p>
                  <span className='text-neutral-400'>Payment Method:</span>{' '}
                  <span>{orderDetails?.paymentMethod}</span>
                </p>
                <p>
                  <span className='text-neutral-400'>Status:</span>{' '}
                  {orderDetails?.status}
                </p>
              </div>
            </div>

            {/* Pricing Summary  */}
            {orderDetails?.paymentDetails?.length > 0 && (
              <div className='p-8 flex gap-4 rounded-md bg-white shadow-md'>
                <div className='flex items-center'>
                  <IndianRupee size={30} className='text-pink-500 opacity-70' />
                </div>
                <div className='flex flex-col gap-1'>
                  <p className='text-2xl'>Payment Info</p>
                  <p>
                    <span className='text-neutral-400'>Payment Method:</span>{' '}
                    <span className='uppercase'>
                      {orderDetails?.paymentDetails[0]?.method}
                    </span>
                  </p>
                  <p>
                    <span className='text-neutral-400'>Amount:</span> Rs.{' '}
                    {orderDetails?.paymentDetails[0]?.amount}
                  </p>
                </div>
              </div>
            )}

            {orderDetails?.status !== 'INCOMPLETE' && (
              <div className='p-8 flex gap-4 rounded-md bg-white shadow-md'>
                <div className='flex items-center'>
                  <IndianRupee size={30} className='text-pink-500 opacity-70' />
                </div>
                <div className='flex flex-col w-full gap-1'>
                  <p className='text-2xl'>Pricing Summary</p>
                  <div className='mt-4 w-full'>
                    <table className='w-full'>
                      <tbody>
                        {/* Row 1: Price */}
                        <tr className='flex justify-between'>
                          <td className='text-left'>Price</td>
                          <td className='text-right'>
                            ₹ {orderDetails?.totalPrice.toFixed(2)}
                          </td>
                        </tr>

                        {/* Row 2: Discount Price */}
                        <tr className='flex justify-between'>
                          <td className='text-left'>Discount</td>
                          <td className='text-right'>
                            - ₹{' '}
                            {(
                              orderDetails?.finalPrice -
                              orderDetails?.totalPrice
                            ).toFixed(2)}
                          </td>
                        </tr>

                        {/* Divider */}
                        <tr>
                          <td colSpan={2}>
                            <hr className='border-t border-gray-300 my-2' />
                          </td>
                        </tr>

                        {/* Row 3: Total Price */}
                        <tr className='flex justify-between'>
                          <td className='text-left font-bold'>Total</td>
                          <td className='text-right font-bold'>
                            ₹ {orderDetails?.finalPrice?.toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div>
            <p className='text-xl'>Order Items</p>
            <div className='flex flex-col gap-2 py-5'>
              {orderDetails?.orderItems.map((item, index) => (
                <div
                  key={index}
                  className='grid grid-cols-5 items-center gap-3 p-2 bg-white rounded-sm'
                >
                  <Image
                    src={cdnPath + item.product.thumbnailUrl}
                    width={32}
                    height={40}
                    alt='Image'
                  />
                  <p>{item.product.title}</p>
                  <p>
                    <span className='text-neutral-500'>Quantity :</span>{' '}
                    {item.quantity}
                  </p>
                  <p>
                    <span className='text-neutral-500'>Price :</span>{' '}
                    {item?.product.displayPrice}
                  </p>
                  <Button
                    onClick={() =>
                      router.push(
                        `/admin_/products/single-product/${item.productId}`
                      )
                    }
                    label={'Product Details'}
                  />
                </div>
              ))}
              {showDeleteModal && (
                <DeleteOrderModal
                  isOpen={true}
                  onClose={() => setDeleteModal(false)}
                  onDelete={handleOrderDelete}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default page
