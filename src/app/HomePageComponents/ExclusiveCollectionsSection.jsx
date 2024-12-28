'use client'

/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import RightArrowIcon from './RightArrowIcon'
import { SlideItem, Slider } from './Slider'
import Skeleton from '../Components/Skeleton'
import { cdnPath } from '../Components/cdnPath'
import axios from 'axios'
import sanitizeHtml from 'sanitize-html'

const ExclusiveCollectionsSection = () => {
  const [products, setProducts] = useState([])
  const [randomProducts, setRandomProducts] = useState([])

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/customs/exclusive-collections/get')
      setProducts(response.data.exclusiveCollections)
    } catch {
      // Enpty
    }
  }

  const fetchRandomProducts = async () => {
    try {
      const response = await axios.get(
        '/api/products/get/filter?searchQuery=&categoryId=&customerTypeId=&minPrice=&maxPrice=&color=&page=1'
      )
      setRandomProducts(response.data.products)
    } catch {
      // Enpty
    }
  }

  useEffect(() => {
    setTimeout(() => {
      fetchProducts()
      fetchRandomProducts()
    }, 800)
  }, [])

  return (
    <div className='container mx-auto py-10 max-sm:py-3 max-sm:p-0'>
      {/* label  */}
      <div className='flex justify-between md:px-8 items-center max-sm:p-4'>
        <div className='max-sm:w-[80%]'>
          <h2 className='md:text-5xl font-bold max-sm:font-extrabold max-sm:text-xl'>
            Exclusive Collections
          </h2>
          <p className='md:pt-3 max-sm:font-[500] max-sm:text-neutral-600 max-sm:leading-[21px] text-xl max-sm:text-[14px] text-neutral-700'>
            Discover the Most Exclusive Collection of This Season @Clothes2Wear
          </p>
        </div>
        <div className=' max-sm:w-[20%] flex justify-center'>
          <RightArrowIcon className={'md:w-20 max-sm:w-10 md:mr-14'} />
        </div>
      </div>

      <div className='flex gap-1 md:py-10 max-sm:flex-col max-sm:p-5 items-center'>
        <div className='md:w-[50%] font-[1000] md:p-6'>
          <p className='md:text-[80px] max-sm:text-[40px] max-sm:leading-[38px] md:leading-[80px]'>
            WHEN
          </p>
          <p className='md:text-[80px] max-sm:text-[40px] max-sm:leading-[38px] md:leading-[60px]'>
            STYLE MEETS
          </p>
          <p className='md:text-[80px] max-sm:text-[40px] max-sm:leading-[43px] md:leading-[100px] text-pink-500'>
            ELEGANCE
          </p>
        </div>
        <div className='md:w-[50%] max-sm:mt-10'>
          <Slider
            showIndicators={false}
            // showArrows={false}
            slideInterval={7000}
            autoSlide={false}
          >
            {randomProducts.length > 0 &&
              randomProducts.map((item, index) => (
                <SlideItem key={index}>
                  <ProductCard1 product={item} />
                </SlideItem>
              ))}
          </Slider>
        </div>
      </div>

      {/* Product  */}
      <div className='flex gap-7 max-sm:grid grid-cols-2 max-sm:p-5 max-sm:gap-3 py-7 justify-center items-center'>
        {products?.length > 0 &&
          products
            .slice(0, 5)
            .map((product, index) => (
              <ProductCard2 key={index} product={product} />
            ))}

        {products === 0 &&
          Array.from({ length: 5 }, (_, index) => (
            <Skeleton
              key={index}
              className={'md:w-[202px] rounded-2xl md:h-[322px]'}
            />
          ))}
      </div>

      {!products && <Skeleton className={'w-full h-[400px]'} />}
    </div>
  )
}

const ProductCard1 = ({ product }) => {
  const stripHtml = (html) => {
    return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
  }

  return (
    <a
      rel='noreferrer'
      target='_blank'
      href={`/product/${product.slug}`}
      className='md:w-[535px] md:h-[342px] max-sm:h-[330px] rounded-2xl relative'
    >
      <div className='flex justify-between max-sm:grid grid-cols-3 max-sm:h-[300px] max-sm:gap-1 md:h-[270px] gap-3'>
        {product?.images.length > 0 &&
          product?.images
            .slice(0, 3)
            .map((image, index) => (
              <img
                src={cdnPath + image.imageUrl}
                key={index}
                className='md:w-[168px] max-sm:h-[85%] object-cover md:h-[270px]]'
                alt={'Clothes2wear'}
              />
            ))}
      </div>
      <div className='h-[80%] z-10 flex flex-col rounded-2xl justify-end max-sm:p-5 p-8 gap-1 absolute self-end inset-0 bg-gradient-to-t from-25% from-black to-transparent'>
        <p className='text-2xl max-sm:text-lg font-bold text-white'>
          {product.title.slice(0, 50)}
        </p>
        <div className='text-sm max-sm:text-xs text-white'>
          {stripHtml(product?.summary?.slice(0, 170))}
        </div>
        <p className='font-bold text-3xl max-sm:text-2xl text-white'>
          ₹{product.displayPrice}/-
        </p>
      </div>
    </a>
  )
}

const ProductCard2 = ({ product }) => {
  return (
    <a
      rel='noreferrer'
      target='_blank'
      href={product.hyperLink}
      className='md:w-[202px] cursor-pointer rounded-2xl md:h-[322px] relative'
    >
      <img
        src={cdnPath + product.imageUrl}
        className='md:w-[202px] md:h-[322px] rounded-2xl'
        alt={'Clothes2wear'}
      />
      <div className='absolute rounded-2xl inset-0 h-[70%] self-end from-20% bg-gradient-to-t from-black to-transparent'>
        <div className='flex flex-col w-full h-full justify-end p-5 max-sm:p-3 text-white'>
          <p className='text-xs'>{product?.categoryHyperLink.slice(0, 50)}</p>
          <strike className='text-center text-neutral-400'>
            ₹{product?.mrp}/-
          </strike>
          <p className='font-bold text-xl text-end'>₹{product?.price}/-</p>
        </div>
      </div>
    </a>
  )
}

export default ExclusiveCollectionsSection
