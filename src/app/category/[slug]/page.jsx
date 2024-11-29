import React from 'react'
import CategoryPage from './CategoryPage'

export const metadata = {
  title: 'Category Page | Clothes2Wear',
}
const page = ({ params }) => {
  const slug = params.slug
  return (
    <div>
      <CategoryPage slug={slug} />
    </div>
  )
}

export default page
