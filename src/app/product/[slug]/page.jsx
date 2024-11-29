import React from 'react'
import ProductPage from './ProductPage'
import Header from '@/app/Components/Header'

export const metadata = {
  title: 'Product Page | Clothes2Wear',
}
const page = ({ params }) => {
  const slug = params.slug
  return (
    <div>
      <Header />
      <ProductPage slug={slug} />
    </div>
  )
}

export default page
