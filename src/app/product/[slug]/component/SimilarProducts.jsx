/* eslint-disable react/prop-types */
import React from 'react'

const SimilarProducts = ({ products }) => {
  return (
    <div>
      <p className='text-2xl font-semibold py-4'>Similar Products</p>
      <div className='flex gap-6 flex-wrap'>
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
      src={product.thumbnailUrl}
      alt=''
      className='w-[160px] h-[200px] rounded-lg'
    />
  )
}

export default SimilarProducts
