/* eslint-disable react/prop-types */
import React from 'react'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const ProductCard1 = ({ product }) => {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(`/product/${product?.slug}`)}
      className='w-60 max-sm:w-[182px] bg-zinc-100 p-2 hover:bg-zinc-200 cursor-pointer  rounded-lg overflow-hidden'
    >
      {/* Product Image */}
      <div className='h-60 max-sm:h-52 max-sm:w-full bg-stone-200 rounded-lg'>
        <img
          src={product.thumbnailUrl}
          alt={product.title}
          className='w-full h-full max-sm:w-full rounded-lg object-cover'
        />
      </div>

      {/* Product Details */}
      <div className='p-4 max-sm:p-2 relative'>
        {/* Title */}
        <h2 className='text-sm font-semibold text-gray-800 max-sm:font-normal text-wrap'>
          {product.title}
        </h2>

        {/* Price */}
        <p className='text-lg font-bold text-slate-950 mt-2'>
          ₹{product.displayPrice}
        </p>

        {/* Arrow Icon */}
        <div className='absolute bottom-4 right-4'>
          {/* <button className='bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors'> */}
          <ArrowRight strokeWidth={3} className='h-7 text-gray-700' />
          {/* </button> */}
        </div>
      </div>
    </div>
  )
}

export default ProductCard1
