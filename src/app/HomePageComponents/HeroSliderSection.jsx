/* eslint-disable react/prop-types */
'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Skeleton from '../Components/Skeleton'

const HeroSliderSection = () => {
  const [heroSliders, setHeroSliders] = useState([])

  useEffect(() => {
    fetchHeroSliders()
  }, [])

  const fetchHeroSliders = async () => {
    try {
      const response = await axios.get('/api/customs/hero-sliders/get')
      setHeroSliders(response.data.heroSliders)
      console.log(heroSliders)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='w-full flex items-center gap-6 lg:h-[582px] '>
      {heroSliders.length > 0 &&
        heroSliders
          .slice(0, 1)
          .map((slider, index) => (
            <HeroSliderCard key={index} slider={slider} />
          ))}

      {heroSliders.length === 0 && (
        <Skeleton className={'w-full lg:h-[582px] max-sm:h-[225px]'} />
      )}
    </div>
  )
}

const HeroSliderCard = ({ slider }) => {
  return (
    <div className='w-full lg:h-[582px] max-sm:h-[225px]'>
      <img
        src={slider.imageUrl}
        className='w-full lg:h-[582px] max-sm:h-[225px] object-cover'
        alt=''
      />
    </div>
  )
}

export default HeroSliderSection
