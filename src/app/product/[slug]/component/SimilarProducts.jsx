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
      <div className='flex gap-3 max-sm:gap-4 flex-wrap max-sm:grid grid-cols-2'>
        {products?.length > 0 &&
          products.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              onClick={() => router.push(`/product/${product.slug}`)}
            />
          ))}
      </div>

      {products?.length > 17 && (
        <div
          onClick={() =>
            router.push(`/category/${products[0].categories[0].slug}`)
          }
          className='py-5 flex justify-center'
        >
          <p className='text-pink-500 cursor-pointer p-2 px-14 border-pink-500 border rounded-full max-sm:w-full text-center hover:bg-pink-500 hover:text-white'>
            View all
          </p>
        </div>
      )}
    </div>
  )
}

const ProductCard = ({ product, onClick }) => {
  return (
    <div
      onClick={onClick}
      className='w-[180px] group cursor-pointer max-sm:w-full h-[220px] rounded-lg relative z-10'
    >
      <img
        src={cdnPath + product.thumbnailUrl}
        alt={product?.title || 'clothes2wear'}
        className='w-[180px] max-sm:w-full h-[220px] object-cover rounded-lg'
      />
      <div className='absolute bg-gradient-to-b from-transparent to-black rounded-lg h-[90%] bottom-0 left-0 right-0'>
        <div className='flex flex-col justify-end text-white inset-0 w-full h-full p-3'>
          <p className='font-semibold text-xs mb-1'>
            {product?.title.slice(0, 40)}..
          </p>
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
