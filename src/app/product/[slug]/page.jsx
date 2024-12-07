/* eslint-disable react/prop-types */
import React from 'react'
import ProductPage from './ProductPage'
import Header from '@/app/Components/Header'
import axios from 'axios'
import { api } from '@/app/Components/api'

export async function generateMetadata({ params }) {
  const slug = params.slug

  // Fetch the product data
  const response = await axios.get(`${api}/api/product?slug=${slug}`)
  const product = response.data

  // Return dynamic metadata
  return {
    title: `${product.title} | Clothes2Wear`,
    openGraph: {
      title: product.title,
      description:
        product.description || 'Discover the latest trends with Clothes2Wear.',
      images: [
        {
          url: product.ogImage || '/default-image.jpg',
          width: 800,
          height: 600,
          alt: product.title || 'Product Image',
        },
      ],
      url: `${api}/product/${slug}`,
      type: 'website',
      site_name: 'Clothes2Wear',
      locale: 'en_US',
    },
  }
}

const Page = async ({ params }) => {
  const slug = params.slug

  // Fetch the product data
  const response = await axios.get(`${api}/api/product?slug=${slug}`)
  const product = response.data

  return (
    <div>
      <Header />
      <ProductPage product={product} />
    </div>
  )
}

export default Page
