import React from 'react'
import Header from '../Components/Header'
import CategoryPage from '../category/[slug]/CategoryPage'
import Footer from '../Components/Footer'

export const metadata = {
  title: 'Search Products | Clothes2Wear',
}
const page = () => {
  return (
    <div>
      <Header />
      <CategoryPage />
      <Footer />
    </div>
  )
}

export default page
