import React from 'react'
import Header from '../Components/Header'
import BlogPage from './Components/BlogPage'
import Footer from '../Components/Footer'
import CategoryBar from '../Components/CategoryBar'

const page = () => {
  return (
    <div>
      <Header />
      <CategoryBar />
      <BlogPage />
      <Footer />
    </div>
  )
}

export default page
