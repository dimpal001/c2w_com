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
  const affiliateId = await params.affiliateId

  const response = await axios.get(
    `${api}/api/product/affiliateId?affiliateId=${affiliateId}`
  )

  const product = response.data
  console.log(product)

  // Dynamically updating Open Graph fields with product data
  metadata.openGraph.title = product.title
  metadata.openGraph.description = `Get the best deals on ${product.name} at Clothes2Wear. Shop now!`
  metadata.openGraph.images[0].url = product.thumbnailUrl
  metadata.openGraph.url = `${api}/product/${affiliateId}`

  return (
    <div>
      <Header />
      <ProductPage product={product} />
    </div>
  )
}

export default Page
