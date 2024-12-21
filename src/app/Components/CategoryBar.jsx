'use client'

import React, { useState, useRef, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useCategories } from '../context/CategoryContext'

const CategoryBar = () => {
  const { categories } = useCategories()
  const router = useRouter()

  const pathname = usePathname()
  const currentCategory = pathname.split('/')[2]

  // State to track the hovered category
  const [hoveredCategory, setHoveredCategory] = useState(null)
  const popupRef = useRef(null)

  // Close popup if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setHoveredCategory(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='uppercase max-sm:hidden flex max-sm:flex-wrap tracking-wider cursor-pointer text-sm font-semibold text-pink-600 p-3 gap-12 shadow-md border-t border-pink-200 shadow-pink-200 justify-center'>
      {categories.length > 0 &&
        categories.map((item, index) => (
          <div
            className='group relative'
            onClick={() => router.push(`/category/${item.slug}`)}
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

            {/* Hovered Category Card */}
            {hoveredCategory?.slug === item.slug && (
              <div
                className='absolute z-30 top-16 bg-white p-4 shadow-xl shadow-zinc-300 border rounded-lg w-[300px] animate__animated animate__fadeInUp animate__faster'
                ref={popupRef}
                style={{
                  left: 'auto',
                  right: index > categories.length / 2 ? '0' : 'auto',
                  transform:
                    index > categories.length / 2
                      ? 'translateX(0%)'
                      : 'translateX(-50%)',
                }}
              >
                {/* <h3 className='font-bold text-lg'>{item.name}</h3> */}
                <div className='mt-0'>
                  <div className='flex flex-col gap-3'>
                    {item?.subcategories?.length > 0 &&
                      item?.subcategories?.map((subItem, subIndex) => (
                        <div
                          className='capitalize text-lg font-normal'
                          key={subIndex}
                        >
                          {subItem?.name}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  )
}

export default CategoryBar
