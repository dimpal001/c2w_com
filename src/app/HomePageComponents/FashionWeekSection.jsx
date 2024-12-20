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
          className='object-cover md:w-[359px] md:h-[397px] max-sm:w-full'
          alt={'clothes2wear'}
        />
        <span className='max-sm:hidden font-bold md:pt-5 max-sm:pt-4 -rotate-90 text-6xl max-sm:text-5xl tracking-[14px] uppercase'>
          fashoin
        </span>
      </div>

      <div className='md:p-5 max-sm:py-5 md:px-10'>
        <div className='flex max-sm:grid grid-cols-2'>
          {products?.length > 0 &&
            products
              ?.slice(1, 3)
              .map((image, index) => (
                <img
                  className='md:w-[161px] md:h-[200px] object-cover'
                  src={cdnPath + image.imageUrl}
                  alt='clothes2wear'
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
                className='object-cover md:w-[166px] md:h-[201px]'
                key={index}
                alt='clothes2wear'
              />
            ))}
        {products?.length > 0 &&
          products
            ?.slice(0, 1)
            .map((image, index) => (
              <img
                src={cdnPath + image.imageUrl}
                className='object-cover md:w-[166px] md:h-[201px]'
                key={index}
                alt='clothes2wear'
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
          <a
            rel='noreferrer'
            target='_blank'
            href={product.hyperLink}
            key={index}
            className='flex group cursor-pointer gap-3 font-semibold'
          >
            <img
              src={cdnPath + product?.imageUrl}
              className='md:w-20 md:h-20 max-sm:w-full'
              width={100}
              height={100}
              alt='clothes2wear'
            />
            <p className='text-sm max-sm:hidden group-hover:underline'>
              {product?.title}
            </p>
          </a>
        ))}
    </div>
  )
}

export default FashionWeekSection
