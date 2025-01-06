'use client'

import React, { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useCategories } from '../context/CategoryContext'
import { useSearch } from '../context/SearchContext'

const CategoryBar = () => {
  const { categories } = useCategories()
  const router = useRouter()

  const { setSearchQuery } = useSearch()

  const pathname = usePathname()
  const currentCategory = pathname.split('/')[2]

  const [hoveredCategory, setHoveredCategory] = useState(null)

  const handleMouseLeave = () => {
    setHoveredCategory(null)
  }

  return (
    <div
      className='uppercase relative max-sm:hidden flex max-sm:flex-wrap tracking-wider cursor-pointer text-sm font-semibold text-pink-600 p-3 gap-6 shadow-md border-t border-pink-200 shadow-pink-200 justify-center'
      onMouseLeave={handleMouseLeave}
    >
      {categories.length > 0 &&
        categories.map((item, index) => (
          <div
            className='group relative'
            onClick={() => {
              setSearchQuery('')
              router.push(`/category/${item.slug}`)
            }}
            onMouseEnter={() => setHoveredCategory(item)}
            key={index}
          >
            <div
              className={`${
                currentCategory === item.slug && 'bg-pink-500 text-white'
              } tracking-widest group-hover:opacity-70 px-2 py-[6px]`}
            >
              {item.name}
            </div>
            <div className='h-[2px] w-0 group-hover:w-full transition-all duration-300 bg-pink-500'></div>
          </div>
        ))}

      {/* Hovered Category Card */}
      {hoveredCategory && (
        <div
          className='absolute z-10 w-full flex mx-auto top-[58px] border-t border-pink-200 min-h-[150px] bg-white shadow-md p-8'
          onMouseEnter={() => setHoveredCategory(hoveredCategory)}
          onMouseLeave={handleMouseLeave}
        >
          <div className='animate__animated animate__fadeInUp max-w-8xl'>
            <h4 className='text-lg font-bold mb-3'>{hoveredCategory.name}</h4>
            <div className='grid grid-cols-4 gap-x-32 gap-y-2 animate__animated animate__fadeInUp'>
              {hoveredCategory?.subcategories?.length > 0 &&
                hoveredCategory.subcategories.map((subItem, subIndex) => (
                  <div
                    onClick={() =>
                      window.open(
                        `/category/${hoveredCategory.slug}/${subItem?.slug}`,
                        '_blank'
                      )
                    }
                    className='capitalize hover:underline text-[16px] font-medium'
                    key={subIndex}
                  >
                    {subItem.name}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoryBar
