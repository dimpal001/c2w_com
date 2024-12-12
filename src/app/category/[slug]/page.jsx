/* eslint-disable react/prop-types */
import React from 'react'
import CategoryPage from './CategoryPage'
import Header from '@/app/Components/Header'
import axios from 'axios'
import { api } from '@/app/Components/api'
import Footer from '@/app/Components/Footer'

const extractTitleFromSlug = (slug) => {
  return slug
    .replace(/[0-9]/g, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export async function generateMetadata({ params }) {
  const { slug } = await params

  const response = await axios.get(`${api}/api/search?categorySlug=${slug}`)
  const allData = response.data

  const title = extractTitleFromSlug(slug)

  const firstProduct = allData.products[0] || {}

  return {
    title: `${title} | Clothes2Wear`,
    openGraph: {
      title: `${title} | Clothes2Wear`,
      description:
        firstProduct.summary || 'Explore our latest products at Clothes2Wear.',
      images: [
        {
          url: firstProduct.ogImage || '/default-category-image.jpg',
          width: 1600,
          height: 1000,
          alt: firstProduct.name || 'Category Image',
        },
      ],
      url: `${api}/category/${slug}`,
      type: 'website',
      site_name: 'Clothes2Wear',
      locale: 'en_US',
    },
  }
}

const Page = async ({ params }) => {
  const { slug } = await params

  const response = await axios.get(`${api}/api/search?categorySlug=${slug}`)
  const allData = response.data

  return (
    <div>
      <Header />
      <CategoryPage slug={slug} data={allData} />
      <Footer />
    </div>
  )
}

export default Page
