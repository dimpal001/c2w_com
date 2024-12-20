/* eslint-disable react/prop-types */
'use client'

import React, { useEffect, useRef, useState } from 'react'
// import CouponSecion from './component/CouponSecion'
import DisplayPorductSection from './component/DisplayPorductSection'
import ReviewSection from './component/ReviewSection'
import SimilarProducts from './component/SimilarProducts'
import TagSection from './component/TagSection'
import QuoteSection from './component/QuoteSection'
import axios from 'axios'
import { Loader2 } from 'lucide-react'

const ProductPage = ({ product }) => {
  const displayProductRef = useRef(null)
  const [categoryProducts, setCategoryProducts] = useState([])
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      fetchCategoryData()
    }, 2000)
  }, [])

  const fetchCategoryData = async () => {
    try {
      setFetching(true)
      const response = await axios.get(
        `/api/product/category?id=${product?.categories[0].id}`
      )
      setCategoryProducts(response.data.products)
    } catch (error) {
      console.log(error)
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    if (displayProductRef.current) {
      window.scrollTo({
        top: displayProductRef.current.offsetTop,
        behavior: 'smooth',
      })
    }
  }, [])

  return (
    <div className='container mx-auto p-5 lg:px-10 flex flex-col relative max-sm:mb-14'>
      <div>{/* <CouponSecion /> */}</div>
      <div ref={displayProductRef} className='py-1'></div>
      <div>
        <DisplayPorductSection product={product} />
      </div>
      <div className='flex gap-10 max-sm:flex-col max-sm:gap-5 lg:mt-7 lg:mb-3'>
        {product?.productReview.length > 0 && (
          <div className='lg:w-[50%]'>
            <ReviewSection reviews={product?.productReview} />
          </div>
        )}
        {product?.tags.length > 0 && (
          <div className='lg:w-[50%]'>
            <TagSection tags={product?.tags} />
          </div>
        )}
      </div>
      <div>
        <QuoteSection />
      </div>
      <div className='my-5'>
        {fetching ? (
          <div className='w-full h-[150px] flex justify-center items-center gap-2 text-pink-500'>
            Loading
            <Loader2 className='animate-spin' />
          </div>
        ) : (
          <SimilarProducts products={categoryProducts} />
        )}
      </div>
    </div>
  )
}

export default ProductPage
