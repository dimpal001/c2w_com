/* eslint-disable react/prop-types */
'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Skeleton from '../Components/Skeleton'
import { cdnPath } from '../Components/cdnPath'

const FashionWeekSection = () => {
  const [products, setProducts] = useState([])
  const [images, setImages] = useState([])

  useEffect(() => {
    fetchProductWeek()
    fetchImageWeek()
  }, [])

  const fetchProductWeek = async () => {
    const response = await axios.get('/api/customs/fashion-week/product-week')
    setProducts(response.data)
  }

  const fetchImageWeek = async () => {
    const response = await axios.get('/api/customs/fashion-week/image-week')
    setImages(response.data)
  }

  return (
    <div className='container mx-auto pb-10'>
      <ProductWeekSection products={products} />
      <ImageWeekSection products={images} />
      <ProductWeekSection products={products} />
      {products.length === 0 && <Skeleton className={'w-full h-[450px]'} />}
    </div>
  )
}

const ImageWeekSection = ({ products }) => {
  return (
    <div className='grid grid-cols-3 max-sm:grid-cols-1 py-12'>
      {/* First part  */}
      <div className='flex'>
        <img
          src={cdnPath + products[0]?.imageUrl}
          className='object-cover lg:w-[359px] lg:h-[397px] max-sm:w-full'
          alt=''
        />
        <span className='max-sm:hidden font-bold lg:pt-5 max-sm:pt-4 -rotate-90 text-6xl max-sm:text-5xl tracking-[14px] uppercase'>
          fashoin
        </span>
      </div>

      <div className='lg:p-5 max-sm:py-5 lg:px-10'>
        <div className='flex max-sm:grid grid-cols-2'>
          {products?.length > 0 &&
            products
              ?.slice(1, 3)
              .map((image, index) => (
                <img
                  className='lg:w-[161px] lg:h-[200px] object-cover'
                  src={cdnPath + image.imageUrl}
                  alt=''
                  key={index}
                />
              ))}
        </div>
        <p className='uppercase text-7xl tracking-widest font-bold'>WEEK</p>
        <div className='flex justify-center'>
          <div className='w-[40%] h-[6px] bg-pink-400 my-2'></div>
        </div>
        <p className='text-end font-bold text-3xl'>2024</p>
      </div>

      <div className='flex flex-wrap max-sm:grid grid-cols-2'>
        {products?.length > 0 &&
          products
            ?.slice(0, 3)
            .map((image, index) => (
              <img
                src={cdnPath + image.imageUrl}
                className='object-cover lg:w-[166px] lg:h-[201px]'
                key={index}
                alt=''
              />
            ))}
        {products?.length > 0 &&
          products
            ?.slice(0, 1)
            .map((image, index) => (
              <img
                src={cdnPath + image.imageUrl}
                className='object-cover lg:w-[166px] lg:h-[201px]'
                key={index}
                alt=''
              />
            ))}
      </div>
    </div>
  )
}

const ProductWeekSection = ({ products }) => {
  return (
    <div className='grid grid-cols-4 gap-3 max-sm:grid-cols-2 max-sm:p-3'>
      {products?.length > 0 &&
        products?.slice(0, 4).map((product, index) => (
          <div key={index} className='flex gap-3 font-semibold'>
            <img
              src={cdnPath + product?.imageUrl}
              className='lg:w-20 lg:h-20 max-sm:w-full'
              width={100}
              height={100}
              alt=''
            />
            <p className='text-sm max-sm:hidden'>{product?.title}</p>
          </div>
        ))}
    </div>
  )
}

export default FashionWeekSection
