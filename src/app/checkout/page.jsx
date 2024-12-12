/* eslint-disable no-undef */

'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import CheckoutPage from './CheckoutPage'
import Loading from '../Components/Loading'
import { useUserContext } from '../context/UserContext'

const PaymentPage = () => {
  const [loading, setLoading] = useState(true)
  const [orderData, setOrderData] = useState(null)
  let orderId

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search)
      orderId = searchParams.get('id') || ''
      console.log(searchParams.get('id'))
    }
  }, [])

  const { user } = useUserContext()

  const router = useRouter()

  const fetchOrderData = async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        `/api/orders/get/current-order?id=${orderId}&userId=${user.id}`
      )
      setOrderData(response.data.orders[0])
      if (response.data.orders[0].status !== 'INCOMPLETE') {
        router.push('/')
      }
    } catch {
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrderData()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      <Header />
      <CheckoutPage orderData={orderData} />
    </div>
  )
}

export default PaymentPage
