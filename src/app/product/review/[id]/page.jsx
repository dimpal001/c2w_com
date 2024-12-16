import Header from '@/app/Components/Header'
import React from 'react'
import ReviewPage from './ReviewPage'
import Footer from '@/app/Components/Footer'

const page = async ({ params }) => {
  const { id } = await params
  return (
    <div>
      <Header />
      <ReviewPage reviewId={id} />
      <Footer />
    </div>
  )
}

export default page
