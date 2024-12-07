/* eslint-disable react/prop-types */
import { cdnPath } from '@/app/Components/cdnPath'
import React from 'react'

const SimilarProducts = ({ products }) => {
  return (
    <div>
      <p className='text-2xl font-semibold py-4'>Similar Products</p>
      <div className='flex gap-6 max-sm:gap-4 flex-wrap max-sm:grid grid-cols-2'>
        {products?.length > 0 &&
          products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  )
}

const ProductCard = ({ product }) => {
  return (
    <img
      src={cdnPath + product.thumbnailUrl}
      alt={product?.title || 'clothes2wear'}
      className='w-[160px] max-sm:w-full h-[200px] rounded-lg'
    />
  )
}

export default SimilarProducts
