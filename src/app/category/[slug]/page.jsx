import React from 'react'
import CategoryPage from './CategoryPage'
import Header from '@/app/Components/Header'

export const metadata = {
  title: 'Category Page | Clothes2Wear',
}
const page = ({ params }) => {
  const slug = params.slug
  return (
    <div>
      <Header />
      <CategoryPage slug={slug} />
    </div>
  )
}

export default page
