/* eslint-disable react/prop-types */
import React from 'react'
import ProductPage from './ProductPage'
import Header from '@/app/Components/Header'
import axios from 'axios'
import { api } from '@/app/Components/api'
import Footer from '@/app/Components/Footer'
import CategoryBar from '@/app/Components/CategoryBar'
import { cdnPath } from '@/app/Components/cdnPath'

export async function generateMetadata({ params }) {
  const { slug } = await params

  try {
    // Fetch the product data
    const response = await axios.get(`${api}/api/product?slug=${slug}`)
    const product = response.data

    const keywords = product.tags
      ? product.tags.join(', ')
      : 'fashion, clothes, shopping, clothes2wear, men clothes, women clothes'

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.title,
      description:
        product.summary || 'Discover the latest trends with Clothes2Wear.',
      image:
        product.ogImage ||
        cdnPath + product.thumbnailUrl ||
        '/default-image.jpg',
      brand: {
        '@type': 'Brand',
        name: 'Clothes2Wear',
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'INR',
        price: product.price || '0.00',
        availability: 'https://schema.org',
        url: `${api}/product/${slug}`,
      },
    }

    // Return dynamic metadata
    return {
      title: `${product.title} | Clothes2Wear`,
      description: product.summary,
      keywords,
      openGraph: {
        title: product.title,
        description:
          product.summary || 'Discover the latest trends with Clothes2Wear.',
        images: [
          {
            url:
              product.ogImage ||
              cdnPath + product.thumbnailUrl ||
              '/default-image.jpg',
            width: 1600,
            height: 1000,
            alt: product.title || 'Product Image',
          },
        ],
        url: `${api}/product/${slug}`,
        type: 'website',
        site_name: 'Clothes2Wear',
        locale: 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        title: product.title,
        description:
          product.summary || 'Discover the latest trends with Clothes2Wear.',
        image:
          product.ogImage ||
          cdnPath + product.thumbnailUrl ||
          '/default-image.jpg',
      },
      structuredData: schemaData,
    }
  } catch {
    // Fallback metadata
    return {
      title: 'Product | Clothes2Wear',
      keywords: 'men clothes, women clothes',
      openGraph: {
        title: 'Product | Clothes2Wear',
        description: 'Discover the latest trends with Clothes2Wear.',
        images: [
          {
            url: '/default-image.jpg',
            width: 1600,
            height: 1000,
            alt: 'Product Image',
          },
        ],
        url: `${api}/product/${slug}`,
        type: 'website',
        site_name: 'Clothes2Wear',
        locale: 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Product | Clothes2Wear',
        description: 'Discover the latest trends with Clothes2Wear.',
        image: '/default-image.jpg',
      },
    }
  }
}

const Page = async ({ params }) => {
  const { slug } = await params

  try {
    // Fetch the product data
    const response = await axios.get(`${api}/api/product?slug=${slug}`)
    const product = response.data

    return (
      <div>
        <Header />
        <CategoryBar />
        <ProductPage product={product} />
        <Footer />
      </div>
    )
  } catch {
    return (
      <div className='w-screen bg-gradient-to-br from-green-400 to-blue-500 via-indigo-600 text-white flex justify-center items-center h-screen'>
        <p className='text-3xl font-semibold animate__animated animate__flip animate__slow'>
          Hello, world 👋 <br />
          <p className='text-lg py-3'>
            Something went wrong <br />
            Please try again later
          </p>
        </p>
      </div>
    )
  }
}

export default Page
