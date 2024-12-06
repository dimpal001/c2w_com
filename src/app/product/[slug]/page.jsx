/* eslint-disable react/prop-types */
import React from 'react'
import ProductPage from './ProductPage'
import Header from '@/app/Components/Header'
import axios from 'axios'
import { api } from '@/app/Components/api'

export const metadata = {
  title: 'Product Page | Clothes2Wear',
  openGraph: {
    title: 'Product Page | Clothes2Wear',
    description:
      'Check out our latest product at Clothes2Wear. Best deals available!',
    images: [
      {
        url: '',
        width: 800,
        height: 600,
        alt: 'Product Image',
      },
    ],
    url: '',
    type: 'website',
    site_name: 'Clothes2Wear',
    locale: 'en_US',
  },
}

const Page = async ({ params }) => {
  const slug = params.slug

  const response = await axios.get(`${api}/api/product?slug=${slug}`)

  const product = response.data

  // Update Open Graph dynamic fields
  metadata.openGraph.images[0].url = product.thumbnailUrl
  metadata.openGraph.url = `${api}/product/${slug}`
  metadata.openGraph.title = product.title

  return (
    <div>
      <Header />
      <ProductPage product={product} />
    </div>
  )
}

export default Page
