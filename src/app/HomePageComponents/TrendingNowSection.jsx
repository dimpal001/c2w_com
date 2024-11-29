/* eslint-disable react/prop-types */
'use client'

import axios from 'axios'
import { MoveRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const TrendingNowSection = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/customs/trending/get')
      setProducts(response.data.trendingProducts)
      console.log(products)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container mx-auto py-10'>
      {/* label  */}
      <div className='flex justify-between lg:px-8 items-center'>
        <div>
          <p className='lg:text-5xl font-bold'>What&apos;s Trending Now</p>
          <p className='pt-3 text-xl text-neutral-700'>
            Discover the most trending products in Clothes2Wear
          </p>
        </div>
        <div>
          <MoveRight size={60} className='lg:mr-32' />
        </div>
      </div>

      {/* Product  */}
      <div className='flex gap-5 py-10 px-5'>
        {products.length > 0 &&
          products.map((product, index) => (
            <TrendingNowCard key={index} product={product} />
          ))}
        {products.length > 0 &&
          products
            .slice(0, 2)
            .map((product, index) => (
              <TrendingNowCard key={index} product={product} />
            ))}
      </div>
    </div>
  )
}

const TrendingNowCard = ({ product }) => {
  return (
    <div className='lg:w-[240px] lg:h-[443px] rounded-xl'>
      <div className='lg:w-[240px] relative rounded-xl lg:h-[443px]'>
        <video
          loop
          className='rounded-xl object-cover lg:w-[240px] lg:h-[443px]'
          autoPlay
          muted
          src={product.videoUrl}
        ></video>
        <div className='absolute rounded-xl bottom-0 left-0 right-0 h-[150px] z-10 bg-gradient-to-t from-black to-transparent from-[1%]'></div>
        <div className='absolute text-lg inset-0 flex justify-start items-end py-3 px-5 z-20 text-white'>
          <div className='flex justify-center items-center flex-col gap-2'>
            <img
              src={product.avatarUrl}
              className='lg:w-[50px] lg:h-[50px] rounded-full'
              alt=''
            />
            <p className='text-center text-sm leading-6'>{product?.title}</p>
            <p className='text-center font-bold leading-6'>{product?.price}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrendingNowSection
