'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCategories } from '../context/CategoryContext'

const CategoryBar = () => {
  const { categories } = useCategories()
  const router = useRouter()

  // State to track the hovered category
  const [hoveredCategory, setHoveredCategory] = useState(null)

  // Dummy product data (this will be fetched later)
  const dummyProductData = [
    {
      name: 'Product 1',
      description: 'This is a product description.',
      price: '$20',
    },
    {
      name: 'Product 2',
      description: 'This is another product description.',
      price: '$25',
    },
  ]

  return (
    <div className='uppercase max-sm:hidden flex max-sm:flex-wrap tracking-wider cursor-pointer text-sm font-semibold text-pink-600 p-3 gap-12 shadow-md border-t border-pink-200 shadow-pink-200 justify-center'>
      {categories.length > 0 &&
        categories.map((item, index) => (
          <div
            className='group relative'
            onClick={() => router.push(`/category/${item.slug}`)}
            onMouseEnter={() => setHoveredCategory(item)}
            onMouseLeave={() => setHoveredCategory(null)}
            key={index}
          >
            <div className='tracking-widest group-hover:opacity-70'>
              {item.name}
            </div>
            <div className='h-[2px] w-0 group-hover:w-full transition-all duration-300 bg-pink-500'></div>

            {/* Hovered Category Card */}
            {hoveredCategory?.slug === item.slug && (
              <div className='absolute z-30 left-0 top-16 bg-pink-50 p-4 shadow-lg rounded-lg w-80 hidden'>
                <h3 className='font-bold text-lg'>{item.name}</h3>
                <div className='mt-2'>
                  {dummyProductData.map((product, idx) => (
                    <div key={idx} className='mb-4'>
                      <h4 className='font-semibold'>{product.name}</h4>
                      <p className='text-sm'>{product.description}</p>
                      <p className='text-sm font-bold'>{product.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  )
}

export default CategoryBar
