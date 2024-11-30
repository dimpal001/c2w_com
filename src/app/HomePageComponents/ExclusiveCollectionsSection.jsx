'use client'

/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import RightArrowIcon from './RightArrowIcon'
import axios from 'axios'
import { SlideItem, Slider } from './Slider'

const ExclusiveCollectionsSection = ({ products }) => {
  const [randomProducts, setRandomProducts] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        '/api/products/get/filter?searchQuery=&categoryId=&customerTypeId=&minPrice=&maxPrice=&color=&page=1'
      )
      setRandomProducts(response.data.products)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container mx-auto py-10 max-sm:py-3 max-sm:p-0'>
      {/* label  */}
      <div className='flex justify-between lg:px-8 items-center max-sm:p-4'>
        <div className='max-sm:w-[80%]'>
          <p className='lg:text-5xl font-bold max-sm:font-extrabold max-sm:text-xl'>
            Exclusive Collections
          </p>
          <p className='lg:pt-3 max-sm:font-[500] max-sm:text-neutral-600 max-sm:leading-[21px] text-xl max-sm:text-[14px] text-neutral-700'>
            Discover the Most Exclusive Collection of This Season @Clothes2Wear
          </p>
        </div>
        <div className=' max-sm:w-[20%] flex justify-center'>
          <RightArrowIcon className={'lg:w-20 max-sm:w-10 lg:mr-14'} />
        </div>
      </div>

      <div className='flex gap-1 lg:py-10 max-sm:flex-col max-sm:p-5 items-center'>
        <div className='lg:w-[50%] font-[1000] lg:p-6'>
          <p className='lg:text-[80px] max-sm:text-[40px] max-sm:leading-[38px] lg:leading-[80px]'>
            WHEN
          </p>
          <p className='lg:text-[80px] max-sm:text-[40px] max-sm:leading-[38px] lg:leading-[60px]'>
            STYLE MEETS
          </p>
          <p className='lg:text-[80px] max-sm:text-[40px] max-sm:leading-[43px] lg:leading-[100px] text-pink-500'>
            ELEGANCE
          </p>
        </div>
        <div className='lg:w-[50%] max-sm:mt-10'>
          <Slider showArrows={false} slideInterval={7000} autoSlide={false}>
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
      </div>
    </div>
  )
}

const ProductCard1 = ({ product }) => {
  return (
    <div className='lg:w-[535px] lg:h-[342px] max-sm:h-[330px] rounded-2xl relative'>
      <div className='flex justify-between max-sm:grid grid-cols-3 max-sm:h-[300px] max-sm:gap-1 lg:h-[270px] gap-3'>
        {product?.images.length > 0 &&
          product?.images
            .slice(0, 3)
            .map((image, index) => (
              <img
                src={image.imageUrl}
                key={index}
                className='lg:w-[168px] max-sm:h-[85%] object-cover lg:h-[270px]]'
                alt=''
              />
            ))}
      </div>
      <div className='h-[80%] z-10 flex flex-col rounded-2xl justify-end max-sm:p-5 p-8 gap-1 absolute self-end inset-0 bg-gradient-to-t from-25% from-black to-transparent'>
        <p className='text-2xl max-sm:text-xl font-bold text-white'>
          {product.title}
        </p>
        <p className='text-sm max-sm:text-xs text-white'>{product.summary}</p>
        <p className='font-bold text-3xl max-sm:text-2xl text-white'>
          ₹{product.displayPrice}/-
        </p>
      </div>
    </div>
  )
}

const ProductCard2 = ({ product }) => {
  return (
    <div className='lg:w-[202px] rounded-2xl lg:h-[322px] relative'>
      <img
        src={product.imageUrl}
        className='lg:w-[202px] lg:h-[322px] rounded-2xl'
        alt=''
      />
      <div className='absolute rounded-2xl inset-0 h-[70%] self-end from-20% bg-gradient-to-t from-black to-transparent'>
        <div className='flex flex-col w-full h-full justify-end p-5 max-sm:p-3 text-white'>
          <p className='text-xs'>{product?.categoryHyperLink}</p>
          <strike className='text-center'>₹{product?.mrp}/-</strike>
          <p className='font-bold text-xl text-end'>₹{product?.price}/-</p>
        </div>
      </div>
    </div>
  )
}

export default ExclusiveCollectionsSection
