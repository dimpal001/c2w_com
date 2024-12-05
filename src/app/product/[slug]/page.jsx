/* eslint-disable react/prop-types */
import React from 'react'
import ProductPage from './ProductPage'
import Header from '@/app/Components/Header'
import axios from 'axios'

export const metadata = {
  title: 'Product Page | Clothes2Wear',
}

const Page = async ({ params }) => {
  const slug = params.slug

  const response = await axios.get(
    `http://192.168.1.21:3000/api/product?slug=${slug}`
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
