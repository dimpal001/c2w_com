/* eslint-disable react/prop-types */
'use client'

import React, { useEffect, useRef } from 'react'
import CouponSecion from './component/CouponSecion'
import DisplayPorductSection from './component/DisplayPorductSection'
import ReviewSection from './component/ReviewSection'
import SimilarProducts from './component/SimilarProducts'
import TagSection from './component/TagSection'
import QuoteSection from './component/QuoteSection'

const ProductPage = ({ product }) => {
  const displayProductRef = useRef(null)

  useEffect(() => {
    if (displayProductRef.current) {
      window.scrollTo({
        top: displayProductRef.current.offsetTop,
        behavior: 'smooth',
      })
    }
  }, [])

  return (
    <div className='container mx-auto p-5 flex flex-col relative max-sm:mb-14'>
      <div>
        <CouponSecion />
      </div>
      <div ref={displayProductRef} className='py-1'></div>
      <div>
        <DisplayPorductSection product={product} />
      </div>
      <div className='flex gap-10 max-sm:flex-col max-sm:gap-5 lg:mt-7 lg:mb-3'>
        <div className='lg:w-[50%]'>
          <ReviewSection reviews={product?.productReview} />
        </div>
        <div className='lg:w-[50%]'>
          <TagSection tags={product?.tags} />
        </div>
      </div>
      <div>
        <QuoteSection />
      </div>
      <div className='my-5'>
        <SimilarProducts products={product?.similarProducts} />
      </div>
    </div>
  )
}

export default ProductPage
