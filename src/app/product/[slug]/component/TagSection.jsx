/* eslint-disable react/prop-types */
import { useSearch } from '@/app/context/SearchContext'
import { useRouter } from 'next/navigation'
import React from 'react'

const TagSection = ({ tags }) => {
  const router = useRouter()
  const { setSearchQuery } = useSearch()
  const handleClick = (tag) => {
    setSearchQuery(tag)
    router.push('/search')
  }

  return (
    <div>
      <p className='text-2xl font-semibold py-4'>Search Tags</p>
      <div className='flex gap-3 flex-wrap max-sm:gap-2'>
        {tags?.length > 0 &&
          tags.map((tag, index) => (
            <div key={index}>
              <div
                onClick={() => handleClick(tag)}
                className='py-2 max-sm:text-xs cursor-pointer hover:bg-pink-200 text-sm px-5 rounded-full bg-pink-100 text-pink-600'
              >
                {tag}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default TagSection
