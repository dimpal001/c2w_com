/* eslint-disable react/prop-types */
import React from 'react'
import ProductPage from './ProductPage'
import Header from '@/app/Components/Header'
import axios from 'axios'
import { api } from '@/app/Components/api'

export const metadata = {
  title: 'Product Page | Clothes2Wear',
}

const Page = async ({ params }) => {
  const affiliateId = params.affiliateId

  const response = await axios.get(
    `${api}/api/product/affiliateId?affiliateId=${affiliateId}`
  )

  const product = response.data
  console.log(product)

  return (
    <div>
      <Header />
      <ProductPage product={product} />
    </div>
  )
}

export default Page
