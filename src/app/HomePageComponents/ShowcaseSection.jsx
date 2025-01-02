/* eslint-disable react/prop-types */
'use client'

import React, { useEffect, useRef, useState } from 'react'
import Skeleton from '../Components/Skeleton'
import { cdnPath } from '../Components/cdnPath'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'

const ShowcaseSection = ({ showcases }) => {
  const scrollContainerRef = useRef(null)

  const [newShowcases, setNewShowcases] = useState([])

  const handleFetchNewShowcases = async () => {
    try {
      const response = await fetch('/api/customs/showcases/get')
      const data = await response.json()
      setNewShowcases(data)
    } catch {
      // Empty
    }
  }

  useEffect(() => {
    handleFetchNewShowcases()
  }, [])

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current
    if (container) {
      const scrollAmount = container.offsetWidth / 2
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }
  return (
    <div className='relative'>
      {/* Left Arrow Button */}
      <ChevronsLeft
        onClick={() => handleScroll('left')}
        className='absolute w-9 h-9 max-sm:hidden bg-white rounded-full text-pink-500 cursor-pointer left-2 top-1/2 transform -translate-y-1/2 z-30'
      />

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className='w-auto flex overflow-auto scrollbar-hide items-center gap-6 px-14 max-sm:px-5 max-sm:gap-3 md:h-[320px] max-sm:h-[192px]'
      >
        {newShowcases.length > 0
          ? (newShowcases || []).map((showcase) => (
              <ShowcaseCard key={showcase._id} showcase={showcase} />
            ))
          : showcases.length > 0
          ? (showcases || []).map((showcase) => (
              <ShowcaseCard key={showcase._id} showcase={showcase} />
            ))
          : Array.from({ length: 7 }, (_, index) => (
              <Skeleton
                key={index}
                className='md:w-[200px] rounded-xl max-sm:w-[100px] max-sm:min-w-[100px] md:min-w-[200px] max-sm:h-[146px] md:h-[270px]'
              />
            ))}
      </div>

      {/* Right Arrow Button */}
      <ChevronsRight
        onClick={() => handleScroll('right')}
        className='absolute w-9 h-9 max-sm:hidden bg-white rounded-full text-pink-500 cursor-pointer right-2 top-1/2 transform -translate-y-1/2 z-30'
      />
    </div>
  )
}

const ShowcaseCard = ({ showcase, onClick }) => {
  return (
    <a
      rel='noreferrer'
      target='_blank'
      href={showcase.hyperLink}
      onClick={onClick}
      className='md:w-[200px] group cursor-pointer max-sm:w-[100px] max-sm:min-w-[100px] md:min-w-[200px] relative rounded-xl max-sm:h-[146px] md:h-[270px] overflow-hidden'
    >
      <img
        src={cdnPath + showcase.imageUrl}
        className='md:w-[200px] max-sm:w-[100px] rounded-xl max-sm:h-[146px] md:h-[270px] object-cover'
        alt='clothes2wear'
      />
      <div className='absolute bottom-0 left-0 right-0 h-[120px] z-10 bg-gradient-to-t from-black to-transparent from-[1%] transform translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out'></div>
      <p className='absolute max-sm:text-xs text-lg inset-0 flex justify-start items-end max-sm:py-1 max-sm:px-2 py-3 px-5 z-20 font-bold text-white transform translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out'>
        {showcase.title.split(' ').slice(0, 2).join(' ')}
      </p>
    </a>
  )
}

export default ShowcaseSection
