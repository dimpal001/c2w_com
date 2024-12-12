/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AddressSelector from './AddressSelector'
import PaymentSelector from './PaymentSelector'
import CouponCode from './CouponCode'
import {
  ShoppingCart,
  ArrowLeftCircle,
  BadgeIndianRupee,
  LoaderCircle,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useUserContext } from '../context/UserContext'
import OrderPlacedModal from './OrderPlacedModal'
import { enqueueSnackbar } from 'notistack'

const CheckoutPage = ({ orderData }) => {
  const [addresses, setAddresses] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [paymentMode, setPaymentMode] = useState('ONLINE')
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [finalPrice, setFinalPrice] = useState(orderData?.totalPrice)
  const [discountData, setDiscountData] = useState(null)
  const [discountMessage, setDiscountMessage] = useState(null)
  const [discountIsApplied, setDiscountIsApplied] = useState(false)
  const [applying, setApplying] = useState(false)
  const [showOrderPlacedModal, setShowOrderPlacedModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const { user } = useUserContext()

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `/api/users/address/get?userId=${user.id}`
      )
      setAddresses(response.data.addresses)
    } catch (error) {
      console.log(error)
    }
  }

  const router = useRouter()

  useEffect(() => {
    console.log(orderData)
    fetchAddresses()
  }, [])

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

  const handleApplyCoupon = async () => {
    if (!couponCode) {
      enqueueSnackbar('Enter a valid coupon code.', { variant: 'error' })
      return
    }

    try {
      setApplying(true)
      const response = await axios.post('/api/customs/discounts/apply', {
        couponCode,
        orderDetailsId: orderData.id,
        userId: user.id,
        device: 'mobile',
      })

      setDiscount(response.data.discountAmount)
      setDiscountIsApplied(true)
      setDiscountMessage(response?.data?.message)
      setDiscountData(response.data.discount)
      setFinalPrice(response.data.newTotalPrice)
    } catch (error) {
      setDiscountIsApplied(false)
      setDiscountMessage(error?.response?.data?.message)
    } finally {
      setApplying(false)
    }
  }

  const handleProceedPayment = async () => {
    if (!selectedAddress) {
      enqueueSnackbar('Select an address.', { variant: 'error' })
      return
    }

    try {
      setSubmitting(true)
      const response = await axios.post('/api/orders/checkout', {
        orderId: orderData.orderId,
        finalPrice,
        discountId: discountData?.id || null,
        paymentMethod: paymentMode,
        addressId: selectedAddress,
      })

      if (response.status === 200) {
        if (response.data.razorpayOrderId) {
          console.log('Razorpay window should open')
          const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
            amount: response.data.amount,
            currency: 'INR',
            order_id: response.data.razorpayOrderId,
            name: 'Clothes2wear',
            description: 'Shopping',
            image: 'https://www.thefashionsalad.com/favicon.ico',
            handler: function (responseData) {
              handleCompleteOrder(
                response.data.orderId,
                responseData.razorpay_order_id,
                responseData.razorpay_payment_id
              )
            },
          }

          // Open Razorpay payment modal
          const razorpay = new window.Razorpay(options)
          razorpay.open()
        }
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleOrderPlace = async () => {
    if (!selectedAddress) {
      enqueueSnackbar('Select an address.', { variant: 'error' })
      return
    }

    try {
      setSubmitting(true)
      const response = await axios.post('/api/orders/order-place', {
        orderId: orderData.orderId,
        finalPrice,
        discountId: discountData?.id || null,
        paymentMethod: paymentMode,
        addressId: selectedAddress,
      })

      if (response.status === 200) {
        setShowOrderPlacedModal(true)
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleCompleteOrder = async (
    orderId,
    razorpay_order_id,
    razorpay_payment_id
  ) => {
    try {
      setSubmitting(true)
      const data = {
        orderId,
        razorpay_order_id,
        razorpay_payment_id,
      }

      console.log(data)

      const response = await axios.post(`/api/orders/complete-order`, data)

      if (response.status === 200) {
        setShowOrderPlacedModal(true)
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      {orderData && (
        <div className='max-w-6xl mx-auto p-6'>
          <div className='flex justify-between items-center mb-6'>
            <div className='flex items-center gap-2'>
              <BadgeIndianRupee className='w-8 h-8 text-pink-600' />
              <h1 className='text-3xl font-semibold'>Checkout</h1>
            </div>
            <button
              onClick={() => router.push('/')}
              className='text-lg text-blue-600 max-sm:hidden flex items-center gap-2'
            >
              <ArrowLeftCircle size={22} />
              Continue Shopping
            </button>
          </div>

          {addresses.length > 0 && (
            <div className=''>
              {/* Address Selector */}
              <AddressSelector
                addresses={addresses}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
              />
            </div>
          )}

          <div className='grid lg:grid-cols-3 items-start gap-5 w-full mt-5'>
            {/* Payment Selector */}
            <PaymentSelector
              paymentMode={paymentMode}
              setPaymentMode={setPaymentMode}
            />

            {/* Coupon Code Section */}
            <CouponCode
              couponCode={couponCode}
              setCouponCode={setCouponCode}
              message={discountMessage}
              applyCoupon={handleApplyCoupon}
              applying={applying}
              isSuccess={discountIsApplied}
              discountData={discountData}
            />

            {/* Cart Summary */}
            <div className='bg-zinc-100 p-6 rounded-lg'>
              <h2 className='text-xl font-semibold mb-4'>Order Summary</h2>
              <div className='flex justify-between mb-2'>
                <span>Total Price</span>
                <span>₹{orderData.totalPrice}</span>
              </div>
              <div className='flex justify-between mb-2'>
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>
              <div className='flex justify-between mb-2 font-bold text-lg'>
                <span>Final Total</span>
                <span>₹{orderData.totalPrice - discount}</span>
              </div>

              <button
                disabled={submitting}
                onClick={() =>
                  paymentMode === 'COD'
                    ? handleOrderPlace()
                    : handleProceedPayment()
                }
                className='w-full py-2 disabled:hover:bg-pink-600 disabled:opacity-70 mt-4 flex gap-2 items-center justify-center text-white bg-pink-600 rounded-lg hover:bg-pink-700'
              >
                {submitting ? (
                  <LoaderCircle className='animate-spin' />
                ) : (
                  <>
                    <ShoppingCart size={20} className='mr-2 inline' />
                    {paymentMode === 'COD'
                      ? 'Place Order'
                      : 'Proceed to Payment'}
                  </>
                )}
              </button>
            </div>
          </div>
          {showOrderPlacedModal && <OrderPlacedModal isOpen={true} />}
        </div>
      )}
    </div>
  )
}

export default CheckoutPage
