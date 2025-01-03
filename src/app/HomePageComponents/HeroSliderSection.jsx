'use client'

/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Skeleton from '../Components/Skeleton'
import { cdnPath } from '../Components/cdnPath'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const HeroSliderSection = ({ heroSliders }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      autoplay: true,
      autoplayDelay: 7000,
    },
    [Autoplay({ playOnInit: true, delay: 3000 })]
  )
  const [activeIndex, setActiveIndex] = useState(0)

  const handleSelect = (index) => {
    if (emblaApi) {
      emblaApi.scrollTo(index)
      setActiveIndex(index)
    }
  }

  // Update activeIndex when the slide changes
  if (emblaApi) {
    emblaApi.on('select', () => {
      setActiveIndex(emblaApi.selectedScrollSnap())
    })
  }

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
      <div className='w-full flex items-center gap-6 md:h-[582px] '>
        {!heroSliders && (
          <Skeleton className={'w-screen md:h-[582px] max-sm:h-[225px]'} />
        )}
      </div>

      {/* Slider indicators */}
      <div className='embla__indicators'>
        {heroSliders.map((_, index) => (
          <button
            key={index}
            className={`embla__indicator ${
              index === activeIndex ? 'active' : ''
            }`}
            onClick={() => handleSelect(index)}
          />
        ))}
      </div>
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
