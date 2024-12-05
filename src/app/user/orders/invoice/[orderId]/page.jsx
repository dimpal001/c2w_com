'use client'

/* eslint-disable react/prop-types */
import React from 'react'
import axios from 'axios'
import Logo from '../../../../../assets/img.webp'
import Image from 'next/image'

async function getOrderDetails(orderId) {
  const response = await axios.get(`/api/users/orders?id=${orderId}`, {
    cache: 'no-store',
  })
  return response.data
}

export default async function InvoicePage({ params }) {
  const { orderId } = await params
  const orderDetails = await getOrderDetails(orderId)

  return (
    <div className='bg-white p-6 min-h-[800px]'>
      {/* Print-specific styles */}
      <style>
        {`
          @media print {
            /* Hide the button and any other elements you don't need in the print */
            .no-print {
              display: none !important;
            }

             @page { margin: 0; }
            body { margin: 1.6cm; }

            /* Optional: Hide page numbers, URL, and other browser-specific elements */
            body {
              -webkit-print-color-adjust: exact;
            }
          }
        `}
      </style>

      {/* Header */}
      <div className='border-b pb-4 mb-6 flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold'>Invoice</h1>
          <p className='text-gray-500'>Order ID: {orderDetails.orderId}</p>
          <p className='text-gray-500'>
            Order Date: {new Date(orderDetails.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div>
          <Image layout='intrinsic' className='w-52' src={Logo} alt='Logo' />
        </div>
      </div>

      {/* Customer Information */}
      <div className='mb-6'>
        <h2 className='text-lg font-semibold mb-2'>Customer Information</h2>
        <p>
          <span className='font-semibold'>Name:</span>{' '}
          {orderDetails.user.firstName} {orderDetails.user.lastName}
        </p>
        <p>
          <span className='font-semibold'>Email:</span>{' '}
          {orderDetails.user.email}
        </p>
        <p>
          <span className='font-semibold'>Mobile:</span>{' '}
          {orderDetails.user.mobileNumber}
        </p>
        <p>
          <span className='font-semibold'>Address:</span>{' '}
          {orderDetails.address?.addressLine1}, {orderDetails.address?.city},{' '}
          {orderDetails.address?.state}, {orderDetails.address?.zipCode}
        </p>
      </div>

      {/* Order Summary */}
      <div className='mb-6'>
        <h2 className='text-lg font-semibold mb-2'>Order Summary</h2>
        <table className='w-full border-collapse border border-gray-200'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='border px-4 py-2 text-left'>Product</th>
              <th className='border px-4 py-2 text-left'>Price</th>
              <th className='border px-4 py-2 text-left'>Quantity</th>
              <th className='border px-4 py-2 text-left'>Total</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.orderItems.map((item) => (
              <tr key={item.id}>
                <td className='border px-4 py-2'>{item.product.title}</td>
                <td className='border px-4 py-2'>₹{item.price?.toFixed(2)}</td>
                <td className='border px-4 py-2'>{item.quantity}</td>
                <td className='border px-4 py-2'>
                  ₹{(item.price * item.quantity)?.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pricing Summary */}
      <div className='mb-6'>
        <h2 className='text-lg font-semibold mb-2'>Pricing</h2>
        <div className='flex justify-between mb-2'>
          <p className='text-gray-500'>Subtotal:</p>
          <p>₹{orderDetails.totalPrice?.toFixed(2)}</p>
        </div>
        {orderDetails.discount && (
          <div className='flex justify-between mb-2'>
            <p className='text-gray-500'>Discount:</p>
            <p>-₹{orderDetails.discount.amount?.toFixed(2)}</p>
          </div>
        )}
        <div className='flex justify-between mb-2'>
          <p className='text-gray-500'>Shipping:</p>
          <p>₹{orderDetails.shippingPrice?.toFixed(2) || '0.00'}</p>
        </div>
        <div className='flex justify-between font-semibold'>
          <p>Total:</p>
          <p>₹{orderDetails.finalPrice?.toFixed(2)}</p>
        </div>
      </div>

      <div className='text-center mb-5'>
        <button
          onClick={() => {
            window.print()
          }}
          className='bg-blue-500 text-white py-2 px-4 rounded no-print'
        >
          Download Invoice as PDF
        </button>
      </div>

      {/* Footer */}
      <div className='text-center text-sm text-gray-500'>
        <p>Thank you for shopping with us!</p>
        <p>For support, contact support@clothes2wear.com</p>
      </div>
    </div>
  )
}
