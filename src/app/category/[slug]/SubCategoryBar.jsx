/* eslint-disable react/prop-types */
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'
import SubCategoryCard from './SubCategoryCard'
import { useRouter } from 'next/navigation'

const SubCategoryBar = ({
  handleScroll,
  scrollContainerRef,
  subCategories,
  slug,
  subCategorySlug,
}) => {
  const router = useRouter()
  return (
    <div className='p-3 w-full flex justify-between gap-2 items-center'>
      <ChevronLeft
        onClick={() => handleScroll('left')}
        className='cursor-pointer w-8 h-8 max-sm:hidden hover:text-pink-500'
      />
      <div
        ref={scrollContainerRef}
        className='flex justify-start w-full gap-7 max-sm:gap-2 md:mt-2 overflow-scroll scrollbar-hide py-2 items-start'
      >
        {subCategories.length > 0 &&
          subCategories
            .filter((item) => item?.product)
            .map((item, index) => (
              <SubCategoryCard
                onClick={() =>
                  router.push(`/category/${slug}/${item?.subcategory?.slug}`)
                }
                key={index}
                subCategory={item.subcategory}
                subCategorySlug={subCategorySlug}
              />
            ))}
      </div>
      <ChevronRight
        onClick={() => handleScroll('right')}
        className='cursor-pointer w-8 h-8 max-sm:hidden hover:text-pink-500'
      />
    </div>
  )
}

export default SubCategoryBar
