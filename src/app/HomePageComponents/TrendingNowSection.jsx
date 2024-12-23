/* eslint-disable react/prop-types */
import React from 'react'
import Skeleton from '../Components/Skeleton'
import RightArrowIcon from './RightArrowIcon'
import { cdnPath } from '../Components/cdnPath'

const TrendingNowSection = ({ products }) => {
  return (
    <div className='container mx-auto py-10 max-sm:p-0'>
      {/* label  */}
      <div className='flex justify-between md:px-8 items-center max-sm:p-4'>
        <div className='max-sm:w-[80%]'>
          <h2 className='md:text-5xl font-bold max-sm:font-extrabold max-sm:text-xl'>
            What&apos;s Trending Now
          </h2>
          <p className='md:pt-3 max-sm:font-[500] max-sm:text-neutral-600 max-sm:leading-[21px] text-xl max-sm:text-[14px] text-neutral-700'>
            Discover the most trending products in Clothes2Wear
          </p>
        </div>
        <div className=' max-sm:w-[20%] flex justify-center'>
          <RightArrowIcon className={'md:w-20 max-sm:w-10 md:mr-14'} />
        </div>
      </div>

      {/* Product  */}
      <div className='flex gap-5 py-10 max-sm:py-2 px-5 overflow-auto scrollbar-hide'>
        {products.length > 0 &&
          products.map((product, index) => (
            <TrendingNowCard key={index} product={product} />
          ))}

        {!products &&
          Array.from({ length: 5 }, (_, index) => (
            <Skeleton
              key={index}
              className={
                'md:w-[240px] rounded-xl max-sm:w-[110px] max-sm:min-w-[110px] md:h-[443px] max-sm:h-[202px]'
              }
            />
          ))}
      </div>
    </div>
  )
}

const TrendingNowCard = ({ product }) => {
  return (
    <a
      rel='noreferrer'
      target='_blank'
      href={product.hyperLink}
      className='md:w-[240px] cursor-pointer max-sm:w-[110px] max-sm:min-w-[110px] md:h-[443px] max-sm:h-[202px] rounded-xl max-sm:rounded-md'
    >
      <div className='md:w-[240px] max-sm:w-[110px] max-sm:min-w-[110px] relative rounded-xl max-sm:rounded-md md:h-[443px] max-sm:h-[202px]'>
        <video
          loop
          className='rounded-xl max-sm:rounded-md object-cover md:w-[240px] max-sm:w-[110px] max-sm:min-w-[110px] md:h-[443px] max-sm:h-[202px]'
          autoPlay
          muted
          src={cdnPath + product.videoUrl}
        ></video>
        <div className='absolute rounded-xl max-sm:rounded-md bottom-0 left-0 right-0 h-[150px] z-10 bg-gradient-to-t from-black to-transparent from-[1%]'></div>
        <div className='absolute text-lg inset-0 flex justify-start items-end py-3 max-sm:py-2 px-5 max-sm:px-2 z-20 text-white'>
          <div className='flex justify-center items-center flex-col gap-2 max-sm:gap-[2px]'>
            <img
              src={cdnPath + product.avatarUrl}
              className='md:w-[50px] md:h-[50px] max-sm:w-[30px] max-sm:h-[30px] rounded-full'
              alt={product?.title || 'clothes2wear'}
            />
            <marquee direction='left'>
              <span className='max-sm:text-sm'>{product?.title}</span>
            </marquee>
            <p className='text-center max-sm:text-[7px] max-sm:leading-[10px] text-sm leading-6'></p>
            <p className='text-center font-bold max-sm:text-[12px] leading-6'>
              ₹{product?.price}/-
            </p>
          </div>
        </div>
      </div>
    </a>
  )
}

export default TrendingNowSection
