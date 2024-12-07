/* eslint-disable react/prop-types */
import React from 'react'
import Skeleton from '../Components/Skeleton'
import { SlideItem, Slider } from './Slider'
import { cdnPath } from '../Components/cdnPath'
import Link from 'next/link'

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
    <Link
      target='_blank'
      href={slider.hyperLink}
      className='w-screen cursor-pointer lg:h-[582px] max-sm:h-[225px]'
    >
      <img
        src={cdnPath + slider.imageUrl}
        className='w-full lg:h-[582px] max-sm:h-[225px] object-cover'
        alt='clothes2wear'
        loading='lazy'
      />
    </Link>
  )
}

export default HeroSliderSection
