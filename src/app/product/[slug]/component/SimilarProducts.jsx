/* eslint-disable react/prop-types */
import { cdnPath } from '@/app/Components/cdnPath'
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const SimilarProducts = ({ products }) => {
  const router = useRouter()
  return (
    <div>
      <p className='text-2xl font-semibold py-4'>Similar Products</p>
      <div className='flex gap-6 max-sm:gap-4 flex-wrap max-sm:grid grid-cols-2'>
        {products?.length > 0 &&
          products.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              onClick={() => router.push(`/product/${product.slug}`)}
            />
          ))}
      </div>
    </div>
  )
}

const ProductCard = ({ product, onClick }) => {
  return (
    <div
      onClick={onClick}
      className='w-[182px] group cursor-pointer max-sm:w-full h-[220px] rounded-lg relative z-10'
    >
      <img
        src={cdnPath + product.thumbnailUrl}
        alt={product?.title || 'clothes2wear'}
        className='w-[182px] max-sm:w-full h-[220px] rounded-lg'
      />
      <div className='absolute bg-gradient-to-b from-transparent to-black rounded-lg h-[90%] bottom-0 left-0 right-0'>
        <div className='flex flex-col justify-end text-white inset-0 w-full h-full p-3'>
          <p className='font-semibold text-xs mb-1'>{product?.title}</p>
          <div className='flex justify-between'>
            <p className='font-semibold'>₹{product?.displayPrice}/-</p>
            <ChevronRight className='text-white opacity-0 group-hover:opacity-100 transition-all duration-300' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimilarProducts
