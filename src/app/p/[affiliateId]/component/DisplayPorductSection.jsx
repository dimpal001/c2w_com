'use client'

/* eslint-disable react/prop-types */
import { ArrowRight, Forward, Heart } from 'lucide-react'
import React, { useState } from 'react'

const DisplayPorductSection = ({ product }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(product?.thumbnailUrl || '')
  return (
    <div className='flex max-sm:flex-col'>
      {/* Image Section  */}
      <div className='flex max-sm:flex-col-reverse gap-4 max-sm:gap-2 lg:w-[55%]'>
        <div
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          className='flex max-sm:flex-row flex-col gap-3 max-sm:gap-2 lg:max-h-[600px] scrollbar-hide overflow-scroll'
        >
          {product?.images?.length > 0 &&
            product?.images?.map((image, index) => (
              <ProductImage
                key={index}
                image={image}
                onClick={() => setThumbnailUrl(image?.imageUrl)}
              />
            ))}
        </div>
        <div>
          <ThumbnailImage image={thumbnailUrl} />
        </div>
      </div>
      {/* Data Section  */}
      <div className='py-5 lg:w-[47%] flex-col flex gap-3 justify-start'>
        <h1 className='font-bold text-2xl max-sm:text-xl'>{product?.title}</h1>
        <p className='text-sm text-neutral-600'>{product?.summary}</p>
        <p className='text-base'>Style No. CW254578</p>
        <div>
          <button className='rounded-md p-1 text-sm px-4 bg-pink-300 font-semibold'>
            Best Seller
          </button>
        </div>
        <div className='flex justify-between'>
          <div>
            <div className='flex gap-8 items-center'>
              <strike className='text-2xl strik'>
                ₹{product?.inventory[0].mrp}/-
              </strike>
              <span className='text-3xl font-semibold'>
                {' '}
                ₹{product?.inventory[0].price}/-
              </span>
            </div>
            <p className='text-sm mt-2'>
              Est. Delivery by: {new Date().toDateString()}
            </p>
          </div>
          <div className='h-full flex flex-col justify-between'>
            <Heart
              className='text-pink-500 fill-pink-500 cursor-pointer'
              size={27}
            />
            <Forward className='text-pink-500 cursor-pointer' size={27} />
          </div>
        </div>
        <div className='h-[1px] w-[60%] my-5 bg-neutral-300'></div>
        <div>
          <p className='text-xl font-semibold'>Similar Product</p>
          <div className='flex gap-4 py-2 flex-wrap'>
            {product?.images?.length > 0 &&
              product?.images?.map((image, index) => (
                <SimilarProductImage key={index} image={image} />
              ))}
          </div>
        </div>
        <div className='py-3 w-[90%] max-sm:fixed max-sm:px-5 max-sm:gap-3 max-sm:bg-white max-sm:w-full bottom-0 left-0 right-0 flex justify-between gap-4'>
          <button className='rounded-lg py-2 w-full font-semibold uppercase bg-pink-200'>
            add to cart
          </button>
          <button className='rounded-lg py-2 w-full flex justify-center items-center gap-5 font-semibold bg-pink-400 uppercase'>
            buy now
            <div className='bg-white  px-3 py-1 rounded-lg'>
              <ArrowRight className='rounded-lg text-pink-600' />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

const ProductImage = ({ image, onClick }) => {
  return (
    <div onClick={onClick} className='cursor-pointer'>
      <img
        src={image.imageUrl}
        alt={image.altText}
        className='w-[130px] h-[160px] max-sm:w-[50px] max-sm:h-[70px] rounded-lg'
      />
    </div>
  )
}

const SimilarProductImage = ({ image }) => {
  return (
    <div>
      <img
        src={image.imageUrl}
        alt={image.altText}
        className='w-[80px] h-[100px] rounded-lg'
      />
    </div>
  )
}

const ThumbnailImage = ({ image }) => {
  return (
    <img
      src={image}
      alt={image.altText}
      className='lg:w-[500px] object-fill rounded-lg lg:h-[600px] max-sm:w-[353px] max-sm:h-[420px]'
    />
  )
}

export default DisplayPorductSection
