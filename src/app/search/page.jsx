import React from 'react'
import Header from '../Components/Header'
import CategoryPage from '../category/[slug]/CategoryPage'

export const metadata = {
  title: 'Search here | Clothes2Wear',
}
const page = () => {
  return (
    <div>
      <Header />
      <CategoryPage />
    </div>
  )
}

export default page
