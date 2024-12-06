import React from 'react'
import OrderPage from './OrderPage'
import Header from '@/app/Components/Header'

export const metadata = {
  title: `Order Details | Clothes2Wear`,
}

const page = async ({ params }) => {
  const { id } = await params

  return (
    <div>
      <Header />
      <OrderPage id={id} />
    </div>
  )
}

export default page
