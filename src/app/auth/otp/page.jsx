import React, { Suspense } from 'react'
import OtpPage from './OtpPage'
import Loading from '@/app/admin_/components/Loading'

const page = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <OtpPage />
      </Suspense>
    </>
  )
}

export default page
