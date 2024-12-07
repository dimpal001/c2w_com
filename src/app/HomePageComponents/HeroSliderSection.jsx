/* eslint-disable react/prop-types */
import React from 'react'
import Skeleton from '../Components/Skeleton'
import { SlideItem, Slider } from './Slider'
import { cdnPath } from '../Components/cdnPath'

const HeroSliderSection = ({ heroSliders }) => {
  return (
    <div className='w-full flex items-center gap-6 lg:h-[582px] '>
      <Slider showArrows={false} showIndicators={false} slideInterval={8000}>
        {heroSliders.length > 0 &&
          heroSliders.map((slider, index) => (
            <SlideItem key={index}>
              <HeroSliderCard slider={slider} />
            </SlideItem>
          ))}
      </Slider>
      {!heroSliders && (
        <Skeleton className={'w-screen lg:h-[582px] max-sm:h-[225px]'} />
      )}
    </div>
  )
}

const HeroSliderCard = ({ slider }) => {
  return (
    <div className='w-screen lg:h-[582px] max-sm:h-[225px]'>
      <img
        src={cdnPath + slider.imageUrl}
        className='w-full lg:h-[582px] max-sm:h-[225px] object-cover'
        alt=''
        loading='lazy'
      />
    </div>
  )
}

export default HeroSliderSection
