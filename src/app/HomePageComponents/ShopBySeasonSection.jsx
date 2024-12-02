'use client'

/* eslint-disable react/prop-types */
import React from 'react'
import Skeleton from '../Components/Skeleton'
import { SlideItem, Slider } from './Slider'

const ShopBySeasonSection = ({ seasons }) => {
  return (
    <div className='mb-10'>
      {seasons.length > 0 &&
        seasons.map((season, index) => (
          <SeasonCard key={index} season={season} />
        ))}

      {!seasons && <Skeleton className={'w-full h-[400px]'} />}
    </div>
  )
}

const SeasonCard = ({ season }) => {
  return (
    <div className='w-screen relative lg:h-[583px] max-sm:h-[500px]'>
      <video
        loop
        className='w-screen max-sm:w-full object-cover lg:h-[583px] max-sm:h-[500px] '
        autoPlay
        muted
        src={season?.videoUrl}
      ></video>
      <div className='w-ful z-10 opacity-40 absolute h-full inset-0 bg-black'></div>
      <div className='w-ful gap-10 flex flex-col justify-center items-center text-white z-20 absolute h-full inset-0 bg-transparent'>
        <div>
          <p className='text-xl max-sm:text-sm max-sm:tracking-[12px] lg:tracking-[20px] pb-3 max-sm:pb-1 uppercase font-bold text-center unbounded'>
            shop by
          </p>
          <p className='text-5xl max-sm:text-4xl uppercase tracking-[10px] font-extrabold text-center unbounded'>
            season
          </p>
        </div>
        <div className='sm:hidden'>
          <Slider
            slideInterval={9000}
            showArrows={false}
            showIndicators={false}
          >
            {season?.products.length > 0 &&
              season?.products.map((product, index) => (
                <SlideItem key={index}>
                  <ProductCard product={product} />
                </SlideItem>
              ))}
          </Slider>
        </div>
        <div className='flex max-sm:hidden w-full justify-evenly'>
          {season?.products.length > 0 &&
            season?.products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          {season.products.length === 0 &&
            Array.from({ length: 5 }, (_, index) => (
              <Skeleton key={index} className={'lg:w-[226px] lg:h-[323px]'} />
            ))}
        </div>
      </div>
    </div>
  )
}

const ProductCard = ({ product }) => {
  return (
    <div className='lg:w-[226px] animate__animated animate__flip lg:h-[323px] max-sm:w-[240px] max-sm:h-[320px]'>
      <img
        className='lg:w-[226px] lg:h-[323px] max-sm:w-[240px] max-sm:h-[380px] object-cover'
        src={product?.imageUrl}
        alt=''
        loading='lazy'
      />
    </div>
  )
}

export default ShopBySeasonSection
