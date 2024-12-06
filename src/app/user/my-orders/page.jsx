import Header from '@/app/Components/Header'
import React from 'react'
import OrdersPage from './OrdersPage'

export const metadata = {
  title: 'My Orders | Clothes2Wear',
}

const page = () => {
  return (
    <div>
      <Header />
      <OrdersPage />
    </div>
  )
}

export default page
