/* eslint-disable react/prop-types */
import React from 'react'
import CategoryPage from '../CategoryPage'

const Page = async ({ params }) => {
  const { slug, subCategorySlug } = await params
  return (
    <div>
      <CategoryPage slug={slug} subCategorySlug={subCategorySlug} />
    </div>
  )
}

export default Page
