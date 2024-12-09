import React from 'react'
import { Quote } from 'lucide-react'
import { SlideItem, Slider } from '@/app/HomePageComponents/Slider'
import Image from 'next/image'
import Img from '../../../../assets/WhatsApp.jpeg'

const QuoteSection = () => {
  return (
    <div className='flex justify-center mt-3 items-center bg-transparent'>
      <Slider
        className={'max-sm:p-3'}
        autoSlide={true}
        slideInterval={5000}
        showArrows={false}
        showIndicators={false}
      >
        <SlideItem>
          <Card />
        </SlideItem>
        <SlideItem>
          <Image
            layout='intrinsic'
            className='lg:w-[500px] rounded-tl-2xl rounded-br-2xl lg:h-[150px] -skew-x-12'
            alt=''
            src={Img}
          />
        </SlideItem>
        <SlideItem>
          <Card />
        </SlideItem>
      </Slider>
    </div>
  )
}

const Card = () => {
  return (
    <div className='w-full relative gap-5 max-sm:p-5 -skew-x-12 justify-center items-center rounded-2xl lg:w-[500px] lg:h-[150px] bg-gradient-to-r from-pink-500 to-blue-400 text-white flex mt-3'>
      <p className='font-semibold plhu max-sm:text-sm text-center'>
        Lorem ipsum dolor sit, amet, <br /> consectetur adipisicing elit. Illo
        amet adipisci ratione!
      </p>
      <Quote className='absolute -top-3 w-10 h-10 right-5 fill-pink-600 text-pink-600' />
    </div>
  )
}

export default QuoteSection
