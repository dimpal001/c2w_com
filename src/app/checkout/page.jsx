/* eslint-disable no-undef */

'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
const orderItems = [
  {
    productId: '15eb4732-3c11-498a-a8fc-befc29ca1f00',
    quantity: 2,
    price: 4800,
    sizeId: '1c3666bf-14a3-4b84-92f5-b91e1a35a5b5',
  },
  {
    productId: '917d03a7-0eba-4fb1-a913-d53f2081932c',
    quantity: 2,
    price: 4800,
    sizeId: '347f0d35-e3b9-47f3-b7c2-bf4423105870',
  },
]

const PaymentPage = () => {
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleCompleteOrder = async (
    orderId,
    razorpay_order_id,
    razorpay_payment_id
  ) => {
    try {
      const data = {
        orderId,
        razorpay_order_id,
        razorpay_payment_id,
      }

      console.log(data)

      const response = await axios.post(`/api/orders/complete-order`, data)

      if (response.status === 200) {
        enqueueSnackbar(response.data.message, { variant: 'success' })
        router.push('/order-placed')
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message)
    }
  }

  const handleCheckout = async () => {
    console.log('Button is clicked')
    try {
      setLoading(true)
      const responseData = await axios.post('/api/orders/create', {
        userId: '6eeb6f1d-2508-4cc6-b64c-8a881363168c',
        totalPrice: 8075.8,
        orderItems,
        paymentMethod: 'ONLINE',
      })

      if (responseData.status === 200) {
        if (responseData.data.razorpayOrderId) {
          console.log('Razorpay window should open')
          const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
            amount: responseData.data.amount,
            currency: 'INR',
            order_id: responseData.data.razorpayOrderId,
            name: 'Clothes2wear',
            description: 'Shopping',
            image: 'https://www.thefashionsalad.com/favicon.ico',
            handler: function (response) {
              handleCompleteOrder(
                responseData.data.orderId,
                response.razorpay_order_id,
                response.razorpay_payment_id
              )
            },
          }

          // Open Razorpay payment modal
          const razorpay = new window.Razorpay(options)
          razorpay.open()
        }
      }
    } catch (error) {
      if (error) {
        enqueueSnackbar(
          error?.response?.data?.message || 'Something went wrong'
        )
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => console.log('Razorpay script loaded')
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div>
      <h1>Payment Page</h1>
      <p>Proceed to pay for your purchase.</p>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
      <div></div>
    </div>
  )
}

export default PaymentPage
