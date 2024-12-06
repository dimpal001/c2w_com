'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useCategories } from '../context/CategoryContext'

const CategoryBar = () => {
  const { categories } = useCategories()
  const router = useRouter()

  return (
    <div className='uppercase max-sm:hidden flex max-sm:flex-wrap tracking-wider cursor-pointer text-sm font-semibold text-pink-600 p-3 gap-12 shadow-md border-t border-pink-200 shadow-pink-200 justify-center'>
      {categories.length > 0 &&
        categories.map((item, index) => (
          <div
            onClick={() => router.push(`/category/${item.slug}`)}
            key={index}
          >
            {item.name}
          </div>
        ))}
    </div>
  )
}

export default CategoryBar
