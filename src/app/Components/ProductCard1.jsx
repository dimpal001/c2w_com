/* eslint-disable react/prop-types */
import React from 'react'
import { ArrowRight } from 'lucide-react'

const ProductCard1 = ({ product }) => {
  return (
    <div className='w-60 max-sm:w-full bg-neutral-200 p-2 shadow-sm hover:bg-pink-50 cursor-pointer hover:shadow-pink-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow'>
      {/* Product Image */}
      <div className='h-60 max-sm:h-44 bg-stone-400 rounded-lg'>
        <img
          src={product.image}
          alt={product.title}
          className='w-full h-full rounded-lg object-cover'
        />
      </div>

      {/* Product Details */}
      <div className='p-4 relative'>
        {/* Title */}
        <h2 className='text-sm font-semibold text-gray-800 truncate'>
          {product.title}
        </h2>

        {/* Price */}
        <p className='text-lg font-bold text-slate-950 mt-2'>
          ₹{product.price}
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
