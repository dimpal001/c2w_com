/* eslint-disable react/prop-types */
'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Skeleton from '../Components/Skeleton'
import { cdnPath } from '../Components/cdnPath'
import Link from 'next/link'

const FashionWeekSection = () => {
  const [products, setProducts] = useState([])
  const [images, setImages] = useState([])

  useEffect(() => {
    setTimeout(() => {
      fetchProductWeek()
      fetchImageWeek()
    }, 1200)
  }, [])

  const fetchProductWeek = async () => {
    const response = await axios.get('/api/customs/fashion-week/product-week')
    setProducts(response.data)
    console.log(response.data)
  }

  const fetchImageWeek = async () => {
    const response = await axios.get('/api/customs/fashion-week/image-week')
    setImages(response.data)
    console.log(response.data)
  }

  return (
    <div className='container mx-auto pb-10'>
      <ProductWeekSection products={products} start={0} end={4} />
      <ImageWeekSection products={images} />
      <ProductWeekSection products={products} start={5} end={9} />
      {products.length === 0 && <Skeleton className={'w-full h-[450px]'} />}
    </div>
  )
}

const ImageWeekSection = ({ products }) => {
  return (
    <div className='grid grid-cols-3 max-sm:grid-cols-1 py-12 max-sm:py-1'>
      {/* First part  */}
      <Link target='_blank' href={products[0]?.hyperLink || '#'}>
        <div className='flex max-sm:flex-col'>
          <span className='sm:hidden uppercase text-7xl font-[1000] tracking-widest text-center'>
            fashion
          </span>
          {products[0] ? (
            <img
              src={cdnPath + products[0]?.imageUrl}
              className='object-cover md:w-[359px] md:h-[397px] max-sm:w-full'
              alt={'clothes2wear'}
              loading='lazy'
            />
          ) : (
            <div className='md:w-[359px] md:h-[397px] max-sm:w-full'></div>
          )}
          <span className='max-sm:hidden font-bold md:pt-5 max-sm:pt-4 -rotate-90 text-6xl max-sm:text-5xl tracking-[14px] uppercase'>
            fashion
          </span>
        </div>
      </Link>

      <div className='md:p-5 max-sm:py-5 md:px-10'>
        <div className='flex max-sm:grid grid-cols-2'>
          {products?.length > 0 &&
            products?.slice(1, 3).map((image, index) => (
              <Link key={index} href={image.hyperLink || '#'} target='_blank'>
                <img
                  className='md:w-[161px] md:h-[200px] object-cover'
                  src={cdnPath + image.imageUrl}
                  alt='clothes2wear'
                  loading='lazy'
                />
              </Link>
            ))}
        </div>
        <p className='uppercase text-7xl tracking-widest max-sm:pl-3 font-bold'>
          WEEK
        </p>
        <div className='flex justify-center'>
          <div className='w-[40%] h-[6px] bg-pink-400 my-2'></div>
        </div>
        <p className='text-end font-bold text-3xl max-sm:pr-3'>2024</p>
      </div>

      <div className='flex flex-wrap max-sm:grid grid-cols-2'>
        {products?.length > 0 &&
          products?.slice(3, 9).map((image, index) => (
            <Link key={index} href={image.hyperLink} target='_blank'>
              <img
                src={cdnPath + image.imageUrl}
                className='object-cover md:w-[166px] md:h-[201px]'
                alt='clothes2wear'
                loading='lazy'
              />
            </Link>
          ))}
      </div>
    </div>
  )
}

const ProductWeekSection = ({ products, start, end }) => {
  return (
    <div className='grid grid-cols-4 gap-3 max-sm:grid-cols-2 max-sm:p-3'>
      {products?.length > 0 &&
        products?.slice(start, end).map((product, index) => (
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
              loading='lazy'
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
