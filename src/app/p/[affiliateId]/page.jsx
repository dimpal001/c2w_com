/* eslint-disable react/prop-types */
import React from 'react'
import ProductPage from './ProductPage'
import Header from '@/app/Components/Header'
import axios from 'axios'
import { api } from '@/app/Components/api'

// Dynamic Metadata Generation
export async function generateMetadata({ params }) {
  const affiliateId = params.affiliateId

  // Fetch product data for the given affiliateId
  const response = await axios.get(
    `${api}/api/product/affiliateId?affiliateId=${affiliateId}`
  )
  const product = response.data

  // Return metadata based on the fetched product details
  return {
    title: `${product.title} | Clothes2Wear`,
    openGraph: {
      title: `Buy ${product.name} Now | Clothes2Wear`,
      description: `Get the best deals on ${product.name} at Clothes2Wear. Shop now!`,
      images: [
        {
          url: product.ogImage || '/default-og-image.jpg',
          width: 800,
          height: 600,
          alt: product.name || 'Product Image',
        },
      ],
      url: `${api}/product/${affiliateId}`,
      type: 'website',
      site_name: 'Clothes2Wear',
      locale: 'en_US',
    },
  }
}

const Page = async ({ params }) => {
  const affiliateId = params.affiliateId

  // Fetch product data
  const response = await axios.get(
    `${api}/api/product/affiliateId?affiliateId=${affiliateId}`
  )
  const product = response.data

  return (
    <div>
      <Header />
      <ProductPage product={product} />
    </div>
  )
}

export default Page
