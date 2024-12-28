'use client'

/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import RightArrowIcon from './RightArrowIcon'
import { ArrowRight } from 'lucide-react'
import 'animate.css'
import Skeleton from '../Components/Skeleton'
import { cdnPath } from '../Components/cdnPath'
import axios from 'axios'

const ShopByOccasion = () => {
  const [occasions, setOccations] = useState([])

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/customs/shop-by-occasion/occasion')
      setOccations(response.data)
    } catch {
      // Empty
    }
  }

  useEffect(() => {
    setTimeout(() => {
      fetchProducts()
    }, 800)
  }, [])

  return (
    <div>
      {/* Heading  */}
      <div className='md:w-[50%] max-sm:w-full flex md:justify-center bg-black relative p-4'>
        <div className='md:pr-10'>
          <h2 className='font-extrabold max-sm:text-2xl text-5xl tracking-wide text-white'>
            Shop by Occasion
          </h2>
          <p className='py-1 max-sm:text-xs text-pink-600'>
            When You & I then why fear Oh! New Occasion is Near
          </p>
        </div>
        <div className='absolute inset-0 flex items-center justify-end pe-3 md:pe-10'>
          <RightArrowIcon
            className={'w-10 text-white fill-white'}
            fill={'#ffffff'}
          />
        </div>
      </div>

      <div className='w-full h-full shadow-md shadow-zinc-500'>
        {occasions.length > 0 &&
          occasions.map((occasion, index) => (
            <Occasion key={index} occasion={occasion} index={index} />
          ))}
      </div>

      {occasions.length === 0 && <Skeleton className={'w-full h-[350px]'} />}
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
      {occasion.products.slice(0, 6).map((item, index) => (
        <Card key={index} product={item} />
      ))}
      <div className='md:w-[232px] max-sm:w-[131px] max-sm:h-[210px] md:h-[340px] p-6 flex flex-col justify-center items-start'>
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
    <a
      rel='noreferrer'
      target='_blank'
      href={product.hyperLink}
      className='md:w-[232px] cursor-pointer animate__animated animate__flip animate__delay-1s max-sm:min-w-[131px] max-sm:w-[131px] max-sm:h-[210px] md:h-[340px]'
    >
      <img
        src={cdnPath + product.imageUrl}
        className='md:w-[232px] max-sm:min-w-[131px] max-sm:w-[131px] max-sm:h-[210px] md:h-[340px] object-cover'
        alt={product?.title || 'clothes2wear'}
      />
    </a>
  )
}

export default ShopByOccasion
