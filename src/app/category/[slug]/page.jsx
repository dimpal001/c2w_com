import React from 'react'
import CategoryPage from './CategoryPage'
import Header from '@/app/Components/Header'
import axios from 'axios'
import { api } from '@/app/Components/api'
import { cdnPath } from '@/app/Components/cdnPath'

export const metadata = {
  title: 'Category | Clothes2Wear',
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

const page = async ({ params }) => {
  const slug = params.slug

  const response = await axios.get(`${api}/api/search?categorySlug=${slug}`)

  const allData = response.data

  metadata.openGraph.description = allData.products[0].summary
  metadata.openGraph.images[0].url = cdnPath + allData.products[0]?.thumbnailUrl
  // metadata.openGraph.images[1].url = cdnPath + allData.products[1]?.thumbnailUrl
  // metadata.openGraph.images[2].url = cdnPath + allData.products[2]?.thumbnailUrl
  // metadata.openGraph.images[3].url = cdnPath + allData.products[3]?.thumbnailUrl
  metadata.openGraph.url = `${api}/category/${slug}`

  return (
    <div>
      <Header />
      <CategoryPage slug={slug} />
    </div>
  )
}

export default page
