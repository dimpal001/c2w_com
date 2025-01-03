'use client'

/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import Skeleton from '../Components/Skeleton'
import { SlideItem, Slider } from './Slider'
import { cdnPath } from '../Components/cdnPath'
import axios from 'axios'

const ShopBySeasonSection = () => {
  const [seasons, setSeasons] = useState([])

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/customs/shop-by-season/get')
      setSeasons(response.data)
    } catch {
      // Enpty
    }
  }

  useEffect(() => {
    setTimeout(() => {
      fetchProducts()
    }, 1000)
  }, [])

  return (
    <div className='mb-10'>
      {seasons.length > 0 &&
        seasons.map((season, index) => (
          <SeasonCard key={index} season={season} />
        ))}

      {seasons === 0 && <Skeleton className={'w-full h-[400px]'} />}
    </div>
  )
}

const SeasonCard = ({ season }) => {
  return (
    <div className='w-screen relative md:h-[583px] max-sm:h-[500px]'>
      <video
        loop
        className='w-screen max-sm:w-full object-cover md:h-[583px] max-sm:h-[500px] '
        autoPlay
        muted
        src={cdnPath + season?.videoUrl}
      ></video>
      <div className='w-ful z-10 opacity-40 absolute h-full inset-0 bg-black'></div>
      <div className='w-ful gap-10 flex flex-col justify-center items-center text-white z-20 absolute h-full inset-0 bg-transparent'>
        <div>
          <p className='text-xl max-sm:text-sm max-sm:tracking-[12px] md:tracking-[20px] pb-3 max-sm:pb-1 uppercase font-bold text-center unbounded'>
            shop by
          </p>
          <h2 className='text-5xl max-sm:text-4xl uppercase tracking-[10px] font-extrabold text-center unbounded'>
            season
          </h2>
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
              <Skeleton key={index} className={'md:w-[226px] md:h-[323px]'} />
            ))}
        </div>
      </div>
    </div>
  )
}

const ProductCard = ({ product }) => {
  return (
    <a
      rel='noreferrer'
      href={product.hyperLink}
      target='_blank'
      className='cursor-pointer rounded-lg md:w-[226px] animate__animated animate__flip md:h-[323px] max-sm:w-[240px] max-sm:h-[320px]'
    >
      <img
        className='md:w-[226px] md:h-[323px] rounded-lg max-sm:w-[240px] max-sm:h-[380px] object-cover'
        src={cdnPath + product?.imageUrl}
        alt={product?.title || 'clothes2wear'}
        loading='lazy'
      />
    </a>
  )
}

export default ShopBySeasonSection
