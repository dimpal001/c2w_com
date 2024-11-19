import React, { Suspense } from 'react'
import Loading from '../../components/Loading'
import ReviewPage from './ReviewPage'

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ReviewPage />
    </Suspense>
  )
}

export default page
