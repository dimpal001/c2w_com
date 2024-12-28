/* eslint-disable react/prop-types */
import { cdnPath } from '@/app/Components/cdnPath'
import React from 'react'

const SubCategoryCard = ({ subCategory, onClick, subCategorySlug }) => {
  return (
    <div
      onClick={onClick}
      className='flex group cursor-pointer p-2 flex-col items-center justify-between gap-1 '
    >
      <img
        src={cdnPath + subCategory?.imageUrl}
        className='border-2 md:border-3 border-pink-600 object-cover rounded-full w-[120px] max-w-[120px] max-sm:w-[90px] max-sm:max-w-[90px] max-sm:max-h-[90px] h-[120px] max-h-[120px] max-sm:h-[90px] max-sm:min-w-[90px] '
        alt={subCategory?.product?.title}
      />
      <p
        className={`text-nowrap ${
          subCategorySlug &&
          subCategorySlug === subCategory?.slug &&
          'text-pink-600'
        } capitalize max-sm:text-wrap max-sm: text-center group-hover:text-pink-600 max-sm:text-xs`}
      >
        {subCategory?.name}
      </p>
    </div>
  )
}

export default SubCategoryCard
