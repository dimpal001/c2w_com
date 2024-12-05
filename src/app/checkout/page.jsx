/* eslint-disable react/prop-types */
'use client'

import React from 'react'
import axios from 'axios'
import { Suspense, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../Components/Header'
import CheckoutPage from './CheckoutPage'
import Loading from '../Components/Loading'
import { useUserContext } from '../context/UserContext'
import { useSearchParams } from 'next/navigation'

// Component to extract search params and return the orderId
const OrderIdFetcher = () => {
  const searchParams = useSearchParams()
  const orderId = searchParams?.get('id') || ''
  return orderId
}

const PaymentPage = ({ orderId }) => {
  const [loading, setLoading] = useState(true)
  const [orderData, setOrderData] = useState(null)

  const { user } = useUserContext()
  const router = useRouter()

  const fetchOrderData = async () => {
    try {
      setLoading(true)
      if (!orderId || !user?.id) {
        router.push('/')
        return
      }
      const response = await axios.get(
        `/api/orders/get/current-order?id=${orderId}&userId=${user.id}`
      )
      setOrderData(response.data.orders[0])
    } catch (error) {
      console.error('Error fetching order data:', error)
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (orderId && user?.id) {
      fetchOrderData()
    }
  }, [orderId, user])

  if (loading) {
    return <Loading />
  }

  if (!orderData) {
    router.push('/')
    return null
  }

  return (
    <div>
      <Header />
      <CheckoutPage orderData={orderData} />
    </div>
  )
}

export default function PaymentPageWrapper() {
  return (
    <Suspense fallback={<Loading />}>
      {/* Fetch the orderId inside Suspense */}
      <OrderIdFetcher>
        {(orderId) => <PaymentPage orderId={orderId} />}
      </OrderIdFetcher>
    </Suspense>
  )
}
