/* eslint-disable react/prop-types */
import React from 'react'
import Skeleton from '../Components/Skeleton'

const HeroSliderSection = ({ heroSliders }) => {
  return (
    <div className='w-full flex items-center gap-6 lg:h-[582px] '>
      {heroSliders.length > 0 &&
        heroSliders
          .slice(0, 1)
          .map((slider, index) => (
            <HeroSliderCard key={index} slider={slider} />
          ))}

      {!heroSliders && (
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
