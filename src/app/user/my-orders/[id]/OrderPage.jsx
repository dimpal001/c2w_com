/* eslint-disable react/prop-types */
'use client'

import React, { useEffect, useState } from 'react'
import { MessageSquare, ShoppingBag, ArrowLeftCircle } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import axios from 'axios'
import Loading from '@/app/Components/Loading'
import OrderTrackingSection from './OrderTrackingSection'
import { cdnPath } from '@/app/Components/cdnPath'

const OrderPage = ({ id }) => {
  const [orderDetails, setOrderDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchOrderDetails()
  }, [])

  const fetchOrderDetails = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/orders/get?id=${id}`)
      setOrderDetails(response.data.orders[0])
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading />
  }

  const handleWhatsAppClick = () => {
    window.open(
      `https://wa.me/919395498847?text=Hello, I have a query regarding order ID ${orderDetails.orderId}`,
      '_blank'
    )
  }

  return (
    <div className='p-4 max-w-5xl mx-auto'>
      <div className='flex justify-between items-center mb-8'>
        <div className='flex items-center gap-4'>
          <ShoppingBag className='w-8 h-8 text-pink-600' />
          <h1 className='text-3xl max-sm:text-xl font-semibold'>
            Order{' '}
            <i className='text-blue-800 max-sm:text-sm text-base'>({id})</i>
          </h1>
        </div>
        <button
          onClick={() => router.push('/')}
          className='text-lg text-blue-600 max-sm:text-sm max-sm:gap-1 hover:gap-4 transition-all duration-300 flex items-center gap-2'
        >
          <ArrowLeftCircle size={22} />
          Continue Shopping
        </button>
      </div>

      {/* Order Items */}
      <div className='bg-pink-50 p-4 rounded-lg shadow-md mb-6'>
        <h3 className='text-lg font-bold mb-4'>Order Items</h3>
        <div className='space-y-4'>
          {orderDetails.orderItems.map((item) => (
            <div key={item.id} className='flex items-center'>
              <Image
                src={cdnPath + item.product.thumbnailUrl}
                alt={item.name}
                width={60}
                height={60}
                className='rounded-md'
              />
              <div className='ml-4'>
                <h4
                  onClick={() => router.push(`/product/${item.product.slug}`)}
                  className='font-semibold hover:underline hover:text-pink-600 cursor-pointer'
                >
                  {item.product.title}
                </h4>
                <p className='text-sm text-gray-600'>
                  Quantity: {item.quantity} | Size:{' '}
                  <span className='uppercase'>{item.size.name}</span> | Price: ₹
                  {item.product.displayPrice}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order info */}
      <div className='bg-pink-50 p-6 rounded-lg shadow-md mb-6'>
        <h3 className='text-xl font-semibold mb-4 text-center text-blue-800'>
          Order Info
        </h3>
        <div className='text-sm text-gray-700 space-y-3'>
          {/* Item Total */}
          <div className='flex justify-between'>
            <span className='font-medium'>Ordered date:</span>
            <strong>
              {new Date(orderDetails.createdAt).toLocaleDateString()}
            </strong>
          </div>
        </div>
      </div>

      {/* Order tracking  */}
      <OrderTrackingSection status={orderDetails.status} />

      {/* Price Breakdown */}
      <div className='bg-white p-6 rounded-lg shadow-md mb-6'>
        <h3 className='text-xl font-semibold mb-4 text-center text-blue-800'>
          Price Breakdown
        </h3>
        <div className='text-sm text-gray-700 space-y-3'>
          {/* Item Total */}
          <div className='flex justify-between'>
            <span className='font-medium'>Item Total:</span>
            <strong>₹{orderDetails.finalPrice.toFixed(2)}</strong>
          </div>

          {/* Shipping Charges */}
          <div className='flex justify-between'>
            <span className='font-medium'>Shipping Charges:</span>
            <span
              className={`${
                orderDetails.shippingCharges > 0
                  ? 'text-black'
                  : 'text-green-500'
              }`}
            >
              {orderDetails.shippingCharges > 0
                ? `₹${orderDetails.shippingCharges}`
                : 'Free'}
            </span>
          </div>

          {/* Discount */}
          {orderDetails.discount > 0 && (
            <div className='flex justify-between'>
              <span className='font-medium text-green-600'>Discount:</span>
              <span className='text-green-600'>- ₹{orderDetails.discount}</span>
            </div>
          )}

          {/* Tax (if applicable) */}
          {orderDetails.tax > 0 && (
            <div className='flex justify-between'>
              <span className='font-medium'>Tax (GST):</span>
              <span>₹{orderDetails.tax}</span>
            </div>
          )}

          {/* Final Price */}
          <div className='flex justify-between border-t-2 border-gray-200 pt-3'>
            <span className='font-bold text-lg'>Final Price:</span>
            <span className='font-bold text-lg text-pink-600'>
              ₹{orderDetails.finalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Mode of Payment */}
        <div className='mt-6 bg-gray-50 p-4 rounded-lg shadow-inner text-center'>
          <h4 className='text-md font-medium'>Payment Mode:</h4>
          <p
            className={`font-bold text-${
              orderDetails.paymentMethod === 'COD' ? 'red' : 'green'
            }-600`}
          >
            {orderDetails.paymentMethod === 'COD'
              ? 'Cash On Delivery'
              : 'Online'}
          </p>
        </div>
      </div>

      <div className='grid lg:grid-cols-2 grid-cols-1 gap-5'>
        {/* Admin Info */}
        <div className='bg-white p-4 rounded-lg shadow-md mb-6'>
          <h3 className='text-lg font-bold mb-4'>Other Info</h3>
          <p className='text-sm text-gray-700'>{orderDetails.notes}</p>
          <button
            onClick={() =>
              router.push(`/user/orders/invoice/${orderDetails.id}`)
            }
            className='p-1 px-5 rounded-md bg-pink-600 text-white font-semibold'
          >
            Invoice
          </button>
        </div>

        {/* WhatsApp Support */}
        <div className='bg-white p-4 flex flex-col items-center justify-center pb-10 rounded-lg shadow-md text-center'>
          <div className='flex justify-center items-center p-3'>
            <img
              src='/whatsapp.gif'
              className='bg-transparent'
              alt='whatsapp'
            />
          </div>
          <button
            className='flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg'
            onClick={handleWhatsAppClick}
          >
            <MessageSquare className='w-5 h-5' />
            Contact on WhatsApp
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderPage
