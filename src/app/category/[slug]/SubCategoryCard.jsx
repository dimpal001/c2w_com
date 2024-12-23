/* eslint-disable react/prop-types */
import { cdnPath } from '@/app/Components/cdnPath'
import React from 'react'

const SubCategoryCard = ({ subCategory }) => {
  return (
    <div className='flex group cursor-pointer p-2 flex-col items-center justify-between gap-1 '>
      <img
        src={cdnPath + subCategory?.product?.thumbnailUrl}
        className='border-2 md:border-3 border-pink-500 object-cover rounded-full w-[120px] max-sm:w-[90px] h-[120px] max-sm:h-[90px] max-sm:min-w-[90px] '
        alt={subCategory?.product?.title}
      />
      <p className='text-nowrap capitalize max-sm:text-wrap max-sm: text-center group-hover:text-pink-500 max-sm:text-xs'>
        {subCategory?.subcategory?.name}
      </p>
    </div>
  )
}

export default SubCategoryCard
