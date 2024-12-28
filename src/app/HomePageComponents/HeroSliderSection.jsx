'use client'

/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import Skeleton from '../Components/Skeleton'
import { SlideItem, Slider } from './Slider'
import { cdnPath } from '../Components/cdnPath'
import axios from 'axios'

const HeroSliderSection = () => {
  const [heroSliders, setHeroSliders] = useState([])

  const handleFetchHeroSliders = async () => {
    try {
      const response = await axios.get('/api/customs/hero-sliders/get')
      setHeroSliders(response.data.heroSliders)
    } catch {
      // Empty
    }
  }

  useEffect(() => {
    setTimeout(() => {
      handleFetchHeroSliders()
    }, 200)
  }, [])

  return (
    <div className='w-full flex items-center gap-6 md:h-[582px] '>
      {heroSliders.length > 0 && (
        <Slider showArrows={false} showIndicators={true} slideInterval={6000}>
          {heroSliders.length > 0 &&
            heroSliders.map((slider, index) => (
              <SlideItem key={index}>
                <HeroSliderCard slider={slider} />
              </SlideItem>
            ))}
        </Slider>
      )}
      {heroSliders.length === 0 && (
        <Skeleton className={'w-full md:h-[582px] max-sm:h-[225px]'} />
      )}
    </div>
  )
}

const HeroSliderCard = ({ slider }) => {
  return (
    <a
      rel='noreferrer'
      target='_blank'
      href={slider.hyperLink}
      className='w-screen cursor-pointer md:h-[582px] max-sm:h-[225px]'
    >
      <img
        src={cdnPath + slider.imageUrl}
        className='w-full md:h-[582px] max-sm:h-[225px] object-cover'
        alt='clothes2wear'
        loading='lazy'
      />
    </a>
  )
}

export default HeroSliderSection
