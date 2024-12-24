/* eslint-disable react/prop-types */
import React from 'react'
import CategoryPage from '../CategoryPage'
import Header from '@/app/Components/Header'

const Page = async ({ params }) => {
  const { slug, subCategorySlug } = await params
  return (
    <div>
      <Header />
      <CategoryPage slug={slug} subCategorySlug={subCategorySlug} />
    </div>
  )
}

export default Page
