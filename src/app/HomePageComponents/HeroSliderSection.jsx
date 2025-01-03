'use client'

/* eslint-disable react/prop-types */
import React from 'react'
import Skeleton from '../Components/Skeleton'
import { cdnPath } from '../Components/cdnPath'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const HeroSliderSection = ({ heroSliders }) => {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      autoplay: true,
      autoplayDelay: 7000,
    },
    [Autoplay({ playOnInit: true, delay: 7000 })]
  )

  return (
    <div>
      <div className='embla' ref={emblaRef}>
        <div className='embla__container'>
          {heroSliders.length > 0 &&
            heroSliders.map((slider, index) => (
              <div
                key={index}
                className='embla__slide md:h-[582px] max-sm:h-[225px]'
              >
                <HeroSliderCard slider={slider} />
              </div>
            ))}
        </div>
      </div>

      {/* Skeleton loader */}
      {!heroSliders && (
        <Skeleton className={'w-screen md:h-[582px] max-sm:h-[225px]'} />
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
      />
    </a>
  )
}

export default HeroSliderSection
