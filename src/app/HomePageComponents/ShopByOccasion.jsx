/* eslint-disable react/prop-types */
import React from 'react'
import RightArrowIcon from './RightArrowIcon'
import { ArrowRight } from 'lucide-react'
import 'animate.css'
import { SlideItem, Slider } from './Slider'
import Skeleton from '../Components/Skeleton'
import { cdnPath } from '../Components/cdnPath'
import Link from 'next/link'

const ShopByOccasion = ({ occasions }) => {
  return (
    <div>
      {/* Heading  */}
      <div className='lg:w-[50%] max-sm:w-full flex lg:justify-center bg-black relative p-4'>
        <div className='lg:pr-10'>
          <h2 className='font-extrabold max-sm:text-2xl text-5xl tracking-wide text-white'>
            Shop by Occasion
          </h2>
          <p className='py-1 max-sm:text-xs text-pink-600'>
            When You & I then why fear Oh! New Occasion is Near
          </p>
        </div>
        <div className='absolute inset-0 flex items-center justify-end pe-3 lg:pe-10'>
          <RightArrowIcon
            className={'w-10 text-white fill-white'}
            fill={'#ffffff'}
          />
        </div>
      </div>

      <div className='w-full shadow-md shadow-zinc-500'>
        <Slider slideInterval={6000} showIndicators={false} showArrows={false}>
          {occasions.map((occasion, index) => (
            <SlideItem key={index}>
              <Occasion occasion={occasion} index={index} />
            </SlideItem>
          ))}
        </Slider>
        <Slider
          slideInterval={8000}
          slideDirection={'slideRight'}
          showIndicators={false}
          showArrows={false}
        >
          {occasions.map((occasion, index) => (
            <SlideItem key={index}>
              <Occasion occasion={occasion} index={index} />
            </SlideItem>
          ))}
        </Slider>
      </div>

      {!occasions && <Skeleton className={'w-full h-[350px]'} />}
    </div>
  )
}

const Occasion = ({ occasion, index }) => {
  return (
    <div
      className={`w-full max-sm:flex-wrap flex ${
        index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
      }`}
    >
      {occasion.products.map((item, index) => (
        <Card key={index} product={item} />
      ))}
      <div className='lg:w-[232px] max-sm:w-[131px] max-sm:h-[147px] lg:h-[284px] p-6 flex flex-col justify-center items-start'>
        <p className='font-extrabold inter max-sm:leading-5 max-sm:text-lg text-4xl'>
          {occasion.occasionName}
        </p>
        <button className='p-3 max-sm:p-2 max-sm:text-[10px] rounded-lg hover:bg-gray-100 font-semibold flex items-center justify-center gap-3'>
          View all <ArrowRight className='max-sm:w-4' />
        </button>
      </div>
    </div>
  )
}

const Card = ({ product }) => {
  return (
    <Link
      target='_blank'
      href={product.hyperLink}
      className='lg:w-[232px] cursor-pointer animate__animated animate__flip animate__delay-1s max-sm:min-w-[131px] max-sm:w-[131px] max-sm:h-[147px] lg:h-[284px]'
    >
      <img
        src={cdnPath + product.imageUrl}
        className='lg:w-[232px] max-sm:min-w-[131px] max-sm:w-[131px] max-sm:h-[147px] lg:h-[284px] object-cover'
        alt={product?.title || 'clothes2wear'}
      />
    </Link>
  )
}

export default ShopByOccasion
