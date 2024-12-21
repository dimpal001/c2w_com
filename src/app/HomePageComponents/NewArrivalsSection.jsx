/* eslint-disable react/prop-types */
import React from 'react'
import RightArrowIcon from './RightArrowIcon'
import { ArrowRight } from 'lucide-react'
import Skeleton from '../Components/Skeleton'
import { cdnPath } from '../Components/cdnPath'

const NewArrivalsSection = ({ products }) => {
  return (
    <div className='container mx-auto pb-10 md:px-3 max-sm:p-5'>
      <div>
        <div className='flex items-center'>
          <div className='md:w-[80%] max-sm:w-[75%] border border-black px-4'>
            <h2 className='md:tracking-[5px] max-sm:tracking-[5px] max-sm:text-[21px] text-black md:text-[45px] font-bold max-sm:font-extrabold'>
              NEW ARRIVALS
            </h2>
          </div>
          <div className='md:w-[20%] max-sm:w-[25%] max-sm:ps-3 flex justify-center'>
            <RightArrowIcon className={'md:w-20 max-sm:w-10'} />
          </div>
        </div>
        <p className='md:text-2xl md:py-3 text-neutral-700'>
          Hurry Up!!! New Winter Clothes Arrived
        </p>
      </div>

      <div className='md:h-[390px] pt-4'>
        <div className='bg-zinc-200 scrollbar-hide max-sm:p-4 max-sm:overflow-auto max-sm:gap-5 flex items-center justify-evenly w-full h-full rounded-xl'>
          {products.length > 0 &&
            products
              .slice(0, 4)
              .map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
        </div>
      </div>

      {!products && (
        <Skeleton className={'w-full h-[390px] max-sm:h-[270px]'} />
      )}
    </div>
  )
}

const ProductCard = ({ product }) => {
  return (
    <div className='flex max-sm:min-w-[320px] items-center cursor-pointer relative group rounded-xl max-sm:h-[270px] md:h-[300px]'>
      <img
        className='md:w-[225px] object-cover w-[150px] max-sm:min-w-[150px] group-hover:animate-appearance-in md:h-[300px] md:min-w-[225px] md:max-w-[225px] rounded-xl'
        src={cdnPath + product.imageUrl}
        alt={product?.title || 'clothes2wear'}
      />
      <div className='w-2 p-3 max-sm:w-[170px] h-[90%] md:group-hover:w-[220px] overflow-hidden transition-all duration-300 bg-pink-500 rounded-e-xl'>
        <p className='text-sm max-sm:text-xs hidden max-sm:block group-hover:block font-semibold'>
          {product?.title.slice(0, 50)}
        </p>
        <p className='text-[11px] max-sm:text-[9px] hidden max-sm:block group-hover:block font-light'>
          {product?.description.slice(0, 180)}...
        </p>
        <p className='text-center hidden max-sm:block group-hover:block tracking-wider'>
          <strike className='text-base max-sm:text-sm font-semibold text-center'>
            ₹{product?.mrp}
          </strike>
        </p>

        <p className='text-xl max-sm:text-base hidden max-sm:block group-hover:block tracking-wider font-bold text-center'>
          ₹{product?.price}
        </p>

        <a rel='noreferrer' href={product.hyperLink} target='_blank'>
          <button className='relative w-full text-xs hidden max-sm:block group-hover:block py-1 font-semibold rounded-e-full bg-black text-white'>
            Buy now
            <ArrowRight className='absolute text-white inset-0 self-center place-self-end mr-3' />
          </button>
        </a>
        <a rel='noreferrer' href={product.hyperLink} target='_blank'>
          <button className='relative mt-2 hidden max-sm:block text-xs group-hover:block w-full py-1 font-semibold rounded-s-full bg-black text-white'>
            Add to cart
            <ArrowRight className='absolute text-white inset-0 self-center place-self-end mr-3' />
          </button>
        </a>
      </div>
    </div>
  )
}

export default NewArrivalsSection
